"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { RebrandingGallery } from "@/components/rebranding-gallery"
import { SocialManagementGallery } from "@/components/social-management-gallery"

interface ShowcaseSwitcherProps {
  locale: string
}

export function ShowcaseSwitcher({ locale }: ShowcaseSwitcherProps) {
  const isArabic = locale === "ar"
  const [activeIndex, setActiveIndex] = useState(0) // 0: Rebranding, 1: Social
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    direction: isArabic ? "rtl" : "ltr",
    axis: "x",
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  })
  const [pickerRef, pickerApi] = useEmblaCarousel({
    loop: false,
    direction: isArabic ? "rtl" : "ltr",
    axis: "x",
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
  })

  // Dynamic height handling - refs and measurer come BEFORE onSelect to avoid TS errors
  const contentContainerRef = useRef<HTMLDivElement | null>(null)
  const slide0Ref = useRef<HTMLDivElement | null>(null)
  const slide1Ref = useRef<HTMLDivElement | null>(null)
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined)

  const measureAndSetHeight = useCallback((idx: number) => {
    const el = idx === 0 ? slide0Ref.current : slide1Ref.current
    if (el) {
      const h = el.offsetHeight
      if (h && h !== contentHeight) setContentHeight(h)
    }
  }, [contentHeight])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const idx = emblaApi.selectedScrollSnap()
    setActiveIndex(idx)
    pickerApi?.scrollTo(idx)
    // Update dynamic height on selection
    requestAnimationFrame(() => measureAndSetHeight(idx))
  }, [emblaApi, pickerApi, measureAndSetHeight])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  // Dynamic height handling

  useEffect(() => {
    // Measure initially and on window resize
    measureAndSetHeight(activeIndex)
    const handler = () => measureAndSetHeight(activeIndex)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [activeIndex, measureAndSetHeight])

  // React to content changes (images load, collapses) via ResizeObserver
  useEffect(() => {
    const target = activeIndex === 0 ? slide0Ref.current : slide1Ref.current
    if (!target) return
    const ro = new ResizeObserver(() => measureAndSetHeight(activeIndex))
    ro.observe(target)
    return () => ro.disconnect()
  }, [activeIndex, measureAndSetHeight])

  const SECTIONS = [
    {
      id: "rebranding",
      name: isArabic ? "معرض أعمال إعادة التصميم" : "Rebranding Showcase",
      badge: isArabic ? "تحويل الهوية" : "Branding",
    },
    {
      id: "social",
      name: isArabic ? "إدارة حسابات السوشيال" : "Social Accounts Management",
      badge: isArabic ? "نمو وتفاعل" : "Growth",
    },
  ]

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Sections picker as iOS-style carousel */}
        <div className="w-full mb-6">
          <div className="overflow-hidden" ref={pickerRef}>
            <div className="flex touch-pan-y backface-hidden">
              {SECTIONS.map((s, idx) => (
                <div
                  key={s.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_50%] px-2 cursor-pointer"
                  onPointerUp={() => {
                    setActiveIndex(idx)
                    emblaApi?.scrollTo(idx)
                    pickerApi?.scrollTo(idx)
                  }}
                >
                  <motion.div
                    animate={{
                      scale: activeIndex === idx ? 1 : 0.9,
                      opacity: activeIndex === idx ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.25 }}
                    className="relative"
                  >
                    {activeIndex === idx && (
                      <motion.div
                        className="absolute -inset-0.5 bg-gradient-to-r from-[#7ed957] via-[#5ba83f] to-[#7ed957] rounded-2xl blur opacity-40"
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: "200% 200%" }}
                      />
                    )}
                    <div
                      className={`relative p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                        activeIndex === idx
                          ? "bg-gradient-to-br from-[#7ed957]/20 to-[#5ba83f]/10 border-[#7ed957]/30 shadow-lg shadow-[#7ed957]/20"
                          : "bg-black/40 border-white/10"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                            activeIndex === idx ? "bg-[#7ed957] text-black" : "bg-white/10 text-white/60"
                          }`}
                        >
                          <span className="font-bold text-sm">{idx + 1}</span>
                        </div>
                        <h3
                          className={`font-bold text-sm sm:text-base transition-colors duration-300 ${
                            activeIndex === idx ? "text-[#7ed957]" : "text-white/60"
                          }`}
                        >
                          {s.name}
                        </h3>
                        <span
                          className={`text-xs rounded-md px-2 py-0.5 border ${
                            activeIndex === idx
                              ? "bg-[#7ed957]/20 text-[#7ed957] border-[#7ed957]/30"
                              : "bg-white/5 text-white/40 border-white/10"
                          }`}
                        >
                          {s.badge}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            {SECTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i)
                  emblaApi?.scrollTo(i)
                  pickerApi?.scrollTo(i)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "bg-[#7ed957] w-8" : "bg-white/20 w-2 hover:bg-white/40"
                }`}
                aria-label={`Go to section ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Swipeable content */}
        <div
          className="overflow-hidden"
          style={contentHeight ? { height: contentHeight, transition: 'height 300ms ease' } : { transition: 'height 300ms ease' }}
          ref={(node) => {
            // unify refs: pass to embla and keep local ref
            // emblaRef is a callback ref from the hook
            // @ts-ignore
            emblaRef(node)
            contentContainerRef.current = node
          }}
        >
          <div className="flex items-start">
            <div className="flex-[0_0_100%] min-w-0" ref={slide0Ref}>
              <RebrandingGallery locale={locale} />
            </div>
            <div className="flex-[0_0_100%] min-w-0" ref={slide1Ref}>
              <SocialManagementGallery locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


