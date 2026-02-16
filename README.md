# IntegrationHub

A comprehensive SEO-optimized integration directory showcasing 380+ automation workflows between popular SaaS applications. Built with Next.js 15 and designed to drive organic traffic through detailed integration guides.

## 🚀 Features

### Core Functionality
- **380+ Pre-rendered Integration Pages** - All app combinations statically generated at build time
- **Smart Search & Filtering** - Real-time client-side search with category filters
- **Featured Integrations** - Curated showcase of popular workflows
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop

### SEO Optimization
- **Dynamic Meta Tags** - Unique title, description, and keywords per integration
- **Open Graph & Twitter Cards** - Custom social sharing images
- **JSON-LD Schema** - Structured data with HowTo schema for search engines
- **Dynamic OG Images** - Auto-generated 1200×630 social preview images
- **Canonical URLs** - SEO-friendly URL structure

### Rich Content
- **Step-by-Step Guides** - 7-step setup instructions for each integration
- **Prerequisites Checklist** - Clear requirements before starting
- **Context-Aware Use Cases** - 30+ variations based on app categories
- **Pro Tips** - Best practices and expert advice
- **Quick Info Cards** - Setup time, difficulty, and cost at a glance

### Design & UX
- **Gradient Design System** - Blue-to-purple theme with glass morphism
- **Animated Elements** - Smooth fade-ins, slide-ups, and blob animations
- **Real App Logos** - Simple Icons CDN integration
- **Sticky Navigation** - Header with logo and CTA
- **Back to Top** - Floating button for easy navigation

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist Sans & Geist Mono
- **Image Optimization**: Next.js Image + Simple Icons CDN
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
integration-hub/
├── app/
│   ├── api/og/          # OG image generation endpoint
│   ├── integration/[slug]/  # Dynamic integration pages
│   ├── globals.css      # Global styles & animations
│   ├── layout.tsx       # Root layout with Header
│   ├── page.tsx         # Homepage
│   └── favicon.ico      # Site favicon
├── components/
│   ├── AppLogo.tsx      # Brand logo component
│   ├── BackToTop.tsx    # Floating back-to-top button
│   ├── Header.tsx       # Sticky navigation
│   └── SearchGrid.tsx   # Search, filter, and results grid
├── data/
│   └── apps.ts          # App data (20 apps)
├── lib/
│   └── combinations.ts  # Generate all app pairs
└── public/
    └── logo.png         # Site logo
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd integration-hub

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Generate static production build
npm run build

# Start production server
npm start
```

## 📊 Data Structure

### Apps (`data/apps.ts`)
```typescript
{
  id: string;        // URL-friendly identifier
  name: string;      // Display name
  category: string;  // AI, CRM, Communication, etc.
  color: string;     // Tailwind gradient class
  logo: string;      // Simple Icons slug
}
```

### Combinations
All possible app pairs are generated automatically using `getAllCombinations()` from `lib/combinations.ts`. This creates 380 unique routes (20 apps × 19 combinations each).

## 🎨 Customization

### Adding New Apps
1. Edit `data/apps.ts`
2. Add new app object with required fields
3. Find logo slug from [Simple Icons](https://simpleicons.org/)
4. Run `npm run build` to regenerate pages

### Updating Use Cases
Context-aware use cases are generated in `app/integration/[slug]/page.tsx` based on app categories. Edit the `useCaseMap` object to customize examples.

### Styling
- Global animations: `app/globals.css`
- Color scheme: Tailwind config (blue-purple gradient theme)
- Components: Individual component files in `components/`

## 🔗 Affiliate Integration

All CTA buttons include Make.com affiliate tracking:
```
https://www.make.com/en/register?pc=jaymieblaze&source={integration-slug}
```

Update the `pc` parameter in component files to use your affiliate ID.

## 🌐 SEO Configuration

### Metadata
Each integration page generates unique:
- Title: "Connect {Source} to {Dest} - Integration Guide 2026"
- Description: Dynamic based on app categories
- Keywords: 13+ relevant terms per integration

### Sitemap
Generate sitemap using `next-sitemap`:
```bash
npm run build
```

Configuration in `next-sitemap.config.js`

## 📈 Performance

- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Client-side Filtering**: No server requests for search

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

Serve the `.next` build output with Node.js server.

## 📝 License

MIT License - feel free to use this project for your own integration directories.

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

---

Built with ❤️ using Next.js 15
