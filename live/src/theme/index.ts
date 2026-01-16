import { dark, light } from './constants';export type { Theme, ThemePalette, ThemePaletteOptions } from './types';

import type { Theme } from './types';

export function getThemeVars(theme: Theme) {
  return {
    'background-main': theme.palette.background.main,
    'background-contrast': theme.palette.background.contrast,
    'background-light': theme.palette.background.light,
    'background-dark': theme.palette.background.dark,
    'text-main': theme.palette.text.main,
    'text-contrast': theme.palette.text.contrast,
    'text-light': theme.palette.text.light,
    'text-dark': theme.palette.text.dark,
    'primary-main': theme.palette.primary.main,
    'primary-contrast': theme.palette.primary.contrast,
    'primary-light': theme.palette.primary.light,
    'primary-dark': theme.palette.primary.dark,
    'secondary-main': theme.palette.secondary.main,
    'secondary-contrast': theme.palette.secondary.contrast,
    'secondary-light': theme.palette.secondary.light,
    'secondary-dark': theme.palette.secondary.dark,
  };
}
export { dark, light };