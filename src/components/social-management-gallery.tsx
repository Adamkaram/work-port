"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { Badge } from "@/components/ui/badge"

interface SocialProject {
  id: string
  name: string
  nameAr: string
  industry: string
  industryAr: string
  posts: string[]
  highlights: string[]
}

interface SocialManagementGalleryProps {
  locale: string
}

const SOCIAL_PROJECTS: SocialProject[] = [
  {
    id: "diamond-social",
    name: "Diamond Jewelry",
    nameAr: "مجوهرات دياموند",
    industry: "Luxury & Jewelry",
    industryAr: "الفخامة والمجوهرات",
    posts: [
      "/gallery/diamond/dia-3.jpg",
      "/gallery/diamond/dia-4.jpg",
      "/gallery/diamond/dia-5.jpg",
      "/gallery/diamond/dia-3.jpg",
    ],
    highlights: ["+42% Engagement", "+3.1x Reach", "+1.8k Followers"],
  },
  {
    id: "beauty-social",
    name: "Glow Skincare",
    nameAr: "عيادة جلو",
    industry: "Beauty & Skincare",
    industryAr: "التجميل والعناية بالبشرة",
    posts: [
      "/gallery/diamond/dia-1.jpg",
      "/gallery/diamond/dia-2.jpg",
      "/gallery/diamond/dia-1.jpg",
      "/gallery/diamond/dia-2.jpg",
    ],
    highlights: ["+60% Saves", "+2.4x Impressions", "+950 Leads"],
  },
]

export function SocialManagementGallery({ locale }: SocialManagementGalleryProps) {
  const isArabic = locale === "ar"
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: isArabic ? "rtl" : "ltr",
    axis: "x",
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
  })

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

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

  if (SOCIAL_PROJECTS.length === 0) return null

  const current = SOCIAL_PROJECTS[selectedIndex]

  return (
    <section className="w-full py-8 md:py-10 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block rounded-lg bg-[#7ed957] text-black px-4 py-2 text-sm font-semibold mb-4"
          >
            {isArabic ? "إدارة حسابات السوشيال" : "Social Accounts Management"}
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{
              background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 15%, #7ed957 25%, #5ba83f 30%, #7ed957 35%, #ffffff 45%, #ffffff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {isArabic ? "نمو مستمر وتفاعل حقيقي" : "Consistent Growth & Real Engagement"}
          </motion.h2>

          <motion.p
            className="mt-3 text-base md:text-lg max-w-2xl mx-auto"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{
              background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 15%, #7ed957 25%, #5ba83f 30%, #7ed957 35%, #ffffff 45%, #ffffff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {isArabic
              ? 'إدارة محترفة للمحتوى والتصميم والتحليلات لتحقيق أفضل نتائج للنمو.'
              : 'Professional content, design, and analytics management to drive sustainable growth.'}
          </motion.p>
        </div>

        {/* Carousel picker */}
        <div className="w-full mb-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y backface-hidden">
              {SOCIAL_PROJECTS.map((p, idx) => (
                <div
                  key={p.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] px-2 cursor-pointer"
                  onPointerUp={() => {
                    setSelectedIndex(idx)
                    emblaApi?.scrollTo(idx)
                  }}
                >
                  <motion.div
                    animate={{
                      scale: selectedIndex === idx ? 1 : 0.85,
                      opacity: selectedIndex === idx ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    {selectedIndex === idx && (
                      <motion.div
                        className="absolute -inset-0.5 bg-gradient-to-r from-[#7ed957] via-[#5ba83f] to-[#7ed957] rounded-2xl blur opacity-40"
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: "200% 200%" }}
                      />
                    )}
                    <div
                      className={`relative p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                        selectedIndex === idx
                          ? "bg-gradient-to-br from-[#7ed957]/20 to-[#5ba83f]/10 border-[#7ed957]/30 shadow-lg shadow-[#7ed957]/20"
                          : "bg-black/40 border-white/10"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3 text-center">
                        <div
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                            selectedIndex === idx ? "bg-[#7ed957] text-black" : "bg-white/10 text-white/60"
                          }`}
                        >
                          <span className="font-bold text-lg">{idx + 1}</span>
                        </div>
                        <h3
                          className={`font-bold text-base sm:text-lg transition-colors duration-300 ${
                            selectedIndex === idx ? "text-[#7ed957]" : "text-white/60"
                          }`}
                        >
                          {isArabic ? p.nameAr : p.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className={`text-xs transition-all duration-300 ${
                            selectedIndex === idx
                              ? "bg-[#7ed957]/20 text-[#7ed957] border-[#7ed957]/30"
                              : "bg-white/5 text-white/40 border-white/10"
                          }`}
                        >
                          {isArabic ? p.industryAr : p.industry}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {SOCIAL_PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedIndex(i)
                  emblaApi?.scrollTo(i)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === i ? "bg-[#7ed957] w-8" : "bg-white/20 w-2 hover:bg-white/40"
                }`}
                aria-label={`Go to client ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <div className="bg-[#7ed957]/10 border border-[#7ed957]/20 rounded-lg p-2 text-center mb-3">
              <span className="text-[#7ed957] font-semibold">
                {isArabic ? "عينات من البوستات" : "Sample Posts"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-3">
              {current.posts.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10">
                  <Image src={img} alt={`Post ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {isArabic ? current.nameAr : current.name}
              </h3>
              <p className="text-white/70 text-sm md:text-base">
                {isArabic
                  ? "إدارة شاملة للمحتوى، التقويم التحريري، تصميمات احترافية، وتحليل النتائج بشكل دوري."
                  : "Full content management, editorial calendar, professional designs, and periodic analytics."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {current.highlights.map((h, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-[#7ed957]/10 via-[#7ed957]/5 to-transparent border border-[#7ed957]/20"
                >
                  <div className="text-xl font-bold text-[#7ed957] mb-0.5">{h.split(" ")[0]}</div>
                  <div className="text-xs text-white/70 font-medium">{h.split(" ").slice(1).join(" ")}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


