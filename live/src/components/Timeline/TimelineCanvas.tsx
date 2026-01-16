/**
 * TimelineCanvas Component (React Island)
 *
 * Renders the SVG timeline with paths, nodes, and year markers.
 * Handles hover/click interactions and GSAP animations.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import type {
  TimelineEvent,
  TimelineLayout,
  TimelineDimensions,
  TimelineOrientation,
  EventPath,
  YearMarker,
} from './types';
import { monthToName } from './utils';
import { useTimelineScroll } from './useTimelineScroll';

// ============================================================================
// Types
// ============================================================================

interface TimelineCanvasProps {
  data: {
    events: TimelineEvent[];
    horizontalLayout: TimelineLayout;
    verticalLayout: TimelineLayout;
    config: {
      mobileBreakpoint: number;
      horizontalDimensions: TimelineDimensions;
      verticalDimensions: TimelineDimensions;
      lineWeight: number;
      showYearMarkers: boolean;
      animateOnScroll: boolean;
      animationDuration: number;
      staggerDelay: number;
    };
    darkColors: string[];
    lightColors: string[];
  };
}

interface TooltipState {
  visible: boolean;
  event: TimelineEvent | null;
  x: number;
  y: number;
}

// ============================================================================
// Component
// ============================================================================

export default function TimelineCanvas({ data }: TimelineCanvasProps) {
  const { events, horizontalLayout, verticalLayout, config, darkColors, lightColors } = data;

  // State
  const [orientation, setOrientation] = useState<TimelineOrientation>('horizontal');
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    event: null,
    x: 0,
    y: 0,
  });

  // Refs
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Unified scroll controller (drag + wheel hijacking)
  const {
    isDragging,
    wrapperRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  } = useTimelineScroll({
    enabled: orientation === 'horizontal',
    containerSelector: '.timeline-section',
    sectionSelector: '[data-section]',
    smoothness: 0.15,
    wheelMultiplier: 2,
  });

  // Derived state
  const layout = orientation === 'horizontal' ? horizontalLayout : verticalLayout;
  const dimensions = orientation === 'horizontal'
    ? config.horizontalDimensions
    : config.verticalDimensions;

  // Detect theme (check for dark mode)
  const [isDark, setIsDark] = useState(true);
  const graphColors = isDark ? darkColors : lightColors;

  // ============================================================================
  // Effects
  // ============================================================================

  // Detect orientation and theme on mount and resize
  useEffect(() => {
    const updateOrientation = () => {
      const isMobile = window.innerWidth < config.mobileBreakpoint;
      setOrientation(isMobile ? 'vertical' : 'horizontal');
    };

    const updateTheme = () => {
      // Check if dark mode is active via CSS variable or class
      const isDarkMode = document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(isDarkMode);
    };

    updateOrientation();
    updateTheme();

    window.addEventListener('resize', updateOrientation);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);

    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateTheme);
    };
  }, [config.mobileBreakpoint]);

  // GSAP entrance animation - animate paths as they scroll into horizontal view
  useEffect(() => {
    if (!config.animateOnScroll || !svgRef.current) return;

    const paths = Array.from(pathRefs.current.values());
    const scrollContainer = wrapperRef.current?.closest('.timeline-section') as HTMLElement;
    
    // Track which paths have been animated
    const animatedPaths = new Set<SVGPathElement>();
    
    // Set initial state - paths hidden
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });
    });

    const animateVisiblePaths = () => {
      if (!scrollContainer) return;
      
      const containerRect = scrollContainer.getBoundingClientRect();
      const scrollLeft = scrollContainer.scrollLeft;
      const viewportLeft = scrollLeft;
      const viewportRight = scrollLeft + containerRect.width;
      
      paths.forEach((path) => {
        if (animatedPaths.has(path)) return;
        
        // Get the path's bounding box in SVG coordinates
        const bbox = path.getBBox();
        const pathLeft = bbox.x;
        const pathRight = bbox.x + bbox.width;
        
        // Check if path is entering the viewport (with some buffer for smoother triggering)
        const buffer = 100; // Start animation slightly before path is fully visible
        const isVisible = pathRight > viewportLeft - buffer && pathLeft < viewportRight + buffer;
        
        if (isVisible) {
          animatedPaths.add(path);
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: config.animationDuration,
            ease: 'power2.out',
          });
        }
      });
    };

    // Run once on mount to animate initially visible paths
    // Use a small delay to ensure layout is complete
    const initialTimeout = setTimeout(animateVisiblePaths, 100);

    // Listen to scroll events on the container
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', animateVisiblePaths, { passive: true });
    }

    return () => {
      clearTimeout(initialTimeout);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', animateVisiblePaths);
      }
      // Kill any running animations
      paths.forEach((path) => gsap.killTweensOf(path));
    };
  }, [orientation, config]);

  // Handle deep linking (URL hash)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const event = events.find((e) => e.id === hash);
      if (event) {
        // Dispatch event to open modal
        window.dispatchEvent(
          new CustomEvent('timeline:openModal', { detail: { eventId: hash } })
        );
      }
    }
  }, [events]);

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleEventClick = useCallback((eventId: string) => {
    // Update URL hash
    window.history.pushState(null, '', `#${eventId}`);

    // Dispatch event to open modal
    window.dispatchEvent(
      new CustomEvent('timeline:openModal', { detail: { eventId } })
    );
  }, []);

  const handleEventHover = useCallback(
    (eventId: string | null, clientX?: number, clientY?: number) => {
      if (!eventId) {
        setTooltip((prev) => ({ ...prev, visible: false }));
        return;
      }

      const event = events.find((e) => e.id === eventId);
      if (!event) return;

      setTooltip({
        visible: true,
        event,
        x: clientX || 0,
        y: clientY || 0,
      });
    },
    [events]
  );

  // ============================================================================
  // Render Helpers
  // ============================================================================

  const renderPath = (path: EventPath) => {
    const color = graphColors[path.colorIndex];

    return (
      <path
        key={path.eventId}
        ref={(el) => {
          if (el) pathRefs.current.set(path.eventId, el);
        }}
        d={path.d}
        stroke={color}
        strokeWidth={config.lineWeight}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="timeline-path"
        style={{ cursor: 'pointer' }}
        onClick={() => handleEventClick(path.eventId)}
        onMouseEnter={(e) => handleEventHover(path.eventId, e.clientX, e.clientY)}
        onMouseMove={(e) => handleEventHover(path.eventId, e.clientX, e.clientY)}
        onMouseLeave={() => handleEventHover(null)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${events.find((e) => e.id === path.eventId)?.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleEventClick(path.eventId);
          }
        }}
      />
    );
  };

  const renderYearMarker = (marker: YearMarker) => {
    const isHorizontal = orientation === 'horizontal';
    const { padding, mainAxisOffset } = dimensions; // Use same padding as paths
    const mainAxisLength = isHorizontal
      ? dimensions.width - 2 * padding
      : dimensions.height - 2 * padding;
    const pos = padding + marker.position * mainAxisLength;

    const mainAxisX = mainAxisOffset ?? dimensions.width / 2;
    const x = isHorizontal ? pos : mainAxisX;
    const y = isHorizontal ? dimensions.height / 2 : pos;

    const labelX = isHorizontal ? pos : mainAxisX - 35;
    const labelY = isHorizontal ? dimensions.height / 2 - 25 : pos + 4;

    return (
      <g key={marker.year} className="timeline-year-marker">
        {/* Tick mark */}
        <line
          x1={isHorizontal ? x : x - 8}
          y1={isHorizontal ? y - 8 : y}
          x2={isHorizontal ? x : x + 8}
          y2={isHorizontal ? y + 8 : y}
          stroke="currentColor"
          strokeWidth={1}
          opacity={0.3}
        />
        {/* Year label */}
        <text
          x={labelX}
          y={labelY}
          textAnchor={isHorizontal ? 'middle' : 'end'}
          className="timeline-year-label"
          fill="currentColor"
          fontSize={12}
          opacity={0.6}
        >
          {marker.year}
        </text>
      </g>
    );
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div 
      ref={wrapperRef}
      className={`timeline-canvas-wrapper ${isDragging ? 'is-dragging' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: orientation === 'horizontal' ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
    >
      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className={`timeline-svg timeline-svg-${orientation}`}
        role="img"
        aria-label="Career timeline visualization"
      >
        {/* Main axis line (faint background) */}
        <path
          d={layout.mainAxisPath}
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          fill="none"
          opacity={0.1}
          className="timeline-main-axis"
        />

        {/* Year markers */}
        {config.showYearMarkers && layout.yearMarkers.map(renderYearMarker)}

        {/* Event paths */}
        <g className="timeline-paths">
          {layout.paths.map(renderPath)}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip.visible && tooltip.event && (
        <div
          ref={tooltipRef}
          className={`timeline-tooltip timeline-tooltip-${orientation}`}
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: orientation === 'horizontal' ? tooltip.y - 60 : tooltip.y + 20,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
          role="tooltip"
        >
          <div className="timeline-tooltip-date">
            {monthToName(tooltip.event.startDate.month)} {tooltip.event.startDate.year}
            {tooltip.event.endDate && (
              <>
                {' – '}
                {tooltip.event.endDate === 'present'
                  ? 'Present'
                  : `${monthToName(tooltip.event.endDate.month)} ${tooltip.event.endDate.year}`}
              </>
            )}
          </div>
          <div className="timeline-tooltip-title">{tooltip.event.title}</div>
        </div>
      )}
    </div>
  );
}
