"use client";

import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { AnimatedCTASection } from "@/components/animated-cta-section";
import { FAQSection } from "@/components/faq-section";
import { RebrandingGallery } from "@/components/rebranding-gallery";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const locale = useLocale();
  const tHero = useTranslations('hero');
  const tAbout = useTranslations('about');
  const tTech = useTranslations('technologies');
  const tProjects = useTranslations('projects');
  const tMore = useTranslations('moreProjects');
  const tContact = useTranslations('contact');
  return (
    <>
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-4xl space-y-12 py-8">
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Logo */}
            <BlurFade delay={BLUR_FADE_DELAY}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="relative"
              >
                {/* Animated Glow Effects */}
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
                  {/* Green glow (for the 3 leaves) */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#7ed957] rounded-full blur-3xl opacity-60" />
                  
                  {/* White/Gray glow (for the letter) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full blur-3xl opacity-30" />
                </motion.div>

                {/* Rotating Beam Animation */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {/* Beam 1 - Green */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-64 h-1 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, #7ed957 50%, transparent 100%)",
                      filter: "blur(8px)",
                    }}
                  />
                  
                  {/* Beam 2 - White */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-64 h-1 -translate-x-1/2 -translate-y-1/2 rotate-90"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                      filter: "blur(8px)",
                    }}
                  />
                </motion.div>

                <Image 
                  src={DATA.avatarUrl} 
                  alt={DATA.name} 
                  width={280} 
                  height={280}
                  className="object-contain drop-shadow-2xl relative z-10"
                  priority
                />
              </motion.div>
            </BlurFade>

            {/* Slogan with gradient animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center space-y-4"
            >
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: "linear-gradient(90deg, #ffffff 0%, #ffffff 15%, #7ed957 25%, #5ba83f 30%, #7ed957 35%, #ffffff 45%, #ffffff 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                dangerouslySetInnerHTML={{
                  __html: tHero('slogan')
                    .replace('__IMPACT__', tHero('sloganHighlight1'))
                    .replace('__CONTENT__', tHero('sloganHighlight2'))
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-2xl md:text-3xl font-bold">
            {tAbout('title')}
          </h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="space-y-4">
            <p className="prose max-w-full text-pretty font-sans text-base md:text-lg text-muted-foreground dark:prose-invert">
              {tAbout('description')}
            </p>
          </div>
        </BlurFade>
      </section>
      {/* <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section> */}
      {/* <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section> */}
      {/* <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">
              {tTech('title')}
            </h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section> */}
      <section id="projects-intro">
        <div className="space-y-8 w-full py-12 mt-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  {tProjects('badge')}
                </div>
                <motion.h2 
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: "linear-gradient(90deg, #ffffff 0%, #ffffff 15%, #7ed957 25%, #5ba83f 30%, #7ed957 35%, #ffffff 45%, #ffffff 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: tProjects('title').replace('__WORK__', tProjects('titleHighlight'))
                  }}
                />
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {tProjects('description')}
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Category Sections with Projects */}
      {DATA.categories.map((category, categoryIndex) => {
        const categoryProjects = DATA.projects.filter(
          (project) => project.category === category.id
        );
        
        return (
          <section key={category.id} id={`projects-${category.id}`} className="w-full py-8">
            <div className="space-y-8">
              {/* Category Header */}
              <BlurFade delay={BLUR_FADE_DELAY * (12 + categoryIndex * 3)}>
                <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto">
                  <motion.h2 
                    className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl pb-4 relative w-full"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      background: "linear-gradient(90deg, #ffffff 0%, #ffffff 15%, #7ed957 25%, #5ba83f 30%, #7ed957 35%, #ffffff 45%, #ffffff 100%)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {tProjects(`categories.${category.id}.title`)}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: true }}
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, #7ed957 20%, #5ba83f 50%, #7ed957 80%, transparent 100%)",
                        transformOrigin: "left"
                      }}
                    />
                  </motion.h2>
                  <p className="text-muted-foreground text-base md:text-xl max-w-3xl">
                    {tProjects(`categories.${category.id}.description`)}
                  </p>
                </div>
              </BlurFade>

              {/* Category Projects */}
              {categoryProjects.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
                  {categoryProjects.map((project, projectIndex) => (
              <BlurFade
                key={project.title}
                      delay={BLUR_FADE_DELAY * (13 + categoryIndex * 3 + projectIndex * 0.05)}
                    >
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                  beamReverse={projectIndex % 2 === 1}
                />
              </BlurFade>
            ))}
          </div>
              ) : (
                <BlurFade delay={BLUR_FADE_DELAY * (13 + categoryIndex * 3)}>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground italic">
                      {tProjects('comingSoon')}
                    </p>
                  </div>
                </BlurFade>
              )}
        </div>
      </section>
        );
      })}
      
      {/* Rebranding Gallery Section */}
      <RebrandingGallery locale={locale} />

      <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  {tMore('badge')}
                </div>
                <motion.h2 
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: "linear-gradient(90deg, #ffffff 0%, #ffffff 15%, #7ed957 25%, #5ba83f 30%, #7ed957 35%, #ffffff 45%, #ffffff 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: tMore('title').replace('__EXPERIENCES__', tMore('titleHighlight'))
                  }}
                />
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {tMore('description')}
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}>
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
    </main>
    
    {/* FAQ Section - Full Width Outside Main */}
    <FAQSection 
      locale={locale}
      faqs={[
        { 
          question: locale === 'ar' ? 'ما هي خدمات التسويق الإلكتروني التي تقدمونها؟' : 'What digital marketing services do you offer?', 
          answer: locale === 'ar' ? 'نقدم إدارة حسابات وسائل التواصل الاجتماعي، الإعلانات الممولة (Social Ads + Google Ads)، واستشارات وخطط نمو استراتيجية.' : 'We offer social media account management, paid advertising (Social Ads + Google Ads), and strategic consulting & growth plans.' 
        },
        { 
          question: locale === 'ar' ? 'ما هي خدمات البرمجة والحلول التقنية؟' : 'What IT and development services do you provide?', 
          answer: locale === 'ar' ? 'نقوم بتصميم وتطوير المواقع والتطبيقات، أنظمة Odoo ERP، وحلول برمجية مخصصة لتناسب احتياجات عملك.' : 'We design and develop websites and apps, Odoo ERP systems, and custom software solutions tailored to your business needs.' 
        },
        { 
          question: locale === 'ar' ? 'ما هي التقنيات التي تستخدمونها؟' : 'What technologies do you use?', 
          answer: locale === 'ar' ? 'نستخدم أحدث التقنيات مثل React, Next.js, TypeScript, Vue, Node.js, PostgreSQL, TailwindCSS، وأنظمة Odoo ERP المتقدمة.' : 'We use cutting-edge technologies like React, Next.js, TypeScript, Vue, Node.js, PostgreSQL, TailwindCSS, and advanced Odoo ERP systems.' 
        },
        { 
          question: locale === 'ar' ? 'هل تقدمون تدريب على أنظمة Odoo؟' : 'Do you provide Odoo system training?', 
          answer: locale === 'ar' ? 'نعم، نقوم بالتركيب والتخصيص والتدريب الكامل على أنظمة Odoo لضمان سهولة الاستخدام والتحكم الكامل.' : 'Yes, we provide complete setup, customization, and training for Odoo systems to ensure ease of use and full control.' 
        },
        { 
          question: locale === 'ar' ? 'ما هي مدة تنفيذ المشروع؟' : 'How long does it take to complete a project?', 
          answer: locale === 'ar' ? 'المدة تعتمد على حجم المشروع، عادة من 2 إلى 6 أسابيع للمواقع، ومن 4 إلى 8 أسابيع لأنظمة Odoo.' : 'The timeline depends on project size, typically 2-6 weeks for websites, and 4-8 weeks for Odoo systems.' 
        },
        { 
          question: locale === 'ar' ? 'ما هي طرق التواصل معكم؟' : 'How can we contact you?', 
          answer: locale === 'ar' ? 'يمكنك التواصل معنا عبر واتساب (+965 94473236) أو إنستجرام أو البريد الإلكتروني Info@atharagency.com' : 'You can reach us via WhatsApp (+965 94473236), Instagram, or email Info@atharagency.com' 
        },
      ]}
      title={locale === 'ar' ? 'خدماتنا وتقنياتنا' : 'Our Services & Technologies'}
      subtitle={locale === 'ar' ? 'اكتشف خدماتنا في التسويق الإلكتروني والحلول التقنية المتقدمة.' : 'Discover our digital marketing and advanced IT solutions.'}
    />

    <AnimatedCTASection 
      locale={locale}
      badge={tContact('badge')}
      title={tContact('title')}
      titleHighlight={tContact('titleHighlight')}
    />
    </>
  );
}
