"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { BackgroundPaths } from "./ui/floating-paths"
import { DATA } from "@/data/resume"
import { Icons } from "@/components/icons"

interface AnimatedCTASectionProps {
  locale: string
  badge: string
  title: string
  titleHighlight: string
}

export function AnimatedCTASection({ locale, badge, title, titleHighlight }: AnimatedCTASectionProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [selectedCountry, setSelectedCountry] = useState<'kuwait' | 'egypt'>('kuwait')

  return (
    <section className="relative w-[100vw] min-h-screen overflow-x-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex items-center pb-24 sm:pb-12">
      {/* Animated Background - Full Width */}
      {/* Create stacking context to visually mask global squares */}
      <div className="absolute inset-0 min-h-full will-change-transform [transform:translateZ(0)]">
        <div className="h-full w-full bg-gradient-to-br from-black via-black to-black">
          <BackgroundPaths />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7ed957]/10 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5ba83f]/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#7ed957]/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-0 mb-0">
        <div
          className="relative rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 animate-fade-in-up overflow-hidden"
          ref={contentRef}
          style={{ animationDelay: "0.3s" }}
        >
          {/* 3D Logo as Background - RTL aware positioning */}
          <div className={`absolute ${locale === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.03] pointer-events-none overflow-hidden`}
               style={{ transform: `translateY(-50%) ${locale === 'ar' ? 'translateX(-10%)' : 'translateX(10%)'}` }}>
            <Image
              src="/3d-logo.png"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Flex Container for Logo and Content */}
          <div className={`relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 ${locale === 'ar' ? '' : 'lg:flex-row-reverse'}`}>
            
            {/* 3D Logo - Left Side (or Right in Arabic) */}
            <motion.div
              className="flex-shrink-0 w-full sm:w-[280px] md:w-[350px] lg:w-[450px] flex justify-center lg:justify-start"
              initial={{ opacity: 0, x: locale === 'ar' ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full">
                {/* Glow Effect Behind Logo */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-[#7ed957]/20 rounded-full blur-3xl" />
                </motion.div>
                
                <Image
                  src="/3d-logo.png"
                  alt="Athar Agency 3D Logo"
                  width={600}
                  height={600}
                  className="object-contain drop-shadow-2xl relative z-10 opacity-90 hover:opacity-100 transition-opacity duration-300 w-full h-auto"
                  priority
                />
              </div>
            </motion.div>

            {/* Contact Information - Right Side (or Left in Arabic) */}
            <div className={`flex-1 w-full ${locale === 'ar' ? 'text-right' : 'text-left'} space-y-4 sm:space-y-6`}>
              <div 
                className="inline-block rounded-lg bg-[#7ed957] text-black px-3 py-1 text-xs sm:text-sm mb-2 animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
          >
            {badge}
          </div>
          
          <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg animate-fade-in-up leading-tight"
                style={{ animationDelay: "0.7s" }}
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            dangerouslySetInnerHTML={{
              __html: title.replace('__PROJECT__', titleHighlight)
            }}
          />
          
          <p 
                className="text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 drop-shadow-md animate-fade-in-up"
                style={{ animationDelay: "0.9s" }}
          >
            {locale === 'ar' 
                  ? 'دعنا نبني موقعك معاً. تواصل معنا الآن لمناقشة مشروعك الرقمي القادم.'
                  : "Let's build your website together. Reach out to us now to discuss your next digital project."
            }
          </p>

              {/* Contact Details */}
              <div 
                className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 animate-fade-in-up"
                style={{ animationDelay: "1.1s" }}
              >
                {/* Phone Numbers */}
                <div className="flex items-center gap-2 sm:gap-3 text-white/90">
                  <span className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#7ed957]/20 text-[#7ed957] flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm text-white/60">{locale === 'ar' ? 'الهاتف' : 'Phone'}</span>
                    <span className="font-semibold text-sm sm:text-base" dir="ltr">+965 94473236</span>
                    <span className="font-semibold text-sm sm:text-base" dir="ltr">+20 10 96343948</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 sm:gap-3 text-white/90">
                  <span className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#7ed957]/20 text-[#7ed957] flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm text-white/60">{locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}</span>
                    <a href={`mailto:${DATA.contact.email}`} className="font-semibold hover:text-[#7ed957] transition-colors text-sm sm:text-base truncate">
                      {DATA.contact.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 sm:gap-3 text-white/90">
                  <span className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#7ed957]/20 text-[#7ed957] flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm text-white/60">{locale === 'ar' ? 'المواقع' : 'Locations'}</span>
                    <span className="font-semibold text-sm sm:text-base">{locale === 'ar' ? 'الكويت العاصمة، مصر القاهرة' : 'Kuwait City, Cairo Egypt'}</span>
                  </div>
                </div>
              </div>
          
              {/* CTA Buttons - Enhanced Design */}
              <div 
                className="flex flex-col gap-4 animate-fade-in-up w-full"
                style={{ animationDelay: "1.3s" }}
              >
                {/* Country Selector Pills */}
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <button
                    onClick={() => setSelectedCountry('kuwait')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                      selectedCountry === 'kuwait'
                        ? 'bg-gradient-to-r from-[#7ed957] to-[#6bc847] text-black shadow-lg shadow-[#7ed957]/30'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-base">🇰🇼</span>
                    <span className="text-sm sm:text-base">{locale === 'ar' ? 'الكويت' : 'Kuwait'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedCountry('egypt')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                      selectedCountry === 'egypt'
                        ? 'bg-gradient-to-r from-[#7ed957] to-[#6bc847] text-black shadow-lg shadow-[#7ed957]/30'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-base">🇪🇬</span>
                    <span className="text-sm sm:text-base">{locale === 'ar' ? 'مصر' : 'Egypt'}</span>
                  </button>
                </div>

                {/* WhatsApp Button - Changes based on selection */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCountry}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
          >
            <Link
                      href={selectedCountry === 'kuwait' ? DATA.contact.social.WhatsAppKuwait.url : DATA.contact.social.WhatsAppEgypt.url}
              target="_blank"
              rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#7ed957] text-black font-semibold transition-all duration-300 hover:bg-[#6bc847] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed957]/40 group shadow-lg shadow-[#7ed957]/20 w-full"
                    >
                      <DATA.contact.social.WhatsApp.icon className="w-6 h-6" />
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-base sm:text-lg">{locale === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}</span>
                        <span className="text-xs opacity-80" dir="ltr">
                          {selectedCountry === 'kuwait' ? DATA.contact.social.WhatsAppKuwait.phone : DATA.contact.social.WhatsAppEgypt.phone}
                        </span>
                      </div>
            </Link>
                  </motion.div>
                </AnimatePresence>
            
                {/* Instagram Button */}
            <Link
              href={DATA.contact.social.Instagram.url}
              target="_blank"
              rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur-sm font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 group w-full"
            >
                  <DATA.contact.social.Instagram.icon className="w-5 h-5" />
                  <span className="text-sm sm:text-base">{locale === 'ar' ? 'إنستجرام' : 'Instagram'}</span>
            </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(24px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}

