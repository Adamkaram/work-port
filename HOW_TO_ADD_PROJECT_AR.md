# كيفية إضافة مشروع rebranding جديد - شرح مبسط

## 📍 الملف المطلوب تعديله:
`src/components/rebranding-gallery.tsx`

---

## خطوة 1️⃣: حمّل الصور

ضع صور المشروع في مجلد `/public/projects/`

**مثال:**
```
public/
  └── projects/
      └── my-brand/
          ├── before-1.jpg
          ├── before-2.jpg
          ├── after-1.jpg
          └── after-2.jpg
```

---

## خطوة 2️⃣: افتح الملف وابحث عن `const PROJECTS`

في السطر حوالي **30-40** هتلاقي:

```typescript
const PROJECTS: ProjectData[] = [
  {
    id: "project1",
    name: "Sample Brand",
    // ... إلخ
  },
  // أضف مشروعك الجديد هنا 👇
]
```

---

## خطوة 3️⃣: انسخ الكود ده وغيّر البيانات:

```typescript
{
  id: "brand-name-2024",                          // معرف فريد (بالإنجليزي بدون مسافات)
  
  name: "Brand Name",                             // اسم البراند بالإنجليزي
  nameAr: "اسم البراند",                         // اسم البراند بالعربي
  
  description: "Complete rebranding for...",      // وصف المشروع بالإنجليزي
  descriptionAr: "إعادة تصميم كاملة لـ...",      // وصف المشروع بالعربي
  
  country: "Kuwait",                              // الدولة بالإنجليزي
  countryAr: "الكويت",                           // الدولة بالعربي
  
  category: "Beauty & Cosmetics",                 // الفئة بالإنجليزي
  categoryAr: "التجميل ومستحضرات العناية",       // الفئة بالعربي
  
  beforeImages: [                                 // صور قبل التعديل
    "/projects/my-brand/before-1.jpg",
    "/projects/my-brand/before-2.jpg"
  ],
  
  afterImages: [                                  // صور بعد التعديل
    "/projects/my-brand/after-1.jpg",
    "/projects/my-brand/after-2.jpg"
  ],
  
  socialLinks: {                                  // حسابات السوشيال ميديا
    instagram: "https://instagram.com/brand",
    facebook: "https://facebook.com/brand",       // اختياري
    website: "https://brand.com"                  // اختياري
  }
},
```

---

## 🎯 مثال عملي كامل:

لنفترض عندك براند اسمه "Rosa Beauty" وعايز تضيفه:

### 1. حمّل الصور:
```
public/projects/rosa-beauty/before-logo.jpg
public/projects/rosa-beauty/before-packaging.jpg
public/projects/rosa-beauty/after-logo.jpg
public/projects/rosa-beauty/after-packaging.jpg
```

### 2. أضف الكود:
```typescript
const PROJECTS: ProjectData[] = [
  // المشاريع الموجودة...
  
  {
    id: "rosa-beauty-2024",
    name: "Rosa Beauty",
    nameAr: "روزا بيوتي",
    description: "Complete brand transformation for a luxury beauty salon including logo redesign, packaging, and digital presence.",
    descriptionAr: "تحويل كامل للعلامة التجارية لصالون تجميل فاخر يشمل إعادة تصميم الشعار والتغليف والحضور الرقمي.",
    country: "Kuwait",
    countryAr: "الكويت",
    category: "Beauty & Cosmetics",
    categoryAr: "التجميل ومستحضرات العناية",
    beforeImages: [
      "/projects/rosa-beauty/before-logo.jpg",
      "/projects/rosa-beauty/before-packaging.jpg"
    ],
    afterImages: [
      "/projects/rosa-beauty/after-logo.jpg",
      "/projects/rosa-beauty/after-packaging.jpg"
    ],
    socialLinks: {
      instagram: "https://instagram.com/rosabeauty",
      website: "https://rosabeauty.com"
    }
  }
]
```

---

## ✅ بعد ما تضيف المشروع:

1. احفظ الملف (Ctrl + S أو Cmd + S)
2. المشروع هيظهر تلقائياً في الموقع
3. الزوار يقدروا يشوفوا قبل وبعد
4. يقدروا يستخدموا الـ Slider للمقارنة

---

## 💡 نصائح مهمة:

✅ **الصور المناسبة:**
- الحجم: 1200x1200 بكسل (مربع) أو 1920x1080 (مستطيل)
- النوع: JPG أو PNG
- اسم واضح: `before-logo.jpg` مش `IMG_1234.jpg`

✅ **للمقارنة الأفضل:**
- الصورة الأولى في `beforeImages` والصورة الأولى في `afterImages` لازم يكونوا لنفس الحاجة
- مثال: لو أول صورة في before هي "اللوجو"، أول صورة في after تكون "اللوجو الجديد"

✅ **السوشيال ميديا:**
- لو ما عندكش كل الحسابات، احذف اللي مش موجود:
```typescript
socialLinks: {
  instagram: "https://instagram.com/brand"
  // مش مضطر تحط facebook أو website
}
```

---

## 🚨 أخطاء شائعة:

❌ **نسيان الفاصلة (,) بين المشاريع**
```typescript
} // ❌ ناقص فاصلة
{
```

✅ **الصح:**
```typescript
}, // ✅ فيه فاصلة
{
```

❌ **نسيان إغلاق القوس**
```typescript
const PROJECTS: ProjectData[] = [
  {
    // ...
  }
  // ❌ ناقص ]
```

✅ **الصح:**
```typescript
const PROJECTS: ProjectData[] = [
  {
    // ...
  }
] // ✅ فيه ]
```

---

## 🎬 لو حابب تشوف النتيجة:

1. شغّل السيرفر: `pnpm dev`
2. افتح: `http://localhost:3000`
3. انزل للـ Gallery
4. هتلاقي مشروعك ظاهر في الـ Tabs

---

**أي سؤال؟ تواصل معنا! 💚**

Athar Agency - We create impact, not just content



