/**
 * Timeline Layout Engine
 *
 * Calculates positions, tracks, and SVG paths for timeline events.
 * Handles branch/merge logic for overlapping events.
 */

import type {
  TimelineEvent,
  TimelineDate,
  TimelineOrientation,
  TimelineDimensions,
  TimelineLayout,
  PositionedEvent,
  YearMarker,
  ConnectionPoint,
  EventPath,
} from '../components/Timeline/types';

/**
 * Convert TimelineDate to a comparable number (months since year 0)
 */
export function dateToMonths(date: TimelineDate): number {
  return date.year * 12 + date.month;
}

/**
 * Convert 'present' or TimelineDate to months
 */
export function endDateToMonths(endDate: TimelineDate | 'present' | undefined): number {
  if (!endDate) {
    return dateToMonths({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });
  }
  if (endDate === 'present') {
    return dateToMonths({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });
  }
  return dateToMonths(endDate);
}

/**
 * Format month number to short name
 */
export function monthToName(month: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month - 1] || '';
}

/**
 * Calculate duration between two dates
 */
export function calculateDuration(
  startDate: TimelineDate,
  endDate: TimelineDate | 'present' | undefined,
): { years: number; months: number } {
  const startMonths = dateToMonths(startDate);
  const endMonths = endDateToMonths(endDate);
  const totalMonths = endMonths - startMonths;

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
}

/**
 * Format duration as human-readable string
 */
export function formatDuration(startDate: TimelineDate, endDate: TimelineDate | 'present' | undefined): string {
  const { years, months } = calculateDuration(startDate, endDate);

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);

  return parts.join(' ') || 'Less than a month';
}

// ============================================================================
// Overlap Detection
// ============================================================================

/**
 * Check if two events overlap in time
 */
export function eventsOverlap(eventA: TimelineEvent, eventB: TimelineEvent): boolean {
  const aStart = dateToMonths(eventA.startDate);
  const aEnd = endDateToMonths(eventA.endDate);
  const bStart = dateToMonths(eventB.startDate);
  const bEnd = endDateToMonths(eventB.endDate);

  // Events overlap if one starts before the other ends
  return aStart < bEnd && bStart < aEnd;
}

/**
 * Find all overlapping pairs in events list
 */
export function detectOverlaps(events: TimelineEvent[]): Map<string, string[]> {
  const overlaps = new Map<string, string[]>();

  // Initialize empty arrays for each event
  events.forEach((event) => {
    overlaps.set(event.id, []);
  });

  // Check all pairs
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      if (eventsOverlap(events[i], events[j])) {
        overlaps.get(events[i].id)?.push(events[j].id);
        overlaps.get(events[j].id)?.push(events[i].id);
      }
    }
  }

  return overlaps;
}

/**
 * Assign events to tracks (lanes) based on overlaps
 * Track 0 is the main timeline, track 1+ are branches
 */
export function assignTracks(events: TimelineEvent[], overlaps: Map<string, string[]>): Map<string, number> {
  const trackAssignments = new Map<string, number>();
  const sortedEvents = [...events].sort((a, b) => dateToMonths(a.startDate) - dateToMonths(b.startDate));

  // Track which events are currently active (not yet ended) on each track
  const activeOnTrack: Map<number, TimelineEvent[]> = new Map();
  activeOnTrack.set(0, []);

  for (const event of sortedEvents) {
    const eventOverlaps = overlaps.get(event.id) || [];
    const eventStart = dateToMonths(event.startDate);

    // Clean up tracks - remove events that have ended before this event starts
    activeOnTrack.forEach((activeEvents, track) => {
      activeOnTrack.set(
        track,
        activeEvents.filter((e) => endDateToMonths(e.endDate) > eventStart),
      );
    });

    // If no overlaps, this event goes on track 0
    if (eventOverlaps.length === 0) {
      // Check if track 0 is available
      const track0Active = activeOnTrack.get(0) || [];
      if (track0Active.length === 0) {
        trackAssignments.set(event.id, 0);
        track0Active.push(event);
        activeOnTrack.set(0, track0Active);
        continue;
      }
    }

    // Find the first available track
    let assignedTrack = -1;
    for (let track = 0; track <= activeOnTrack.size; track++) {
      const trackEvents = activeOnTrack.get(track) || [];

      // Check if this track has any conflicting events
      const hasConflict = trackEvents.some((activeEvent) => eventsOverlap(event, activeEvent));

      if (!hasConflict) {
        assignedTrack = track;
        break;
      }
    }

    // If no track found, create a new one
    if (assignedTrack === -1) {
      assignedTrack = activeOnTrack.size;
    }

    trackAssignments.set(event.id, assignedTrack);

    // Add to active events on this track
    const trackActive = activeOnTrack.get(assignedTrack) || [];
    trackActive.push(event);
    activeOnTrack.set(assignedTrack, trackActive);
  }

  return trackAssignments;
}

