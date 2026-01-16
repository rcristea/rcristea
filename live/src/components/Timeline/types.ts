/**
 * Timeline Component Type Definitions
 *
 * Core types for the timeline feature including events,
 * layout calculations, and rendering data.
 */

// ============================================================================
// Event Types
// ============================================================================

/**
 * Represents a month/year date for timeline events
 */
export interface TimelineDate {
  month: number; // 1-12
  year: number;
}

/**
 * Category of timeline event for semantic grouping
 */
export type TimelineCategory = 'work' | 'education' | 'project' | 'personal';

/**
 * Valid color indices for timeline events (0-9)
 */
export type ColorIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Configuration for a single timeline event
 */
export interface TimelineEvent {
  /** Unique identifier - used for deep linking */
  id: string;
  /** Display title */
  title: string;
  /** Start date (month/year) */
  startDate: TimelineDate;
  /** End date or 'present' for ongoing events */
  endDate?: TimelineDate | 'present';
  /** Optional category for semantic grouping */
  category?: TimelineCategory;
  /** Events in same group can branch/merge together */
  group?: string;
  /** Color index (0-9) mapping to theme.palette.graph.colors */
  colorIndex: ColorIndex;
  /** Short description shown on hover */
  description: string;
  /** Body component configuration for modal */
  body: {
    /** Component name (must be registered in eventComponents.ts) */
    component: string;
    /** Optional props to pass to the component */
    props?: Record<string, unknown>;
  };
}

// ============================================================================
// Layout Types
// ============================================================================

/**
 * Timeline orientation based on device
 */
export type TimelineOrientation = 'horizontal' | 'vertical';

/**
 * Dimensions for layout calculations
 */
export interface TimelineDimensions {
  width: number;
  height: number;
  padding: number;
  nodeRadius: number;
  trackSpacing: number;
  branchCurveRadius: number;
  /** Offset from left edge for main axis in vertical mode (default: width/2) */
  mainAxisOffset?: number;
}

/**
 * A positioned event with layout data
 */
export interface PositionedEvent extends TimelineEvent {
  /** Position along main axis (0-1 normalized) */
  position: number;
  /** Position at end of event (0-1 normalized) */
  endPosition: number;
  /** Track index (0 = main timeline, 1+ = branches) */
  track: number;
  /** Events this one overlaps with */
  overlaps: string[];
}

/**
 * Year marker for timeline axis
 */
export interface YearMarker {
  year: number;
  position: number; // 0-1 normalized
}

/**
 * Connection point for branch/merge
 */
export interface ConnectionPoint {
  x: number;
  y: number;
  type: 'branch' | 'merge';
  eventId: string;
  colorIndex: ColorIndex;
}

/**
 * SVG path data for an event's line
 */
export interface EventPath {
  eventId: string;
  /** SVG path d attribute */
  d: string;
  colorIndex: ColorIndex;
  /** Start point for branch */
  startPoint: { x: number; y: number };
  /** End point for merge */
  endPoint: { x: number; y: number };
  /** Track this path is on */
  track: number;
}

/**
 * Complete layout data for rendering
 */
export interface TimelineLayout {
  /** All positioned events */
  events: PositionedEvent[];
  /** SVG paths for all event lines */
  paths: EventPath[];
  /** Year markers on the axis */
  yearMarkers: YearMarker[];
  /** Branch/merge connection points */
  connections: ConnectionPoint[];
  /** Main timeline axis path */
  mainAxisPath: string;
  /** Total timeline bounds */
  bounds: {
    minYear: number;
    maxYear: number;
    totalTracks: number;
  };
}

// ============================================================================
// Modal Types
// ============================================================================

/**
 * Modal state for timeline detail view
 */
export interface ModalState {
  isOpen: boolean;
  currentEventId: string | null;
  /** Index in the sorted events array for navigation */
  currentIndex: number;
}

/**
 * Navigation info for modal arrows
 */
export interface ModalNavigation {
  hasPrevious: boolean;
  hasNext: boolean;
  previousEventId: string | null;
  nextEventId: string | null;
}

// ============================================================================
// Component Props
// ============================================================================

/**
 * Props for TimelineCanvas component
 */
export interface TimelineCanvasProps {
  layout: TimelineLayout;
  orientation: TimelineOrientation;
  dimensions: TimelineDimensions;
  graphColors: string[];
  onEventClick: (eventId: string) => void;
  onEventHover: (eventId: string | null, position?: { x: number; y: number }) => void;
}

/**
 * Props for TimelineModal component
 */
export interface TimelineModalProps {
  events: TimelineEvent[];
  currentEventId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (eventId: string) => void;
}

/**
 * Props for TimelineTooltip component
 */
export interface TimelineTooltipProps {
  event: TimelineEvent | null;
  position: { x: number; y: number } | null;
  orientation: TimelineOrientation;
}
