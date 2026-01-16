/**
 * useTimelineScroll Hook
 *
 * Unified scroll controller for the timeline canvas.
 * Handles both drag-to-scroll and wheel hijacking through a single
 * source of truth (targetScrollLeft), preventing conflicts between
 * the two input methods.
 */

import { useRef, useCallback, useEffect, useState } from 'react';

interface UseTimelineScrollOptions {
  /** Whether scroll is enabled (horizontal orientation only) */
  enabled: boolean;
  /** CSS selector for the scroll container */
  containerSelector: string;
  /** CSS selector for the fullscreen section (for wheel hijacking) */
  sectionSelector: string;
  /** Lerp factor for smooth scrolling (0-1, higher = faster) */
  smoothness?: number;
  /** Multiplier for wheel delta */
  wheelMultiplier?: number;
}

export function useTimelineScroll({
  enabled,
  containerSelector,
  sectionSelector,
  smoothness = 0.15,
  wheelMultiplier = 2,
}: UseTimelineScrollOptions) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Scroll controller state (lives outside React for performance)
  const scrollState = useRef({
    targetScrollLeft: 0,
    isAnimating: false,
    isDragging: false,
    dragStartX: 0,
    dragStartScrollLeft: 0,
  });

  // Get scroll container helper
  const getScrollContainer = useCallback(() => {
    return wrapperRef.current?.closest(containerSelector) as HTMLElement | null;
  }, [containerSelector]);

  // Get section helper
  const getSection = useCallback(() => {
    return wrapperRef.current?.closest(sectionSelector) as HTMLElement | null;
  }, [sectionSelector]);

  // Animation loop - single source of truth for setting scrollLeft
  const animateScroll = useCallback(() => {
    const scrollContainer = getScrollContainer();
    if (!scrollContainer) {
      scrollState.current.isAnimating = false;
      return;
    }

    const state = scrollState.current;
    const currentScroll = scrollContainer.scrollLeft;
    const diff = state.targetScrollLeft - currentScroll;

    // Use different smoothness for drag (instant) vs wheel (smooth)
    const lerpFactor = state.isDragging ? 1 : smoothness;

    // If close enough (or dragging), snap to target
    if (Math.abs(diff) < 0.5 || (state.isDragging && lerpFactor === 1)) {
      scrollContainer.scrollLeft = state.targetScrollLeft;
      if (!state.isDragging) {
        state.isAnimating = false;
      }
      return;
    }

    // Ease towards target
    scrollContainer.scrollLeft = currentScroll + diff * lerpFactor;

    if (state.isAnimating) {
      requestAnimationFrame(animateScroll);
    }
  }, [getScrollContainer, smoothness]);

  // Start animation loop if not running
  const startAnimation = useCallback(() => {
    if (!scrollState.current.isAnimating) {
      scrollState.current.isAnimating = true;
      requestAnimationFrame(animateScroll);
    }
  }, [animateScroll]);

  // Set target scroll position (clamped to valid range)
  const setTargetScroll = useCallback(
    (value: number, immediate = false) => {
      const scrollContainer = getScrollContainer();
      if (!scrollContainer) return;

      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      scrollState.current.targetScrollLeft = Math.max(0, Math.min(maxScroll, value));

      if (immediate) {
        scrollContainer.scrollLeft = scrollState.current.targetScrollLeft;
      } else {
        startAnimation();
      }
    },
    [getScrollContainer, startAnimation]
  );

  // ============================================================================
  // Drag Handlers
  // ============================================================================

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled) return;

      // Don't start drag if clicking on a path
      const target = e.target as Element;
      if (target.closest('.timeline-path')) return;

      const scrollContainer = getScrollContainer();
      if (!scrollContainer) return;

      // Sync target with current position
      scrollState.current.targetScrollLeft = scrollContainer.scrollLeft;
      scrollState.current.isDragging = true;
      scrollState.current.dragStartX = e.pageX;
      scrollState.current.dragStartScrollLeft = scrollContainer.scrollLeft;

      setIsDragging(true);
      startAnimation();
    },
    [enabled, getScrollContainer, startAnimation]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!scrollState.current.isDragging) return;

      const dx = e.pageX - scrollState.current.dragStartX;
      const newTarget = scrollState.current.dragStartScrollLeft - dx;
      setTargetScroll(newTarget, true); // immediate for drag
    },
    [setTargetScroll]
  );

  const handleMouseUp = useCallback(() => {
    scrollState.current.isDragging = false;
    scrollState.current.isAnimating = false;
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    scrollState.current.isDragging = false;
    scrollState.current.isAnimating = false;
    setIsDragging(false);
  }, []);

  // ============================================================================
  // Wheel Hijacking Effect
  // ============================================================================

  useEffect(() => {
    if (!enabled) return;

    const scrollContainer = getScrollContainer();
    const section = getSection();
    if (!scrollContainer || !section) return;

    // Initialize target from current scroll
    scrollState.current.targetScrollLeft = scrollContainer.scrollLeft;

    const handleWheel = (e: WheelEvent) => {
      // Don't hijack if dragging
      if (scrollState.current.isDragging) return;

      // Only hijack when section is roughly fullscreen
      const rect = section.getBoundingClientRect();
      const isFullScreen = Math.abs(rect.height - window.innerHeight) < 100;
      const isInView = rect.top <= 50 && rect.bottom >= window.innerHeight - 50;

      if (!isFullScreen || !isInView) return;

      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const target = scrollState.current.targetScrollLeft;

      // Boundary checks
      const threshold = 1;
      const isAtStart = target <= threshold;
      const isAtEnd = target >= maxScroll - threshold;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Allow normal page scroll at boundaries
      if (isAtStart && scrollingUp) return;
      if (isAtEnd && scrollingDown) return;

      // Hijack scroll
      e.preventDefault();

      // Update target with multiplier
      const scrollAmount = e.deltaY * wheelMultiplier;
      setTargetScroll(target + scrollAmount);
    };

    // Sync when external scroll happens (e.g., programmatic)
    const handleScroll = () => {
      if (!scrollState.current.isAnimating && !scrollState.current.isDragging) {
        scrollState.current.targetScrollLeft = scrollContainer.scrollLeft;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollState.current.isAnimating = false;
    };
  }, [enabled, getScrollContainer, getSection, setTargetScroll, wheelMultiplier]);

  return {
    isDragging,
    wrapperRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  };
}