# AI Zoo — Production Ready

The project has been refactored for production. All assets are internal, and it is optimized for high performance and SEO.

## 📁 Final Folder Structure

```text
ai-zoo/
├── assets/
│   └── images/
│       ├── favicon.png         <-- New premium icon
│       ├── hero-bg.png        <-- Local hero image
│       └── species-exhibit.png <-- Local species collage
├── css/
│   └── style.css              <-- Master Stylesheet
├── js/
│   └── script.js              <-- Main logic & interaction
├── index.html                 <-- Primary Landing Page
├── privacy.html               <-- Privacy Policy
├── terms.html                 <-- Terms of Service
├── contact.html               <-- Contact Us
├── vercel.json                <-- Vercel Config
└── .gitignore                 <-- Git settings
```

## 🚀 Deployment Instructions

### 1. GitHub Upload
Upload ALL folders (`assets/`, `css/`, `js/`) and ALL root files EXCEPT the original PDF (unless you want it there).

### 2. Vercel Settings
- Connect your GitHub repo.
- Frameork: "Other" (static).
- Build: None.
- Root: `index.html`.

### 3. Custom Domain & DNS
- Add your domain in Vercel.
- Update A / CNAME records in your registrar (GoDaddy/Namecheap) as prompted by Vercel.

## 📈 Future Upgrade Paths

- **Admin Panel**: Move to a Headless CMS like [Sanity](https://www.sanity.io).
- **Auth**: Use [Clerk](https://clerk.com) for secure user sessions.
- **Payments**: Integrate [Stripe](https://stripe.com) for ticket or membership sales.
- **AI Exhibit**: Move from Canvas simulations to a [Next.js](https://nextjs.org) backend pulling live logs from real agent runs (e.g., using [LangChain](https://langchain.com)).

---
&copy; 2026 AI Zoo Keepers.
