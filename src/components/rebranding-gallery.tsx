"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

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
  video?: string  // فيديو اختياري للمشروع
  socialLinks: SocialLinks
}

interface RebrandingGalleryProps {
  locale: string
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
      "/gallery/diamond/dia-1.jpg",
      "/gallery/diamond/dia-2.jpg",
      "/gallery/diamond/dia-1.jpg",
      "/gallery/diamond/dia-2.jpg"
    ],
    afterImages: [
      "/gallery/diamond/dia-3.jpg",
      "/gallery/diamond/dia-4.jpg",
      "/gallery/diamond/dia-5.jpg",
      "/gallery/diamond/dia-3.jpg"
    ],
    video: "/gallery/diamond/dia-vid.mp4",
    socialLinks: {
      instagram: "https://instagram.com/atharagency_",
      website: "https://athar.com"
    }
  },
  {
    id: "skincare-beauty",
    name: "Glow Skincare Clinic",
    nameAr: "عيادة جلو للعناية بالبشرة",
    description: "Premium skincare and beauty clinic offering advanced treatments and exclusive beauty products. Complete rebranding with elegant visual identity and professional product photography.",
    descriptionAr: "عيادة فاخرة للعناية بالبشرة تقدم علاجات متقدمة ومنتجات تجميل حصرية. إعادة تصميم كاملة مع هوية بصرية أنيقة وتصوير احترافي للمنتجات.",
    country: "Kuwait",
    countryAr: "الكويت",
    category: "Beauty & Skincare",
    categoryAr: "التجميل والعناية بالبشرة",
    beforeImages: [
      "/gallery/diamond/dia-1.jpg",
      "/gallery/diamond/dia-2.jpg",
      "/gallery/diamond/dia-1.jpg",
      "/gallery/diamond/dia-2.jpg"
    ],
    afterImages: [
      "/gallery/diamond/dia-3.jpg",
      "/gallery/diamond/dia-4.jpg",
      "/gallery/diamond/dia-5.jpg",
      "/gallery/diamond/dia-3.jpg"
    ],
    video: "/gallery/diamond/dia-vid.mp4",
    socialLinks: {
      instagram: "https://instagram.com/atharagency_",
      facebook: "https://facebook.com/atharagency",
      website: "https://athar.com"
    }
  }
]

