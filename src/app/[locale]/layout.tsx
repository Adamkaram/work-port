import Navbar from "@/components/navbar";
import { Squares } from "@/components/ui/squares-background";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "../globals.css";
import { League_Spartan } from "next/font/google";

const leagueSpartan = League_Spartan({ subsets: ["latin"], weight: ["400","600","700"] });

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

const locales = ['en', 'ar'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Get messages from next-intl (configured in i18n.ts)
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div
        className={cn(
          "min-h-screen bg-black antialiased max-w-2xl mx-auto pt-12 sm:pt-24 px-6 pb-0",
          locale === 'ar' ? 'font-cairo' : leagueSpartan.className
        )}
        style={{
          direction: locale === 'ar' ? 'rtl' : 'ltr',
          fontFamily:
            locale === 'ar'
              ? "'Cairo', 'Alexandria', system-ui, -apple-system, sans-serif"
              : "'League Spartan', system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Global animated background (disabled inside CTA by stacking contexts) */}
        <div className="fixed inset-0 -z-10">
          <Squares direction="diagonal" speed={0.5} squareSize={40} borderColor="#222" hoverFillColor="#111" lineGradient="whiteGray" globalOpacity={0.3} />
        </div>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar locale={locale} />
          </TooltipProvider>
        </ThemeProvider>
      </div>
    </NextIntlClientProvider>
  );
}

