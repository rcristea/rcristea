export type LocaleCode = 'en' | 'ro' | 'ru';

export interface Locale {
  code: LocaleCode;
  name: string;
  nativeName: string;
}

// Recursive type to support deeply nested translations
export type TranslationValue = string | { [key: string]: TranslationValue };
export type Translations = Record<string, TranslationValue>;
