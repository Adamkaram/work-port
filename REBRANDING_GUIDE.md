# دليل إضافة مشاريع إعادة التصميم (Rebranding Projects)

## 📁 موقع الملف
الملف الرئيسي: `/src/components/rebranding-gallery.tsx`

## 🎯 كيفية إضافة مشروع جديد

### 1. قم بتحميل الصور إلى مجلد `/public/`
مثال:
- `/public/projects/project-name/before-1.jpg`
- `/public/projects/project-name/before-2.jpg`
- `/public/projects/project-name/after-1.jpg`
- `/public/projects/project-name/after-2.jpg`

### 2. أضف المشروع إلى قائمة PROJECTS في الملف

```typescript
const PROJECTS: ProjectData[] = [
  {
    id: "unique-project-id",                    // معرف فريد للمشروع
    name: "Brand Name",                         // اسم العلامة التجارية بالإنجليزية
    nameAr: "اسم العلامة التجارية",            // اسم العلامة التجارية بالعربية
    description: "Project description...",      // وصف المشروع بالإنجليزية
    descriptionAr: "وصف المشروع...",           // وصف المشروع بالعربية
    country: "Kuwait",                          // الدولة بالإنجليزية
    countryAr: "الكويت",                       // الدولة بالعربية
    category: "Beauty & Cosmetics",            // الفئة بالإنجليزية
    categoryAr: "التجميل ومستحضرات العناية",  // الفئة بالعربية
    beforeImages: [                            // صور قبل إعادة التصميم
      "/projects/project-name/before-1.jpg",
      "/projects/project-name/before-2.jpg"
    ],
    afterImages: [                             // صور بعد إعادة التصميم
      "/projects/project-name/after-1.jpg",
      "/projects/project-name/after-2.jpg"
    ],
    socialLinks: {                             // روابط التواصل الاجتماعي
      instagram: "https://instagram.com/brand",
      facebook: "https://facebook.com/brand",  // اختياري
      website: "https://brand.com"             // اختياري
    }
  },
  // أضف المزيد من المشاريع هنا...
]
```

## 🎨 المميزات

### ✅ 3 أوضاع عرض (View Modes):
1. **Before (قبل)**: عرض الصور القديمة فقط
2. **After (بعد)**: عرض الصور الجديدة فقط
3. **Compare (مقارنة)**: مقارنة تفاعلية مع slider للتبديل بين قبل وبعد

### ✅ معلومات كل مشروع:
- اسم المشروع (عربي/إنجليزي)
- وصف تفصيلي
- الفئة
- الدولة
- روابط التواصل الاجتماعي
- إحصائيات

### ✅ Responsive Design:
- يعمل بشكل مثالي على جميع الأجهزة
- دعم كامل للغة العربية (RTL)
- تأثيرات حركية سلسة

## 📸 مواصفات الصور الموصى بها:

- **الحجم الموصى به**: 1200x1200 بكسل للصور المربعة
- **التنسيق**: JPG أو PNG أو WebP
- **الجودة**: عالية (لا تقل عن 80%)
- **أسماء الملفات**: استخدم أسماء واضحة مثل:
  - `before-logo.jpg`
  - `before-social.jpg`
  - `after-logo.jpg`
  - `after-social.jpg`

## 🔗 الروابط المدعومة:

```typescript
socialLinks: {
  instagram: "https://instagram.com/username",  // رابط الانستجرام
  facebook: "https://facebook.com/page",        // رابط الفيسبوك (اختياري)
  website: "https://example.com"                // رابط الموقع (اختياري)
}
```

## 💡 نصائح:

1. **للمقارنة الأفضل**: تأكد من أن الصور في `beforeImages[0]` و `afterImages[0]` متطابقة في الزاوية والحجم
2. **عدد الصور**: يمكنك إضافة ما يصل إلى 4 صور لكل من قبل وبعد
3. **الترتيب**: المشروع الأول في القائمة سيكون هو المعروض افتراضياً

## 🎬 مثال كامل:

```typescript
{
  id: "beauty-brand-2024",
  name: "Glow Beauty Clinic",
  nameAr: "عيادة جلو للتجميل",
  description: "Complete visual identity redesign including logo, packaging, and digital presence. Transformed from outdated look to modern, luxurious brand.",
  descriptionAr: "إعادة تصميم كاملة للهوية البصرية تشمل الشعار والتغليف والحضور الرقمي. تحويل من مظهر قديم إلى علامة تجارية عصرية وفاخرة.",
  country: "Kuwait",
  countryAr: "الكويت",
  category: "Beauty & Cosmetics",
  categoryAr: "التجميل ومستحضرات العناية",
  beforeImages: [
    "/projects/glow-beauty/before-logo.jpg",
    "/projects/glow-beauty/before-packaging.jpg",
    "/projects/glow-beauty/before-social.jpg",
    "/projects/glow-beauty/before-business-card.jpg"
  ],
  afterImages: [
    "/projects/glow-beauty/after-logo.jpg",
    "/projects/glow-beauty/after-packaging.jpg",
    "/projects/glow-beauty/after-social.jpg",
    "/projects/glow-beauty/after-business-card.jpg"
  ],
  socialLinks: {
    instagram: "https://instagram.com/glowbeauty",
    website: "https://glowbeauty.com"
  }
}
```

---

## 🚀 بعد إضافة المشروع:

1. تأكد من حفظ الملف
2. المشروع سيظهر تلقائياً في الـ Gallery
3. يمكن للمستخدمين التبديل بين المشاريع باستخدام الـ Tabs
4. يمكنهم المقارنة بين قبل وبعد بشكل تفاعلي

---

تم إنشاء هذا المكون بواسطة Athar Agency 🎨



