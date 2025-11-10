"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'

interface SocialLinks {
  instagram?: string
  facebook?: string
  website?: string
}

interface ProjectData {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  country: string
  countryAr: string
  category: string
  categoryAr: string
  beforeImages: string[]
  afterImages: string[]
  // صور المقارنة المخصصة (اختياري)
  compare?: {
    before: string
    after: string
  }
  // فيديو اختياري للمشروع
  video?: string
  // شعار المشروع (اختياري)
  logo?: string
  // ملف PDF للعرض التقديمي (اختياري)
  pdf?: string
  socialLinks: SocialLinks
}

interface RebrandingGalleryProps {
  locale: string
}

// Portal to ensure lightbox overlays are always relative to viewport
function Portal({ children }: { children: React.ReactNode }) {
  if (typeof window === 'undefined') return null
  return createPortal(children, document.body)
}

// يمكنك إضافة المشاريع هنا
const PROJECTS: ProjectData[] = [
  {
    id: "diamond-jewelry",
    name: "Diamond Jewelry Collection",
    nameAr: "مجوهرات الماس",
    description: "Luxury diamond jewelry brand featuring exquisite designs and premium craftsmanship. Complete visual identity and product photography showcase.",
    descriptionAr: "علامة تجارية فاخرة للمجوهرات الماسية تضم تصاميم راقية وحرفية متميزة. هوية بصرية كاملة وعرض احترافي للمنتجات.",
    country: "Kuwait",
    countryAr: "الكويت",
    category: "Luxury & Jewelry",
    categoryAr: "الفخامة والمجوهرات",
    beforeImages: [
      "/gallery/diamond-media/before/1.webp",
      "/gallery/diamond-media/before/2.webp",
      "/gallery/diamond-media/before/3.webp",
      "/gallery/diamond-media/before/4.webp",
      "/gallery/diamond-media/before/5.webp",
      "/gallery/diamond-media/before/6.webp"
    ],
    afterImages: [
      "/gallery/diamond-media/after/1.webp",
      "/gallery/diamond-media/after/2.webp",
      "/gallery/diamond-media/after/3.webp",
      "/gallery/diamond-media/after/4.webp",
      "/gallery/diamond-media/after/5.webp",
      "/gallery/diamond-media/after/6.webp"
    ],
    compare: {
      before: "/gallery/diamond-media/compare/befor.webp",
      after: "/gallery/diamond-media/compare/after.webp"
    },
    video: "/gallery/diamond-media/vid/1.mp4",
    logo: "/gallery/diamond-media/logo/DIAMOND-logo.webp",
    pdf: "/gallery/diamond-media/pdf-representaion/Re-Branding Diamond.pdf",
    socialLinks: {
      instagram: "https://www.instagram.com/diamondartjewellery"
    }
  },
  {
    id: "my-moments",
    name: "My Moments",
    nameAr: "ماي مومنت",
    description: "Event planning and celebration management. Creating unforgettable memories for weddings, birthdays, graduations, and all your special occasions 💍",
    descriptionAr: "تنظيم حفلات ومناسبات ماي مومنت، صنع لحظاتكم ذكرى ما تُنسى💍 أعراس، مواليد، تخرج وحفلاتكم كلها عندنا",
    country: "Saudi Arabia",
    countryAr: "السعودية",
    category: "Events & Celebrations",
    categoryAr: "المناسبات والحفلات",
    beforeImages: [
      "/gallery/mmonents-media/before/1.webp",
      "/gallery/mmonents-media/before/2.webp",
      "/gallery/mmonents-media/before/3.webp",
      "/gallery/mmonents-media/before/4.webp",
      "/gallery/mmonents-media/before/5.webp"
    ],
    afterImages: [
      "/gallery/mmonents-media/after/1.webp",
      "/gallery/mmonents-media/after/2.webp",
      "/gallery/mmonents-media/after/3.webp",
      "/gallery/mmonents-media/after/4.webp",
      "/gallery/mmonents-media/after/5.webp",
      "/gallery/mmonents-media/after/6.webp"
    ],
    compare: {
      before: "/gallery/mmonents-media/compare/before.webp",
      after: "/gallery/mmonents-media/compare/after.webp"
    },
    video: "/gallery/mmonents-media/vid-rep/video.mp4",
    logo: "/gallery/mmonents-media/logo/Logo.webp",
    pdf: "/gallery/mmonents-media/pdf-representaion/Branding.pdf",
    socialLinks: {
      instagram: "https://www.instagram.com/mymoments"
    }
  }
]

