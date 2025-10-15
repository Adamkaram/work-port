"use client"

import { Accordion, AccordionItem } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { PlusIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

export function FAQSection({ faqs, title, subtitle, locale }: { faqs: FAQItem[]; title: string; subtitle: string; locale: string }) {
  const [open, setOpen] = useState<string | undefined>("question-0")

  return (
    <section className="w-full pt-10 pb-0 bg-black">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-6">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div
          className="relative bg-black/80 text-white p-6 sm:p-7 rounded-2xl border border-neutral-800 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Accordion 
            type="single" 
            collapsible 
            className="mt-1 space-y-3" 
            onValueChange={(v) => setOpen((v || undefined) as string | undefined)} 
            defaultValue="question-0"
          >
            {faqs.map((faq, index) => {
              const val = `question-${index}`
              const isOpen = open === val
              return (
                <AccordionItem 
                  key={val} 
                  value={val} 
                  className="bg-transparent py-1 px-2 rounded-xl border border-neutral-800/60"
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        "flex flex-1 items-center justify-between pt-4 pb-3 font-semibold tracking-tight transition-all hover:underline",
                        "text-start text-lg text-neutral-200 [&[data-state=open]>svg]:rotate-45 [&[data-state=open]>svg]:text-[#7ed957]"
                      )}
                    >
                      {faq.question}
                      <PlusIcon className="h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content 
                    asChild 
                    className="text-base text-[#7ed957] data-[state=open]:animate-none data-[state=closed]:animate-none"
                  >
                    <motion.div
                      initial={false}
                      animate={isOpen ? { height: "auto", opacity: 1, y: 0 } : { height: 0, opacity: 0, y: -4 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden", willChange: "height, opacity, transform" }}
                    >
                      <div className="px-1 pb-4 pt-0">{faq.answer}</div>
                    </motion.div>
                  </AccordionPrimitive.Content>
                </AccordionItem>
              )
            })}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
