import type { Locale, LocaleCode } from './types';

export const DEFAULT_LOCALE: LocaleCode = 'en';

export const LOCALES: Locale[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

export const LOCALE_MAP: Record<LocaleCode, Locale> = {
  en: LOCALES[0],
  ro: LOCALES[1],
  ru: LOCALES[2],
};