/**
 * Calculate normalized positions (0-1) for all events
 * Returns positioned events and the min/max months used for positioning
 */
export function calculatePositions(
  events: TimelineEvent[],
  trackAssignments: Map<string, number>,
  overlaps: Map<string, string[]>,
): { positionedEvents: PositionedEvent[]; minMonths: number; maxMonths: number } {
  // Find min/max dates
  let minMonths = Infinity;
  let maxMonths = -Infinity;

  events.forEach((event) => {
    const start = dateToMonths(event.startDate);
    const end = endDateToMonths(event.endDate);
    minMonths = Math.min(minMonths, start);
    maxMonths = Math.max(maxMonths, end);
  });

  // Add padding (1 month on each end)
  minMonths -= 1;
  maxMonths += 1;

  const range = maxMonths - minMonths;

  const positionedEvents = events.map((event) => ({
    ...event,
    position: (dateToMonths(event.startDate) - minMonths) / range,
    endPosition: (endDateToMonths(event.endDate) - minMonths) / range,
    track: trackAssignments.get(event.id) || 0,
    overlaps: overlaps.get(event.id) || [],
  }));

  return { positionedEvents, minMonths, maxMonths };
}

/**
 * Generate year markers for the timeline axis
 * Uses the same coordinate system as event positions for alignment
 */
export function generateYearMarkers(minMonths: number, maxMonths: number): YearMarker[] {
  const range = maxMonths - minMonths;

  // Find the year range from the months
  const minYear = Math.ceil(minMonths / 12);
  const maxYear = Math.floor(maxMonths / 12);

  const markers: YearMarker[] = [];

  // Generate markers for each year boundary (January of each year)
  for (let year = minYear; year <= maxYear; year++) {
    const yearStartMonths = year * 12 + 1; // January = month 1

    // Only include if within our padded range
    if (yearStartMonths >= minMonths && yearStartMonths <= maxMonths) {
      const position = (yearStartMonths - minMonths) / range;
      markers.push({
        year,
        position,
      });
    }
  }

  return markers;
}

/**
 * Generate a bezier curve for branch/merge
 * @param from Starting point
 * @param to Ending point
 * @param curveRadius How much the curve should bend
 * @param direction 'down' for branch, 'up' for merge
 */
