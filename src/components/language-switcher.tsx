"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    // Replace the locale in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          className="w-9 h-9"
          onClick={switchLocale}
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{locale === "en" ? "العربية" : "English"}</p>
      </TooltipContent>
    </Tooltip>
  );
}







