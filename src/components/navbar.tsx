"use client"

import { useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ locale }: { locale: string }) {
  const [showWhatsAppMenu, setShowWhatsAppMenu] = useState(false);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-black to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]"></div>
      
      {/* WhatsApp Floating Menu - Centered Above Navbar */}
      <AnimatePresence>
        {showWhatsAppMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
              onClick={() => setShowWhatsAppMenu(false)}
            />
            
            {/* Floating Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", damping: 20 }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto w-[90vw] max-w-[340px] flex justify-center"
            >
              <div className="bg-black/95 backdrop-blur-2xl border border-[#25D366]/40 rounded-2xl p-3 shadow-2xl shadow-[#25D366]/30 w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-sm">
                      {locale === 'ar' ? 'اختر الدولة' : 'Select Country'}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowWhatsAppMenu(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Countries Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Kuwait */}
                  <Link
                    href={DATA.contact.social.WhatsAppKuwait.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#25D366]/10 to-transparent border border-white/10 hover:border-[#25D366]/50 p-4 transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => setShowWhatsAppMenu(false)}
                  >
                    <div className="absolute inset-0 bg-[#25D366]/0 group-hover:bg-[#25D366]/10 transition-colors duration-300" />
                    <div className="relative flex flex-col items-center gap-2">
                      <span className="text-4xl">🇰🇼</span>
                      <span className="text-white font-semibold text-sm">{locale === 'ar' ? 'الكويت' : 'Kuwait'}</span>
                      <span className="text-white/60 text-xs" dir="ltr">{DATA.contact.social.WhatsAppKuwait.phone}</span>
                    </div>
                  </Link>

                  {/* Egypt */}
                  <Link
                    href={DATA.contact.social.WhatsAppEgypt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#25D366]/10 to-transparent border border-white/10 hover:border-[#25D366]/50 p-4 transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => setShowWhatsAppMenu(false)}
                  >
                    <div className="absolute inset-0 bg-[#25D366]/0 group-hover:bg-[#25D366]/10 transition-colors duration-300" />
                    <div className="relative flex flex-col items-center gap-2">
                      <span className="text-4xl">🇪🇬</span>
                      <span className="text-white font-semibold text-sm">{locale === 'ar' ? 'مصر' : 'Egypt'}</span>
                      <span className="text-white/60 text-xs" dir="ltr">{DATA.contact.social.WhatsAppEgypt.phone}</span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-black/80 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        {/* Social Media Icons */}
        {Object.entries(DATA.contact.social)
          .filter(([name, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              {name === 'WhatsApp' ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setShowWhatsAppMenu(!showWhatsAppMenu)}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12",
                        "text-[#25D366] hover:text-[#20BA5A] hover:bg-[#25D366]/10"
                      )}
                    >
                      <social.icon className="size-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12"
                      )}
                    >
                      <social.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </DockIcon>
          ))}
        
        <Separator orientation="vertical" className="h-full py-2" />
        
        <DockIcon>
          <LanguageSwitcher locale={locale} />
        </DockIcon>
      </Dock>
    </div>
  );
}