export function RebrandingGallery({ locale }: RebrandingGalleryProps) {
  const [viewMode, setViewMode] = useState<'after' | 'before' | 'compare'>('after')
  const [compareSlider, setCompareSlider] = useState(50)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [pointerDownPos, setPointerDownPos] = useState({ x: 0, y: 0 })

  const isArabic = locale === 'ar'
  
  // Embla Carousel for projects picker
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: isArabic ? 'rtl' : 'ltr',
    axis: 'x',
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
  })

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedProjectIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const handleProjectClick = useCallback((index: number) => {
    if (isDragging) return
    setSelectedProjectIndex(index)
    emblaApi?.scrollTo(index)
  }, [emblaApi, isDragging])

  useEffect(() => {
    if (!emblaApi) return
    
    const onPointerDown = () => setIsDragging(false)
    const onPointerUp = () => {
      // Small delay to detect if it was a drag
      setTimeout(() => setIsDragging(false), 100)
    }
    const onDragStart = () => setIsDragging(true)
    
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('pointerDown', onPointerDown)
    emblaApi.on('pointerUp', onPointerUp)
    emblaApi.on('scroll', onDragStart)
    
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
      emblaApi.off('pointerDown', onPointerDown)
      emblaApi.off('pointerUp', onPointerUp)
      emblaApi.off('scroll', onDragStart)
    }
  }, [emblaApi, onSelect])
  
  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images)
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
  }
  
  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length)
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, lightboxImages.length])
  
  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lightboxOpen])
  
  if (PROJECTS.length === 0) return null

  return (
    <section className="w-full py-16 md:py-24 overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block rounded-lg bg-[#7ed957] text-black px-4 py-2 text-sm font-semibold mb-4"
          >
            {isArabic ? 'قسم التسويق الرقمى' : 'Digital Marketing department'}
          </motion.div>
          
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{
              background: "linear-gradient(90deg, #ffffff 0%, #ffffff 15%, #7ed957 25%, #5ba83f 30%, #7ed957 35%, #ffffff 45%, #ffffff 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {isArabic ? 'تحويل العلامات التجارية' : 'Transforming Brands'}
          </motion.h2>
          
          <motion.p
            className="text-lg max-w-2xl mx-auto text-center"
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
              ? ' شاهد كيف نبنى ونحول  العلامات التجارية من القديم إلى الجديد بإبداع واحترافية'
              : 'See how we transform and build brands from old to new with creativity and professionalism'
            }
          </motion.p>
        </div>

        {/* iOS Style Carousel Picker for Projects */}
        <div className="w-full mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex touch-pan-y backface-hidden">
                {PROJECTS.map((project, index) => (
                  <div
                    key={project.id}
                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] px-2 cursor-pointer"
                    onPointerDown={(e) => {
                      setPointerDownPos({ x: e.clientX, y: e.clientY })
                      setIsDragging(false)
                    }}
                    onPointerUp={(e) => {
                      const dx = Math.abs(e.clientX - pointerDownPos.x)
                      const dy = Math.abs(e.clientY - pointerDownPos.y)
                      const distance = Math.sqrt(dx * dx + dy * dy)
                      
                      // If pointer moved less than 10px, consider it a click
                      if (distance < 10 && !isDragging) {
                        e.stopPropagation()
                        handleProjectClick(index)
                      }
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: selectedProjectIndex === index ? 1 : 0.85,
                        opacity: selectedProjectIndex === index ? 1 : 0.4,
                      }}
                      whileHover={{
                        scale: selectedProjectIndex === index ? 1 : 0.9,
                        opacity: selectedProjectIndex === index ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      {/* Gradient Border - Only for selected */}
                      {selectedProjectIndex === index && (
                        <motion.div
                          className="absolute -inset-0.5 bg-gradient-to-r from-[#7ed957] via-[#5ba83f] to-[#7ed957] rounded-2xl blur opacity-40"
                          animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          style={{ backgroundSize: '200% 200%' }}
                        />
                      )}
                      
                      <div
                        className={`relative p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                          selectedProjectIndex === index
                            ? 'bg-gradient-to-br from-[#7ed957]/20 to-[#5ba83f]/10 border-[#7ed957]/30 shadow-lg shadow-[#7ed957]/20'
                            : 'bg-black/40 border-white/10'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3 text-center">
                          {/* Project Number */}
                          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                            selectedProjectIndex === index
                              ? 'bg-[#7ed957] text-black'
                              : 'bg-white/10 text-white/60'
                          }`}>
                            <span className="font-bold text-lg">{index + 1}</span>
                          </div>
                          
                          {/* Project Name */}
                          <h3 className={`font-bold text-base sm:text-lg transition-colors duration-300 ${
                            selectedProjectIndex === index
                              ? 'text-[#7ed957]'
                              : 'text-white/60'
                          }`}>
                            {isArabic ? project.nameAr : project.name}
                          </h3>
                          
                          {/* Category Badge */}
                          <Badge 
                            variant="secondary"
                            className={`text-xs transition-all duration-300 ${
                              selectedProjectIndex === index
                                ? 'bg-[#7ed957]/20 text-[#7ed957] border-[#7ed957]/30'
                                : 'bg-white/5 text-white/40 border-white/10'
                            }`}
                          >
                            {isArabic ? project.categoryAr : project.category}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Swipe Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {PROJECTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedProjectIndex(index)
                    emblaApi?.scrollTo(index)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selectedProjectIndex === index
                      ? 'bg-[#7ed957] w-8'
                      : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Swipe Hint */}
            <p className="text-center text-white/40 text-sm mt-3">
              {isArabic ? 'اسحب لتصفح المشاريع' : 'Swipe to browse projects'}
            </p>
          </motion.div>
        </div>

          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-2 mb-8"
          >
            <button
              onClick={() => setViewMode('before')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === 'before'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
              }`}
            >
              {isArabic ? 'قبل' : 'Before'}
            </button>
            <button
              onClick={() => setViewMode('compare')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === 'compare'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
              }`}
            >
              {isArabic ? 'مقارنة' : 'Compare'}
            </button>
            <button
              onClick={() => setViewMode('after')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === 'after'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
              }`}
            >
              {isArabic ? 'بعد' : 'After'}
            </button>
          </motion.div>

          {/* Project Content - Display Selected Project */}
          <AnimatePresence mode="wait">
            {(() => {
              const currentProject = PROJECTS[selectedProjectIndex]
              return (
                <motion.div
                  key={selectedProjectIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Images */}
            <div className="relative">
              {viewMode === 'before' && (
                <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 text-center">
                <span className="text-red-400 font-semibold">{isArabic ? 'قبل إعادة التصميم' : 'Before Rebranding'}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {currentProject.beforeImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => openLightbox(currentProject.beforeImages, idx)}
                        className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-red-500/50 transition-all duration-300 group cursor-pointer"
                      >
                        <Image
                          src={img}
                          alt={`Before ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {viewMode === 'after' && (
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 text-center">
                    <span className="text-green-400 font-semibold">{isArabic ? 'بعد إعادة التصميم' : 'After Rebranding'}</span>
                  </div>
                  
                  {/* Video Preview - إذا كان موجود */}
                  {currentProject.video && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative aspect-video rounded-xl overflow-hidden bg-black border-2 border-[#7ed957]/30 shadow-xl shadow-[#7ed957]/20"
                    >
                      {/* Badge للفيديو */}
                      <div className="absolute top-4 left-4 z-10 bg-[#7ed957] text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        <span>{isArabic ? 'فيديو العرض' : 'Showcase Video'}</span>
                      </div>
                      
                      <video
                        autoPlay
                        loop
                        muted={isVideoMuted}
                        playsInline
                        className="w-full h-full object-cover"
                        key={currentProject.video}
                      >
                        <source src={currentProject.video} type="video/mp4" />
                        {isArabic ? 'متصفحك لا يدعم تشغيل الفيديو.' : 'Your browser does not support the video tag.'}
                      </video>
                      
                      {/* زر التحكم في الصوت */}
                      <button
                        onClick={() => setIsVideoMuted(!isVideoMuted)}
                        className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20"
                        aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
                      >
                        {isVideoMuted ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                        )}
                      </button>
                      
                      {/* Overlay gradient للأناقة */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                  )}
                  
              {/* الصور */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {currentProject.afterImages.map((img, idx) => (
                      <motion.button
                        key={idx} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => openLightbox(currentProject.afterImages, idx)}
                        className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#7ed957]/50 transition-all duration-300 group cursor-pointer"
                      >
                        <Image
                          src={img}
                          alt={`After ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Image Gallery Preview - Clickable */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6"
                  >
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#7ed957]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {isArabic ? 'معرض الصور' : 'Image Gallery'}
                    </h4>
                    
                    {/* Before Images Grid */}
                    <div className="mb-4">
                      <p className="text-sm text-white/60 mb-2">{isArabic ? 'قبل إعادة التصميم' : 'Before Rebranding'}</p>
                      <div className="grid grid-cols-4 gap-2">
                        {currentProject.beforeImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => openLightbox(currentProject.beforeImages, idx)}
                            className="relative aspect-square rounded-lg overflow-hidden bg-white/5 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 group cursor-pointer"
                          >
                            <Image
                              src={img}
                              alt={`Before ${idx + 1}`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                              <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* After Images Grid */}
                    <div>
                      <p className="text-sm text-white/60 mb-2">{isArabic ? 'بعد إعادة التصميم' : 'After Rebranding'}</p>
                      <div className="grid grid-cols-4 gap-2">
                        {currentProject.afterImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => openLightbox(currentProject.afterImages, idx)}
                            className="relative aspect-square rounded-lg overflow-hidden bg-white/5 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 group cursor-pointer"
                          >
                            <Image
                              src={img}
                              alt={`After ${idx + 1}`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                              <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {viewMode === 'compare' && (
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 text-center">
                    <span className="text-blue-400 font-semibold">{isArabic ? 'قبل وبعد' : 'Before & After'}</span>
                  </div>
                  
                  {/* Compare Slider - Improved for full image display */}
                  <div className="relative w-full rounded-xl overflow-hidden bg-black border border-white/10">
                    {/* Container that maintains aspect ratio based on actual image */}
                    <div className="relative w-full" style={{ paddingBottom: '125%' }}>
                      {/* Before Image */}
                      <div className="absolute inset-0">
                        <img
                          src={currentProject.compare?.before ?? currentProject.beforeImages[0]}
                          alt="Before"
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                          {isArabic ? 'قبل' : 'Before'}
                        </div>
                      </div>

                      {/* After Image with Clip */}
                      <div
                        className="absolute inset-0"
                        style={{ clipPath: isArabic ? `inset(0 0 0 ${compareSlider}%)` : `inset(0 ${100 - compareSlider}% 0 0)` }}
                      >
                        <img
                          src={currentProject.compare?.after ?? currentProject.afterImages[0]}
                          alt="After"
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                          {isArabic ? 'بعد' : 'After'}
                        </div>
                      </div>

                      {/* Slider Handle */}
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-20"
                        style={{ [isArabic ? 'right' : 'left']: `${compareSlider}%` }}
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#7ed957]">
                          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                          </svg>
                        </div>
                      </div>

                      {/* Slider Input */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={compareSlider}
                        onChange={(e) => setCompareSlider(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                      />
                    </div>
                  </div>
                  
                  {/* Instructions */}
                  <div className="text-center text-white/60 text-sm mt-2">
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    {isArabic ? 'اسحب الخط للمقارنة' : 'Drag the line to compare'}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Project Info */}
            <div className={`space-y-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {/* Header with animated underline */}
              <div className="relative">
                {/* Project Logo (optional) */}
                  {currentProject.logo && (
                    <div className={`mb-4 ${isArabic ? 'ml-auto' : 'mr-auto'}`}>
                      <Image
                        src={currentProject.logo}
                        alt={`${isArabic ? currentProject.nameAr : currentProject.name} Logo`}
                        width={96}
                        height={96}
                        className="object-contain rounded-md border border-white/10 bg-white/5 p-2"
                      />
                    </div>
                  )}
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold text-white mb-3 inline-block"
                  initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {isArabic ? currentProject.nameAr : currentProject.name}
                </motion.h3>
                {/* Animated underline */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-[#7ed957] to-[#5ba83f] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                
                {/* Badges - RTL aware positioning */}
                <div className={`flex gap-2 mt-4 flex-wrap ${isArabic ? 'justify-end' : 'justify-start'}`}>
                  <Badge variant="secondary">
                    {isArabic ? currentProject.categoryAr : currentProject.category}
                  </Badge>
                  {currentProject.video && (
                    <Badge className="bg-[#7ed957]/20 text-[#7ed957] border border-[#7ed957]/30 hover:bg-[#7ed957]/30">
                      <svg className={`w-3 h-3 ${isArabic ? 'ml-1' : 'mr-1'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      {isArabic ? 'يحتوي على فيديو' : 'Video Included'}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Description with quote style */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className={`absolute top-0 ${isArabic ? 'right-0' : 'left-0'} text-6xl text-[#7ed957]/20 font-serif leading-none`}>
                  {isArabic ? '«' : '"'}
                </div>
                <p className={`text-white/80 text-lg leading-relaxed ${isArabic ? 'pr-8' : 'pl-8'} pt-4`}>
                  {isArabic ? currentProject.descriptionAr : currentProject.description}
                </p>
              </motion.div>

              {/* Country */}
              <div className="flex items-center gap-3 text-white/70">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#7ed957]/20 text-[#7ed957]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <div className="text-sm text-white/50">{isArabic ? 'الدولة' : 'Country'}</div>
                  <div className="font-semibold">{isArabic ? currentProject.countryAr : currentProject.country}</div>
                </div>
              </div>

              {/* Social Links */}
              {currentProject.socialLinks && (
                <div>
                  <h4 className="text-white font-semibold mb-3">
                    {isArabic ? 'حسابات التواصل الاجتماعي' : 'Social Media'}
                  </h4>
                  <div className={`flex gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                    {currentProject.socialLinks.instagram && (
                      <Link
                        href={currentProject.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                      >
                        <Icons.instagram className="w-5 h-5" />
                      </Link>
                    )}
                    {currentProject.socialLinks.facebook && (
                      <Link
                        href={currentProject.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                      >
                        <Icons.facebook className="w-5 h-5" />
                      </Link>
                    )}
                    {currentProject.socialLinks.website && (
                      <Link
                        href={currentProject.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                      >
                        <Icons.globe className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Stats or Features - Enhanced Design */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#7ed957]/20">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative overflow-hidden rounded-xl p-5 bg-gradient-to-br from-[#7ed957]/10 via-[#7ed957]/5 to-transparent border border-[#7ed957]/20 hover:border-[#7ed957]/40 transition-all duration-300 group"
                >
                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7ed957]/0 via-[#7ed957]/10 to-[#7ed957]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-[#7ed957] mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                    <div className="text-sm text-white/70 font-medium">{isArabic ? 'تحسين الهوية البصرية' : 'Brand Identity Boost'}</div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative overflow-hidden rounded-xl p-5 bg-gradient-to-br from-[#7ed957]/10 via-[#7ed957]/5 to-transparent border border-[#7ed957]/20 hover:border-[#7ed957]/40 transition-all duration-300 group"
                >
                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7ed957]/0 via-[#7ed957]/10 to-[#7ed957]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-[#7ed957] mb-2 group-hover:scale-110 transition-transform duration-300">2-4</div>
                    <div className="text-sm text-white/70 font-medium">{isArabic ? 'أسابيع التنفيذ' : 'Weeks Delivery'}</div>
                  </div>
                </motion.div>
              </div>

              {/* PDF Presentation Section - Innovative Design */}
              {currentProject.pdf && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 pt-6 border-t border-[#7ed957]/20"
                >
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#7ed957]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {isArabic ? 'العرض التقديمي الكامل' : 'Full Brand Presentation'}
                  </h4>
                  
                  <a
                    href={currentProject.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={false}
                    className="group relative block overflow-hidden rounded-xl bg-gradient-to-br from-[#7ed957]/20 via-[#5ba83f]/10 to-transparent border border-[#7ed957]/30 hover:border-[#7ed957]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#7ed957]/20"
                  >
                    <div className="relative p-6">
                      {/* Animated background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#7ed957]/0 via-[#7ed957]/10 to-[#7ed957]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* PDF Icon */}
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#7ed957]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 text-[#7ed957]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                              <path d="M14 2v6h6M10 13h4M10 17h4M10 9h1" fill="black" />
                            </svg>
                          </div>
                          
                          {/* Text */}
                          <div>
                            <p className="text-white font-semibold text-lg group-hover:text-[#7ed957] transition-colors duration-300">
                              {isArabic ? 'تحميل العرض التقديمي' : 'Download Presentation'}
                            </p>
                            <p className="text-white/60 text-sm">
                              {isArabic ? 'ملف PDF - دليل الهوية البصرية الكامل' : 'PDF File - Complete Brand Identity Guide'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Arrow Icon */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#7ed957]/20 flex items-center justify-center group-hover:bg-[#7ed957] transition-all duration-300">
                          <svg className="w-5 h-5 text-[#7ed957] group-hover:text-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#7ed957]/5 rounded-full blur-3xl group-hover:bg-[#7ed957]/10 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5ba83f]/5 rounded-full blur-2xl group-hover:bg-[#5ba83f]/10 transition-all duration-500" />
                    </div>
                  </a>
                  
                  {/* Additional Info */}
                  <p className="text-white/40 text-xs mt-2 text-center">
                    {isArabic ? 'انقر لتحميل أو عرض الملف في نافذة جديدة' : 'Click to download or view in a new window'}
                  </p>
                </motion.div>
              )}

            </div>
                  </div>

          {/* Beautiful Client Testimonial Quote - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative mt-12 w-full overflow-hidden rounded-2xl isolate"
          >
            {/* Animated Background - Similar to main site */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-black via-black to-black">
              {/* Animated orbs - Enhanced visibility */}
              <div className="absolute -top-20 left-1/4 w-96 h-96 bg-[#7ed957]/10 rounded-full blur-3xl animate-pulse" />
              <div 
                className="absolute -bottom-20 right-1/4 w-96 h-96 bg-[#5ba83f]/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#7ed957]/8 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "2s" }}
              />
              {/* Additional orbs for more 3D effect */}
              <div 
                className="absolute top-1/4 right-1/3 w-64 h-64 bg-[#7ed957]/5 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <div 
                className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-[#5ba83f]/8 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1.5s" }}
              />
              {/* Overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            </div>

            {/* Content wrapper with padding */}
            <div className="relative z-10 p-8 md:p-12">
              {/* Decorative gradient line above */}
              <motion.div 
                className="w-full h-px bg-gradient-to-r from-transparent via-[#7ed957]/30 to-transparent mb-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              />

            <div className={`relative ${isArabic ? 'text-right' : 'text-left'}`}>
              {/* Large decorative quote mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6, type: "spring" }}
                className={`absolute ${isArabic ? 'right-0' : 'left-0'} -top-4 text-[#7ed957]/20 text-8xl leading-none select-none`}
                style={{ 
                  fontFamily: isArabic ? "'Ather', 'Marhey', cursive" : "'Dancing Script', cursive",
                }}
              >
                {isArabic ? '«' : '"'}
              </motion.div>

              {/* Quote text with typing animation */}
              <div className={`relative ${isArabic ? 'pr-16' : 'pl-16'} pt-8`}>
                <motion.p
                  className="text-[#7ed957] text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed mb-6"
                  style={{
                    fontFamily: isArabic ? "'Ather', 'Marhey', cursive" : "'Dancing Script', cursive",
                    fontWeight: isArabic ? 'normal' : '700',
                  }}
                >
                  {isArabic ? (
                    <>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.08 }}>ش</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.28, duration: 0.08 }}>ك</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.36, duration: 0.08 }}>ر</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.44, duration: 0.08 }}>ا</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.52, duration: 0.08 }}> </motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.08 }}>ل</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.68, duration: 0.08 }}>ف</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.76, duration: 0.08 }}>ر</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.84, duration: 0.08 }}>ي</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.92, duration: 0.08 }}>ق</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0, duration: 0.08 }}> </motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.08, duration: 0.08 }}>أ</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.16, duration: 0.08 }}>ث</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.24, duration: 0.08 }}>ر</motion.span>
                    </>
                  ) : (
                    <>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.06 }}>T</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.26, duration: 0.06 }}>h</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.32, duration: 0.06 }}>a</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.38, duration: 0.06 }}>n</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.44, duration: 0.06 }}>k</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.06 }}> </motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.56, duration: 0.06 }}>y</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.62, duration: 0.06 }}>o</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.68, duration: 0.06 }}>u</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.74, duration: 0.06 }}>,</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.06 }}> </motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.86, duration: 0.06 }}>A</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.92, duration: 0.06 }}>t</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.98, duration: 0.06 }}>h</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.04, duration: 0.06 }}>a</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 0.06 }}>r</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.16, duration: 0.06 }}>!</motion.span>
                    </>
                  )}
                </motion.p>

                {/* Secondary text */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 0.6 }}
                  className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl font-semibold"
                  style={{
                    fontFamily: isArabic ? "'Ather', 'Marhey', cursive" : "'Dancing Script', cursive",
                    fontWeight: isArabic ? 'normal' : '600',
                  }}
                >
                  {isArabic 
                    ? 'التعاون معكم كان رائعاً والنتيجة فاقت التوقعات 💚'
                    : 'Working with you was amazing and the results exceeded expectations 💚'
                  }
                </motion.p>

                {/* Signature with elegant line */}
                <motion.div
                  initial={{ opacity: 0, x: isArabic ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3, duration: 0.8 }}
                  dir={isArabic ? 'rtl' : 'ltr'}
                  className="mt-8 flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-px bg-gradient-to-r from-[#7ed957]/60 to-transparent" />
                  <p 
                    className="text-[#7ed957]/80 text-xl font-semibold"
                    style={{
                      fontFamily: isArabic ? "'Ather', cursive" : "'Dancing Script', cursive",
                    }}
                  >
                    {isArabic ? 'المؤسس' : 'Founder'}
                  </p>
                </motion.div>
              </div>

              {/* Decorative element on the other side */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.2, duration: 0.6 }}
                className={`absolute ${isArabic ? 'left-0' : 'right-0'} bottom-0 w-3 h-3 rounded-full bg-[#7ed957]/40`}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full rounded-full bg-[#7ed957]/60"
                />
              </motion.div>
            </div>

            {/* Decorative gradient line below */}
            <motion.div 
              className="w-full h-px bg-gradient-to-r from-transparent via-[#7ed957]/30 to-transparent mt-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 3.4, duration: 1 }}
            />
          </div>
          </motion.div>
                </motion.div>
              )
            })()}
          </AnimatePresence>

        {/* Lightbox Modal for Full-Screen Image Viewing */}
        <AnimatePresence>
          {lightboxOpen && (
            <Portal>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999999] grid place-items-center bg-black/95 backdrop-blur-sm"
                onClick={() => setLightboxOpen(false)}
              >
              {/* (Removed overlay-level close to avoid duplication) */}

              {/* Image Counter */}
              <div className="absolute top-4 left-4 z-50 px-4 py-2 rounded-full bg-[#7ed957]/20 text-white border border-[#7ed957]/30">
                <span className="font-semibold">{currentImageIndex + 1}</span>
                <span className="text-white/60"> / </span>
                <span className="text-white/80">{lightboxImages.length}</span>
              </div>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-4 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 border border-white/20"
                aria-label="Previous"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Image Container */}
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-[95vw] max-h-[90vh] w-auto h-auto flex items-center justify-center px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightboxImages[currentImageIndex]}
                  alt={`Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg"
                  style={{ maxWidth: '100%', maxHeight: '90vh' }}
                />
                {/* Close Button inside image (top-right) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxOpen(false)
                  }}
                  className="absolute top-3 right-3 z-[10000] p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none"
                  aria-label="Close"
                >
                  <svg className="w-8 h-8 text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.7)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-4 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 border border-white/20"
                aria-label="Next"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Keyboard Navigation Hint */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 text-white/60 text-sm border border-white/20">
                {isArabic ? 'استخدم الأسهم أو اضغط ESC للخروج' : 'Use arrow keys or press ESC to close'}
              </div>
              </motion.div>
            </Portal>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}


