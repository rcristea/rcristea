/**
 * Detects if the device is mobile/touch-based
 */
export function isMobileDevice(): boolean {
  // Check user agent for mobile devices
  const mobileUserAgentRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (mobileUserAgentRegex.test(navigator.userAgent)) {
    return true;
  }

  // Check for coarse pointer (touch screens)
  if (window.matchMedia('(pointer: coarse)').matches) {
    return true;
  }

  // Check screen size
  if (window.innerWidth <= 768) {
    return true;
  }

  // Fallback: check for touch support + small screen
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  return hasTouch && isSmallScreen;
}
