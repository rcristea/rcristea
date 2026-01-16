/**
 * TimelineModal Component (React Island)
 *
 * Modal for displaying timeline event details.
 * Features navigation arrows, keyboard controls, and GSAP animations.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import type { TimelineEvent } from './types';
import { formatDuration, monthToName } from './utils';

interface TimelineModalProps {
  events: TimelineEvent[];
}

interface ModalState {
  isOpen: boolean;
  currentEventId: string | null;
}

export default function TimelineModal({ events }: TimelineModalProps) {
  // State
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    currentEventId: null,
  });

  // Refs
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  // Track if modal has been opened (to skip animation on navigation)
  const hasAnimatedOpenRef = useRef(false);

  // Derived state
  const currentEvent = events.find((e) => e.id === modalState.currentEventId);
  const sortedEvents = [...events].sort((a, b) => {
    const aDate = a.startDate.year * 12 + a.startDate.month;
    const bDate = b.startDate.year * 12 + b.startDate.month;
    return aDate - bDate;
  });
  const currentIndex = sortedEvents.findIndex((e) => e.id === modalState.currentEventId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < sortedEvents.length - 1;
  const previousEvent = hasPrevious ? sortedEvents[currentIndex - 1] : null;
  const nextEvent = hasNext ? sortedEvents[currentIndex + 1] : null;

  // Request event body content from Astro when event changes
  useEffect(() => {
    if (modalState.currentEventId) {
      // Dispatch event to request the pre-rendered Astro component content
      window.dispatchEvent(
        new CustomEvent('timeline:requestEventBody', {
          detail: { eventId: modalState.currentEventId },
        })
      );
    }
  }, [modalState.currentEventId]);

  // Listen for open modal events
  useEffect(() => {
    const handleOpenModal = (e: CustomEvent<{ eventId: string }>) => {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setModalState({ isOpen: true, currentEventId: e.detail.eventId });
    };

    window.addEventListener('timeline:openModal', handleOpenModal as EventListener);
    return () => {
      window.removeEventListener('timeline:openModal', handleOpenModal as EventListener);
    };
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);
      
      if (hash) {
        // Check if hash matches an event
        const event = events.find((e) => e.id === hash);
        if (event) {
          setModalState({ isOpen: true, currentEventId: hash });
        } else {
          // Hash doesn't match any event, close modal
          setModalState({ isOpen: false, currentEventId: null });
        }
      } else {
        // No hash, close modal
        if (modalState.isOpen) {
          setModalState({ isOpen: false, currentEventId: null });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [events, modalState.isOpen]);

  // GSAP animation for open/close (only on first open and explicit close)
  useEffect(() => {
    // Skip if no event selected (empty backdrop state)
    if (!currentEvent) return;
    if (!backdropRef.current || !contentRef.current) return;

    if (modalState.isOpen) {
      // Show the modal
      gsap.set(backdropRef.current, { display: 'flex' });
      
      // Only animate on first open, not when navigating between events
      if (!hasAnimatedOpenRef.current) {
        hasAnimatedOpenRef.current = true;
        
        // Open animation
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: 'power2.out' }
        );
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.3, 
            ease: 'power2.out', 
            delay: 0.1,
          }
        );

        // Focus close button
        setTimeout(() => closeButtonRef.current?.focus(), 100);
      }
    } else {
      // Close animation
      hasAnimatedOpenRef.current = false; // Reset for next open
      
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.in',
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        delay: 0.1,
        onComplete: () => {
          if (backdropRef.current) {
            backdropRef.current.style.display = 'none';
          }
          // Clear currentEventId after animation completes
          setModalState({ isOpen: false, currentEventId: null });
          // Restore focus
          previousFocusRef.current?.focus();
        },
      });
    }
  }, [modalState.isOpen, currentEvent]);

  // Keyboard navigation
  useEffect(() => {
    if (!modalState.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          if (hasPrevious && previousEvent) {
            handleNavigate(previousEvent.id);
          }
          break;
        case 'ArrowRight':
          if (hasNext && nextEvent) {
            handleNavigate(nextEvent.id);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalState.isOpen, hasPrevious, hasNext, previousEvent, nextEvent]);

  // Focus trap
  useEffect(() => {
    if (!modalState.isOpen || !contentRef.current) return;

    const focusableElements = contentRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [modalState.isOpen]);

  const handleClose = useCallback(() => {
    // Only set isOpen to false - keep currentEventId so content remains visible during animation
    // The GSAP onComplete callback will clear currentEventId after animation finishes
    setModalState((prev) => ({ ...prev, isOpen: false }));
    // Use replaceState to avoid adding to history when closing
    // This allows browser back to go to previous page instead of cycling through modal states
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const handleNavigate = useCallback((eventId: string) => {
    // Update URL hash - use pushState so browser back goes to previous event
    window.history.pushState(null, '', `#${eventId}`);
    setModalState((prev) => ({ ...prev, currentEventId: eventId }));
  }, []);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      handleClose();
    }
  }, [handleClose]);

  // Show empty backdrop when no event is selected
  if (!currentEvent) {
    return (
      <div
        ref={backdropRef}
        className="timeline-modal-backdrop"
        style={{ display: 'none' }}
        aria-hidden="true"
      />
    );
  }

  const duration = formatDuration(currentEvent.startDate, currentEvent.endDate);
  const startDateStr = `${monthToName(currentEvent.startDate.month)} ${currentEvent.startDate.year}`;
  const endDateStr = currentEvent.endDate === 'present'
    ? 'Present'
    : currentEvent.endDate
      ? `${monthToName(currentEvent.endDate.month)} ${currentEvent.endDate.year}`
      : null;

  return (
    <div
      ref={backdropRef}
      className="timeline-modal-backdrop"
      style={{ display: 'none' }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div ref={contentRef} className="timeline-modal-content">
        {/* Header */}
        <header className="timeline-modal-header">
          <div className="timeline-modal-dates">
            <span className="timeline-modal-date-range">
              {startDateStr}
              {endDateStr && ` – ${endDateStr}`}
            </span>
            <span className="timeline-modal-duration">({duration})</span>
          </div>
          <h2 id="modal-title" className="timeline-modal-title">
            {currentEvent.title}
          </h2>
          {currentEvent.category && (
            <span className="timeline-modal-category">{currentEvent.category}</span>
          )}
        </header>

        {/* Close button */}
        <button
          ref={closeButtonRef}
          className="timeline-modal-close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Body */}
        <div className="timeline-modal-body">
          <p className="timeline-modal-description">{currentEvent.description}</p>

          {/* Container for dynamically injected Astro component content */}
          <div className="timeline-modal-component" />
        </div>

        {/* Footer with navigation */}
        <footer className="timeline-modal-footer">
          <button
            className={`timeline-modal-nav timeline-modal-nav-prev ${!hasPrevious ? 'disabled' : ''}`}
            onClick={() => previousEvent && handleNavigate(previousEvent.id)}
            disabled={!hasPrevious}
            aria-label={hasPrevious ? `Previous: ${previousEvent?.title}` : 'No previous event'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
            <span className="timeline-modal-nav-label">
              {hasPrevious ? previousEvent?.title : 'Start'}
            </span>
          </button>

          <span className="timeline-modal-nav-position">
            {currentIndex + 1} / {sortedEvents.length}
          </span>

          <button
            className={`timeline-modal-nav timeline-modal-nav-next ${!hasNext ? 'disabled' : ''}`}
            onClick={() => nextEvent && handleNavigate(nextEvent.id)}
            disabled={!hasNext}
            aria-label={hasNext ? `Next: ${nextEvent?.title}` : 'No next event'}
          >
            <span className="timeline-modal-nav-label">
              {hasNext ? nextEvent?.title : 'End'}
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,6 15,12 9,18" />
            </svg>
          </button>
        </footer>
      </div>
    </div>
  );
}
