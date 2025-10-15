import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  const resolved = (locales as readonly string[]).includes(locale as string)
    ? (locale as Locale)
    : 'en';
  const messages = (await import(`../messages/${resolved}.json`)).default;
  return { messages, locale: resolved } as any;
});