function generateBezierCurve(from: { x: number; y: number }, to: { x: number; y: number }): string {
  // Control points for smooth S-curve
  const cp1x = from.x + (to.x - from.x) * 0.4;
  const cp1y = from.y;
  const cp2x = from.x + (to.x - from.x) * 0.6;
  const cp2y = to.y;

  return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`;
}

/**
 * Convert positioned events to SVG paths
 */
export function generatePaths(
  events: PositionedEvent[],
  dimensions: TimelineDimensions,
  orientation: TimelineOrientation,
): EventPath[] {
  const { width, height, padding, trackSpacing, branchCurveRadius } = dimensions;

  const isHorizontal = orientation === 'horizontal';
  const mainAxisLength = isHorizontal ? width - 2 * padding : height - 2 * padding;
  const mainAxisPosition = isHorizontal ? height / 2 : width / 2;

  return events.map((event) => {
    const startPos = padding + event.position * mainAxisLength;
    const endPos = padding + event.endPosition * mainAxisLength;
    const trackOffset = event.track * trackSpacing;

    let startPoint: { x: number; y: number };
    let endPoint: { x: number; y: number };
    let d: string;

    if (isHorizontal) {
      // Horizontal timeline: branches go DOWN
      startPoint = { x: startPos, y: mainAxisPosition + trackOffset };
      endPoint = { x: endPos, y: mainAxisPosition + trackOffset };

      if (event.track === 0) {
        // Main track - simple horizontal line
        d = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;
      } else {
        // Branch track - curve down from main, horizontal, curve back up
        const branchStart = { x: startPos, y: mainAxisPosition };
        const branchEnd = { x: endPos, y: mainAxisPosition };

        d = `M ${branchStart.x} ${branchStart.y} `;
        d += generateBezierCurve(branchStart, startPoint);
        d += ` L ${endPoint.x} ${endPoint.y} `;
        d += generateBezierCurve(endPoint, branchEnd);
      }
    } else {
      // Vertical timeline: branches go RIGHT
      startPoint = { x: mainAxisPosition + trackOffset, y: startPos };
      endPoint = { x: mainAxisPosition + trackOffset, y: endPos };

      if (event.track === 0) {
        // Main track - simple vertical line
        d = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;
      } else {
        // Branch track - curve right from main, vertical, curve back left
        const branchStart = { x: mainAxisPosition, y: startPos };
        const branchEnd = { x: mainAxisPosition, y: endPos };

        d = `M ${branchStart.x} ${branchStart.y} `;
        // For vertical, we need to adjust the curve generation
        const cp1 = { x: branchStart.x, y: branchStart.y + branchCurveRadius * 0.5 };
        const cp2 = { x: startPoint.x, y: startPoint.y - branchCurveRadius * 0.5 };
        d += `C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${startPoint.x} ${startPoint.y} `;
        d += `L ${endPoint.x} ${endPoint.y} `;
        const cp3 = { x: endPoint.x, y: endPoint.y + branchCurveRadius * 0.5 };
        const cp4 = { x: branchEnd.x, y: branchEnd.y - branchCurveRadius * 0.5 };
        d += `C ${cp3.x} ${cp3.y}, ${cp4.x} ${cp4.y}, ${branchEnd.x} ${branchEnd.y}`;
      }
    }

    return {
      eventId: event.id,
      d,
      colorIndex: event.colorIndex,
      startPoint,
      endPoint,
      track: event.track,
    };
  });
}

/**
 * Generate connection points (dots) for branch/merge
 */
export function generateConnections(
  events: PositionedEvent[],
  dimensions: TimelineDimensions,
  orientation: TimelineOrientation,
): ConnectionPoint[] {
  const { width, height, padding, trackSpacing } = dimensions;
  const connections: ConnectionPoint[] = [];

  const isHorizontal = orientation === 'horizontal';
  const mainAxisLength = isHorizontal ? width - 2 * padding : height - 2 * padding;
  const mainAxisPosition = isHorizontal ? height / 2 : width / 2;

  events.forEach((event) => {
    // Only create connection points for branches (track > 0)
    if (event.track > 0) {
      const startPos = padding + event.position * mainAxisLength;
      const endPos = padding + event.endPosition * mainAxisLength;

      if (isHorizontal) {
        // Branch point on main line
        connections.push({
          x: startPos,
          y: mainAxisPosition,
          type: 'branch',
          eventId: event.id,
          colorIndex: event.colorIndex,
        });
        // Merge point on main line
        connections.push({
          x: endPos,
          y: mainAxisPosition,
          type: 'merge',
          eventId: event.id,
          colorIndex: event.colorIndex,
        });
      } else {
        // Branch point on main line (vertical)
        connections.push({
          x: mainAxisPosition,
          y: startPos,
          type: 'branch',
          eventId: event.id,
          colorIndex: event.colorIndex,
        });
        // Merge point on main line
        connections.push({
          x: mainAxisPosition,
          y: endPos,
          type: 'merge',
          eventId: event.id,
          colorIndex: event.colorIndex,
        });
      }
    }

    // Always add start/end dots for the event itself
    const trackOffset = event.track * trackSpacing;
    const startPos = padding + event.position * mainAxisLength;
    const endPos = padding + event.endPosition * mainAxisLength;

    if (isHorizontal) {
      connections.push({
        x: startPos,
        y: mainAxisPosition + trackOffset,
        type: 'branch',
        eventId: event.id,
        colorIndex: event.colorIndex,
      });
      connections.push({
        x: endPos,
        y: mainAxisPosition + trackOffset,
        type: 'merge',
        eventId: event.id,
        colorIndex: event.colorIndex,
      });
    } else {
      connections.push({
        x: mainAxisPosition + trackOffset,
        y: startPos,
        type: 'branch',
        eventId: event.id,
        colorIndex: event.colorIndex,
      });
      connections.push({
        x: mainAxisPosition + trackOffset,
        y: endPos,
        type: 'merge',
        eventId: event.id,
        colorIndex: event.colorIndex,
      });
    }
  });

  return connections;
}

/**
 * Generate the main timeline axis path
 * Axis spans the full width/height with a small margin for round end caps
 */
export function generateMainAxisPath(
  events: PositionedEvent[],
  dimensions: TimelineDimensions,
  orientation: TimelineOrientation,
): string {
  const { width, height } = dimensions;
  const isHorizontal = orientation === 'horizontal';
  const margin = 15; // Small margin for round end caps

  if (isHorizontal) {
    const y = height / 2;
    return `M ${margin} ${y} L ${width - margin} ${y}`;
  } else {
    const x = width / 2;
    return `M ${x} ${margin} L ${x} ${height - margin}`;
  }
}

/**
 * Default dimensions for timeline layout
 */
export const DEFAULT_DIMENSIONS: TimelineDimensions = {
  width: 1200,
  height: 400,
  padding: 60,
  nodeRadius: 8,
  trackSpacing: 50,
  branchCurveRadius: 30,
};

/**
 * Calculate complete timeline layout
 */
export function calculateTimelineLayout(
  events: TimelineEvent[],
  orientation: TimelineOrientation,
  dimensions: TimelineDimensions = DEFAULT_DIMENSIONS,
): TimelineLayout {
  // Sort events chronologically
  const sortedEvents = [...events].sort((a, b) => dateToMonths(a.startDate) - dateToMonths(b.startDate));

  // Step 1: Detect overlaps
  const overlaps = detectOverlaps(sortedEvents);

  // Step 2: Assign tracks
  const trackAssignments = assignTracks(sortedEvents, overlaps);

  // Step 3: Calculate positions (returns min/max months for coordinate system)
  const { positionedEvents, minMonths, maxMonths } = calculatePositions(sortedEvents, trackAssignments, overlaps);

  // Step 4: Generate SVG paths
  const paths = generatePaths(positionedEvents, dimensions, orientation);

  // Step 5: Generate year markers (using same coordinate system as events)
  const yearMarkers = generateYearMarkers(minMonths, maxMonths);

  // Step 6: Generate connection points
  const connections = generateConnections(positionedEvents, dimensions, orientation);

  // Step 7: Generate main axis
  const mainAxisPath = generateMainAxisPath(positionedEvents, dimensions, orientation);

  // Calculate bounds
  let minYear = Infinity;
  let maxYear = -Infinity;
  let totalTracks = 0;

  positionedEvents.forEach((event) => {
    minYear = Math.min(minYear, event.startDate.year);
    const endYear = event.endDate === 'present' || !event.endDate ? new Date().getFullYear() : event.endDate.year;
    maxYear = Math.max(maxYear, endYear);
    totalTracks = Math.max(totalTracks, event.track + 1);
  });

  return {
    events: positionedEvents,
    paths,
    yearMarkers,
    connections,
    mainAxisPath,
    bounds: {
      minYear,
      maxYear,
      totalTracks,
    },
  };
}

/**
 * Get pixel coordinates for a year marker
 */
export function getYearMarkerCoordinates(
  marker: YearMarker,
  dimensions: TimelineDimensions,
  orientation: TimelineOrientation,
): { x: number; y: number; labelX: number; labelY: number } {
  const { width, height, padding } = dimensions;
  const isHorizontal = orientation === 'horizontal';
  const mainAxisLength = isHorizontal ? width - 2 * padding : height - 2 * padding;

  const pos = padding + marker.position * mainAxisLength;

  if (isHorizontal) {
    return {
      x: pos,
      y: height / 2,
      labelX: pos,
      labelY: height / 2 - 20,
    };
  } else {
    return {
      x: width / 2,
      y: pos,
      labelX: width / 2 - 30,
      labelY: pos,
    };
  }
}
