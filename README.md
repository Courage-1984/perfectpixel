# Perfect Pixel & Web — Premium Redesign

A fully redesigned, modern, premium-quality website for Perfect Pixel & Web — South Africa's trusted professional photo enhancement studio.

---

## 🚀 Project Overview

This is a complete ground-up redesign of [perfectpixel.co.za](https://www.perfectpixel.co.za/), rebuilt as an awe-inspiring, conversion-focused, premium static website. The redesign addresses all previous UX/UI weaknesses and positions Perfect Pixel & Web as a premium photo enhancement studio.

---

## ✅ Completed Features

### Pages
| Page | File | Description |
|------|------|-------------|
| **Home** | `index.html` | Hero with before/after slider, services, process, testimonials, stats bar |
| **Image Upscaling** | `image-upscaling.html` | Service hero, demo slider, specs table, use cases grid, FAQ |
| **Photo Colorization** | `colorization.html` | Emotional hero, examples, colorization process, FAQ, testimonials |
| **Before & After Examples** | `examples.html` | Filterable gallery with 9 comparison sliders, featured transformation |
| **Contact** | `contact.html` | Premium contact form, quick contact, Terms & Conditions, Privacy Policy |

### Design System (`css/style.css`)
- CSS custom properties for brand colors, spacing, and typography
- Full responsive layout (mobile, tablet, desktop)
- Premium gradient brand system (pink → purple → blue)
- Dark navy base with glass-morphism card effects
- Scroll reveal animations
- Counter animations for stats
- Comparison widget styles

### JavaScript (`js/main.js`)
- Navigation scroll state + hamburger mobile menu
- Scroll reveal observer
- Before/after comparison drag sliders (mouse + touch)
- FAQ accordion
- Tab switching
- Counter animations
- Upload zone with drag-and-drop
- Contact form with table API submission
- Toast notification system

### Data
- `contact_requests` table schema for storing enquiries from the contact form

---

## 📁 File Structure

```
index.html                    — Home page
image-upscaling.html          — Image Upscaling service page
colorization.html             — Photo Colorization service page
examples.html                 — Before & After gallery/portfolio
contact.html                  — Contact form + Terms & Privacy
css/
  style.css                   — Full design system & component styles
js/
  main.js                     — All interactive JavaScript
images/
  logo-icon.png               — Square icon logo (for favicon & mobile nav)
  logo-large.png              — Large standalone icon mark
```

---

## 🔗 Functional Entry Points

| URI | Description |
|-----|-------------|
| `/` or `/index.html` | Home page with hero, services, testimonials |
| `/image-upscaling.html` | Image Upscaling service page |
| `/colorization.html` | Photo Colorization service page |
| `/examples.html` | Before & After gallery with filter |
| `/examples.html?filter=upscaling` | Gallery filtered to upscaling (via JS) |
| `/contact.html` | Contact & quote request form |
| `/contact.html#terms` | Directly opens Terms & Conditions tab |
| `/contact.html#privacy` | Directly opens Privacy Policy tab |

### API Endpoints Used
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `tables/contact_requests` | Save contact form submissions |

---

## 🎨 Design Decisions

### Brand Colors
- **Primary gradient**: `#e879b0` (pink) → `#9b87f5` (purple) → `#60a5fa` (blue)
- **Background**: Deep navy `#0a0c14` / `#0f1220`
- **Cards**: `#131728` / `#1a1f35`

### Typography
- **Display headings**: Playfair Display (serif) — emotional, premium feel
- **Body & UI**: Inter (sans-serif) — clean, modern, highly readable

### Key UX Improvements Over Original
1. ✅ Clear hero with before/after slider proof
2. ✅ Specific high-intent CTAs ("Upscale My Photo", "Colorize My Photo")
3. ✅ Social proof: testimonials + stats with counter animations
4. ✅ 4-step process explanation on every service page
5. ✅ FAQ accordions to reduce buyer friction
6. ✅ Privacy/security reassurance on every CTA
7. ✅ Responsive gallery with category filters
8. ✅ Premium contact form with service selection
9. ✅ Terms & Privacy in tab-based layout

---

## 🔧 Features Not Yet Implemented

- [ ] Real customer photo upload (requires server-side storage solution)
- [ ] Actual payment integration (Stripe / PayFast for South Africa)
- [ ] Customer account/portal for tracking order status
- [ ] Email notification system for new contact requests
- [ ] Blog / resource section
- [ ] Live chat widget
- [ ] Pricing page with specific ZAR pricing
- [ ] Logo: full wordmark version (logo-full.png failed to download — 403)

---

## 💡 Recommended Next Steps

1. **Upload logos**: Add the full wordmark PNG to `images/logo-full.png` for desktop nav
2. **Add pricing**: Create a dedicated pricing page with specific ZAR amounts per service
3. **Email notifications**: Connect the contact form to an email service (e.g. EmailJS, Formspree) for instant alerts
4. **Real before/after images**: Replace Unsplash placeholders with actual client work samples
5. **WhatsApp link**: Update the WhatsApp number in `contact.html` (currently placeholder)
6. **Social links**: Update the social media URLs in all footers
7. **Email address**: Confirm `info@perfectpixel.co.za` is correct throughout
8. **SEO**: Add structured data (JSON-LD) for LocalBusiness and Service schemas
9. **Analytics**: Add Google Analytics or Plausible tracking
10. **Publish**: Go to the **Publish tab** to deploy your site live

---

## 🌐 Deployment

To make this website live, go to the **Publish tab** in this interface. The Publish tab handles all deployment automatically and provides a live URL.

---

## 📊 Data Models

### `contact_requests` Table
| Field | Type | Description |
|-------|------|-------------|
| `id` | text | Auto-generated UUID |
| `service` | text | Service requested (Upscaling / Colorization / Restoration) |
| `name` | text | Client full name |
| `email` | text | Client email |
| `phone` | text | Phone / WhatsApp number |
| `num_photos` | text | Number of photos |
| `turnaround` | text | Urgency level |
| `details` | rich_text | Project description and requirements |
| `agree_terms` | bool | Terms acceptance confirmation |
| `created_at` | datetime | Auto-generated submission timestamp |

---

*Built with HTML5, CSS3, vanilla JavaScript. No frameworks required. Designed for performance, accessibility, and conversion.*
