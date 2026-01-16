export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Parses a hex color string to RGB values
 */
export function hexToRgb(hex: string): RGB {
  const cleanHex = hex.replace(/^#/, '').substring(0, 6);
  const match = cleanHex.match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

/**
 * Parses a CSS color value (hex or rgb) to RGB object
 */
export function parseCssColor(color: string): RGB {
  // Handle hex
  if (color.startsWith('#')) {
    return hexToRgb(color);
  }
  // Handle rgb/rgba
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }
  return { r: 0, g: 0, b: 0 };
}

/**
 * Gets a CSS variable value from the document
 */
export function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}
