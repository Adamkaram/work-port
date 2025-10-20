# ✨ تحديث Gallery - إضافة مشروع العناية بالبشرة

## 🎉 المشروع الجديد:

### **عيادة جلو للعناية بالبشرة**
**Glow Skincare Clinic**

---

## 📊 معلومات المشروع:

| البيان | القيمة |
|--------|---------|
| **المعرّف** | `skincare-beauty` |
| **الاسم (EN)** | Glow Skincare Clinic |
| **الاسم (AR)** | عيادة جلو للعناية بالبشرة |
| **الفئة** | Beauty & Skincare / التجميل والعناية بالبشرة |
| **الدولة** | Kuwait / الكويت |

---

## 📝 الوصف:

### English:
> Premium skincare and beauty clinic offering advanced treatments and exclusive beauty products. Complete rebranding with elegant visual identity and professional product photography.

### عربي:
> عيادة فاخرة للعناية بالبشرة تقدم علاجات متقدمة ومنتجات تجميل حصرية. إعادة تصميم كاملة مع هوية بصرية أنيقة وتصوير احترافي للمنتجات.

---

## 🎬 المحتوى المستخدم:

### الصور (Before):
- `/gallery/diamond/dia-1.jpg`
- `/gallery/diamond/dia-2.jpg`

### الصور (After):
- `/gallery/diamond/dia-3.jpg`
- `/gallery/diamond/dia-4.jpg`
- `/gallery/diamond/dia-5.jpg`

### الفيديو:
- `/gallery/diamond/dia-vid.mp4`

> **ملاحظة:** تم استخدام نفس صور مشروع الماس كتجربة. يمكن استبدالها لاحقاً بصور المشروع الفعلية.

---

## 🔗 روابط التواصل:

| المنصة | الرابط |
|--------|---------|
| **Instagram** | https://instagram.com/atharagency_ |
| **Facebook** | https://facebook.com/atharagency |
| **Website** | https://athar.com |

---

## 🎯 كيف يعمل في الموقع:

### 1️⃣ في قائمة Tabs:
الآن يوجد **تابين (Tabs)**:
- **Tab 1:** مجوهرات الماس
- **Tab 2:** عيادة جلو للعناية بالبشرة ← **جديد!**

### 2️⃣ عند الضغط على Tab العناية بالبشرة:
- يظهر الفيديو تلقائياً
- 5 صور (2 قبل + 3 بعد)
- معلومات المشروع كاملة
- روابط التواصل الاجتماعي

### 3️⃣ أوضاع العرض:
- **Before**: الصور القديمة
- **After**: الصور الجديدة + الفيديو
- **Compare**: مقارنة تفاعلية

---

## ✨ الميزة الذكية:

### Shadcn Tabs تعمل تلقائياً!
عند إضافة المشروع، الـ Gallery يقوم تلقائياً بـ:
1. ✅ إنشاء Tab جديد في TabsList
2. ✅ إنشاء TabContent جديد للمحتوى
3. ✅ دعم Keyboard navigation
4. ✅ دعم Accessibility
5. ✅ تأثيرات Smooth transitions

**لا حاجة لكود إضافي!** 🚀

---

## 🔄 كيفية استبدال الصور الفعلية:

### الخطوة 1: حمّل صور المشروع الفعلي
```
public/gallery/skincare/
├── before-1.jpg
├── before-2.jpg
├── after-1.jpg
├── after-2.jpg
├── after-3.jpg
└── video.mp4
```

### الخطوة 2: عدّل المسارات في الكود
```typescript
{
  id: "skincare-beauty",
  // ...
  beforeImages: [
    "/gallery/skincare/before-1.jpg",  // 👈 غيّر هنا
    "/gallery/skincare/before-2.jpg"
  ],
  afterImages: [
    "/gallery/skincare/after-1.jpg",   // 👈 وهنا
    "/gallery/skincare/after-2.jpg",
    "/gallery/skincare/after-3.jpg"
  ],
  video: "/gallery/skincare/video.mp4" // 👈 وهنا
}
```

---

## 📈 الإحصائيات الحالية:

| البيان | العدد |
|--------|-------|
| **إجمالي المشاريع** | 2 |
| **Tabs في Gallery** | 2 |
| **مشاريع بفيديو** | 2 |
| **صور Before** | 4 (2 لكل مشروع) |
| **صور After** | 6 (3 لكل مشروع) |
| **فيديوهات** | 2 |

---

## 🎨 التصميم:

### Tab "عيادة جلو":
عند التفعيل:
- Background: `#7ed957` (أخضر)
- Text: Black
- Shadow: Glow effect
- Smooth transition

عند عدم التفعيل:
- Background: شفاف
- Text: White
- Hover: تأثير خفيف

---

## 💡 نصائح للمشاريع القادمة:

### ✅ Best Practices:
1. **ID فريد** - استخدم اسم واضح بالإنجليزي بدون مسافات
2. **أسماء واضحة** - بالعربي والإنجليزي
3. **صور عالية الجودة** - 1200x1200 بكسل أو أكثر
4. **فيديو قصير** - 10-30 ثانية مثالي
5. **روابط صحيحة** - تأكد من الروابط الاجتماعية

### 📝 Template للمشاريع الجديدة:
```typescript
{
  id: "unique-project-id",
  name: "Project Name (EN)",
  nameAr: "اسم المشروع (AR)",
  description: "Description in English...",
  descriptionAr: "الوصف بالعربي...",
  country: "Country (EN)",
  countryAr: "الدولة (AR)",
  category: "Category (EN)",
  categoryAr: "الفئة (AR)",
  beforeImages: ["path1", "path2"],
  afterImages: ["path1", "path2", "path3"],
  video: "video-path.mp4", // اختياري
  socialLinks: {
    instagram: "url",
    facebook: "url",  // اختياري
    website: "url"    // اختياري
  }
}
```

---

## 🚀 النتيجة:

Gallery الآن يعرض:
- ✅ مشروعين كاملين
- ✅ Tabs احترافية (Shadcn)
- ✅ فيديوهات تفاعلية
- ✅ مقارنات Before/After
- ✅ معلومات تفصيلية
- ✅ روابط اجتماعية

**الموقع جاهز للعرض! 🎉**

---

تم التحديث بواسطة Athar Agency 💚  
"We create impact, not just content"


