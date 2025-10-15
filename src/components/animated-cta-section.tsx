"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BackgroundPaths } from "./ui/floating-paths"
import { DATA } from "@/data/resume"

interface AnimatedCTASectionProps {
  locale: string
  badge: string
  title: string
  titleHighlight: string
}

export function AnimatedCTASection({ locale, badge, title, titleHighlight }: AnimatedCTASectionProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative w-screen min-h-screen overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex items-center pb-0 mb-0">
      {/* Animated Background - Full Width */}
      {/* Create stacking context to visually mask global squares */}
      <div className="absolute inset-0 min-h-full will-change-transform [transform:translateZ(0)]">
        <div className="h-full w-full bg-gradient-to-br from-black via-black to-black">
          <BackgroundPaths />
          <div className="absolute inset-0 opacity-20">
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
      <div className="relative z-10 container mx-auto px-4 pb-0 mb-0">
        <div
          className="rounded-2xl p-12 text-center animate-fade-in-up"
          ref={contentRef}
          style={{ animationDelay: "0.3s" }}
        >
          <div 
            className="inline-block rounded-lg bg-[#7ed957] text-black px-3 py-1 text-sm mb-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            {badge}
          </div>
          
          <motion.h2 
            className="text-4xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in-up sm:text-5xl"
            style={{ animationDelay: "0.5s" }}
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
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up"
            style={{ animationDelay: "0.7s" }}
          >
            {locale === 'ar' 
              ? 'دعنا نبني موقعك معاً. تواصل معنا عبر واتساب أو إنستجرام لمناقشة مشروعك الرقمي القادم.'
              : "Let's build your website together. Reach out to us via WhatsApp or Instagram to discuss your next digital project."
            }
          </p>
          
          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.9s" }}
          >
            <Link
              href={DATA.contact.social.WhatsApp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 text-white border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed957]/40 group"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#7ed957]/20 text-[#7ed957] ring-1 ring-inset ring-[#7ed957]/30 group-hover:bg-[#7ed957]/25">✓</span>
              <span className="font-semibold tracking-wide">{locale === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}</span>
            </Link>
            
            <Link
              href={DATA.contact.social.Instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 text-white border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 group"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/15 text-white ring-1 ring-inset ring-white/25 group-hover:bg-white/20">@</span>
              <span className="font-semibold tracking-wide">{locale === 'ar' ? 'تواصل عبر إنستجرام' : 'Contact via Instagram'}</span>
            </Link>
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

