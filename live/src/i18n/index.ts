export { DEFAULT_LOCALE, LOCALES, LOCALE_MAP } from './constants';
export type { LocaleCode, Locale, Translations } from './types';

import en from '../assets/i18n/en.json';
import ro from '../assets/i18n/ro.json';
import ru from '../assets/i18n/ru.json';
import type { LocaleCode, Translations } from './types';

export const translations: Record<LocaleCode, Translations> = {
  en,
  ro,
  ru,
};

/**
 * Get a value from an object by dot-notation path
 */
function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

/**
 * Get a translation value by dot-notation path
 * @param locale - The locale code
 * @param path - Dot-notation path (e.g., 'projects.portfolio.title')
 * @returns The translated string or the path if not found
 */
export function t(locale: LocaleCode, path: string): string {
  const value = getByPath(translations[locale], path);
  if (typeof value === 'string') {
    return value;
  }
  // Fallback to English
  const fallback = getByPath(translations.en, path);
  if (typeof fallback === 'string') {
    return fallback;
  }
  return path;
}
