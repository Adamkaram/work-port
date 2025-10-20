"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { DATA } from "@/data/resume"

interface GlobalWhatsAppModalProps {
  locale: string
}

export function GlobalWhatsAppModal({ locale }: GlobalWhatsAppModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onOpen = () => setIsOpen(true)
    const onClose = () => setIsOpen(false)
    window.addEventListener("open-whatsapp-modal", onOpen as EventListener)
    window.addEventListener("close-whatsapp-modal", onClose as EventListener)
    return () => {
      window.removeEventListener("open-whatsapp-modal", onOpen as EventListener)
      window.removeEventListener("close-whatsapp-modal", onClose as EventListener)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  if (typeof window === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog - free positioning, centered by default */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[105] p-4 flex items-end sm:items-center justify-center"
          >
            <div className="bg-black/95 backdrop-blur-2xl border border-[#25D366]/40 rounded-2xl p-4 shadow-2xl shadow-[#25D366]/30 w-[min(360px,calc(100vw-64px))] max-h-[80vh] overflow-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <span className="text-white font-semibold text-sm">
                    {locale === 'ar' ? 'اختر الدولة' : 'Select Country'}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={DATA.contact.social.WhatsAppKuwait.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#25D366]/10 to-transparent border border-white/10 hover:border-[#25D366]/50 p-4 transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="absolute inset-0 bg-[#25D366]/0 group-hover:bg-[#25D366]/10 transition-colors duration-300" />
                  <div className="relative flex flex-col items-center gap-2">
                    <span className="text-4xl">🇰🇼</span>
                    <span className="text-white font-semibold text-sm">{locale === 'ar' ? 'الكويت' : 'Kuwait'}</span>
                    <span className="text-white/60 text-xs" dir="ltr">{DATA.contact.social.WhatsAppKuwait.phone}</span>
                  </div>
                </Link>

                <Link
                  href={DATA.contact.social.WhatsAppEgypt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#25D366]/10 to-transparent border border-white/10 hover:border-[#25D366]/50 p-4 transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => setIsOpen(false)}
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
    </AnimatePresence>,
    document.body
  )
}