export function RebrandingGallery({ locale }: RebrandingGalleryProps) {
  const [viewMode, setViewMode] = useState<'after' | 'before' | 'compare'>('after')
  const [compareSlider, setCompareSlider] = useState(50)
  const [isVideoMuted, setIsVideoMuted] = useState(true)

  const isArabic = locale === 'ar'
  
  if (PROJECTS.length === 0) return null

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block rounded-lg bg-[#7ed957] text-black px-4 py-2 text-sm font-semibold mb-4"
          >
            {isArabic ? 'معرض أعمال إعادة التصميم' : 'Rebranding Showcase'}
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            {isArabic 
              ? 'شاهد كيف نحول العلامات التجارية من القديم إلى الجديد بإبداع واحترافية'
              : 'See how we transform brands from old to new with creativity and professionalism'
            }
          </motion.p>
        </div>

        {/* Shadcn Tabs for Projects - Enhanced with RTL Support */}
        <Tabs defaultValue={PROJECTS[0]?.id} className="w-full" dir={isArabic ? 'rtl' : 'ltr'}>
          {/* Projects TabsList with Gradient Border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              {/* Animated gradient border */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#7ed957] via-[#5ba83f] to-[#7ed957] rounded-2xl blur opacity-30"
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
              <TabsList className="relative bg-black/80 backdrop-blur-xl border border-white/10 p-1.5 rounded-xl">
                {PROJECTS.map((project, idx) => (
                      <TabsTrigger
                        key={project.id}
                        value={project.id}
                        className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7ed957] data-[state=active]:to-[#6bc847] data-[state=active]:text-black px-6 py-2.5 font-semibold transition-all data-[state=active]:shadow-lg data-[state=active]:shadow-[#7ed957]/30 rounded-lg group"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {/* Project number badge */}
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-xs group-data-[state=active]:bg-black/20 transition-colors">
                            {idx + 1}
                          </span>
                          {isArabic ? project.nameAr : project.name}
                          {/* Active indicator - elegant dot */}
                          <span className="w-1.5 h-1.5 rounded-full bg-transparent group-data-[state=active]:bg-black/60 transition-all duration-300" />
                        </span>
                      </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </motion.div>

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

          {/* Project Content in TabsContent */}
          {PROJECTS.map((currentProject) => (
            <TabsContent key={currentProject.id} value={currentProject.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-8 items-start"
              >
            {/* Left Side - Images */}
            <div className="relative">
              {viewMode === 'before' && (
                <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 text-center">
                <span className="text-red-400 font-semibold">{isArabic ? 'قبل إعادة التصميم' : 'Before Rebranding'}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {currentProject.beforeImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10">
                        <Image
                          src={img}
                          alt={`Before ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
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
                        src={currentProject.video}
                        autoPlay
                        loop
                        muted={isVideoMuted}
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      
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
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#7ed957]/50 transition-all duration-300 group"
                      >
                        <Image
                          src={img}
                          alt={`After ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {viewMode === 'compare' && (
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 text-center">
                    <span className="text-blue-400 font-semibold">{isArabic ? 'قبل وبعد' : 'Before & After'}</span>
                  </div>
                  
                  {/* Compare Slider */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                    {/* Before Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={currentProject.beforeImages[0]}
                        alt="Before"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {isArabic ? 'قبل' : 'Before'}
                      </div>
                    </div>

                    {/* After Image with Clip */}
                    <div
                      className="absolute inset-0"
                      style={{ clipPath: `inset(0 ${100 - compareSlider}% 0 0)` }}
                    >
                      <Image
                        src={currentProject.afterImages[0]}
                        alt="After"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {isArabic ? 'بعد' : 'After'}
                      </div>
                    </div>

                    {/* Slider Handle */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                      style={{ left: `${compareSlider}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Project Info */}
            <div className={`space-y-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {/* Header with animated underline */}
              <div className="relative">
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

            </div>
          </motion.div>

          {/* Beautiful Client Testimonial Quote - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative mt-12 w-full overflow-hidden rounded-2xl"
          >
            {/* Animated Background - Similar to main site */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-black">
                {/* Animated orbs */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#7ed957]/5 rounded-full blur-3xl animate-pulse" />
                <div 
                  className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#5ba83f]/5 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#7ed957]/5 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "2s" }}
                />
              </div>
              {/* Overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            </div>

            {/* Content wrapper with padding */}
            <div className="relative p-8 md:p-12">
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
                  fontFamily: isArabic ? "'Marhey', 'Reem Kufi', cursive" : "'Dancing Script', cursive",
                }}
              >
                {isArabic ? '«' : '"'}
              </motion.div>

              {/* Quote text with typing animation */}
              <div className={`relative ${isArabic ? 'pr-16' : 'pl-16'} pt-8`}>
                <motion.p
                  className="text-[#7ed957] text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed mb-6"
                  style={{
                    fontFamily: isArabic ? "'Marhey', 'Reem Kufi', cursive" : "'Dancing Script', cursive",
                    fontWeight: isArabic ? '600' : '700',
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
                    fontFamily: isArabic ? "'Marhey', 'Reem Kufi', cursive" : "'Dancing Script', cursive",
                    fontWeight: isArabic ? '600' : '600',
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
                  className={`mt-8 flex items-center gap-4 ${isArabic ? 'justify-end' : ''}`}
                >
                  {isArabic ? (
                    <>
                      <p 
                        className="text-[#7ed957]/80 text-xl font-semibold"
                        style={{
                          fontFamily: isArabic ? "'Marhey', cursive" : "'Dancing Script', cursive",
                        }}
                      >
                        {isArabic ? 'المؤسس' : 'Founder'}
                      </p>
                      <div className="flex-shrink-0 w-12 h-px bg-gradient-to-l from-[#7ed957]/60 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0 w-12 h-px bg-gradient-to-r from-[#7ed957]/60 to-transparent" />
                      <p 
                        className="text-[#7ed957]/80 text-xl font-semibold"
                        style={{
                          fontFamily: isArabic ? "'Marhey', cursive" : "'Dancing Script', cursive",
                        }}
                      >
                        {isArabic ? 'المؤسس' : 'Founder'}
                      </p>
                    </>
                  )}
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}


