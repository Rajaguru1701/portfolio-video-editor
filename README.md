# Sabu // Creative Portfolio (Angular 100% Static Edition)

> A modern, cinematic, and responsive creative portfolio built for **Nallamuthu M (Sabu)** — Lead Video Editor & Graphic Designer.

---

## ⚡ Zero-Backend Architecture Guarantee

This application operates **without any backend server, database, REST API, Firebase, Supabase, or external CMS**.

```text
Database       ❌ NONE
Backend Server ❌ NONE
Cloud Storage  ❌ NONE
Authentication ❌ NONE
External CMS   ❌ NONE

Angular SPA    ✅ 100% Client-Side
Local Assets   ✅ Stored in src/assets/
Static JSON    ✅ src/assets/data/portfolio.json
Static Hosting ✅ GitHub Pages / Netlify / Vercel / Cloudflare
```

---

## 🚀 Quick Start (Local Development)

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm start
```
Navigate to `http://localhost:4200/`. The application will hot-reload automatically when you modify files.

### 3. Build for Production
```bash
npm run build
```
Production assets are generated in `dist/portfolio/browser/`.

---

## 🎬 How to Add a Video from Your Local Files (Before & After Deploying)

Because this is a static site with **zero backend**, you cannot "upload" files through a web browser on the live site (there is no server to save them). Instead, content management is handled through your Git code repository:

### Visual Workflow

```text
Step 1: Save local MP4 into your project
        📁 src/assets/videos/my-new-cut.mp4
        📁 src/assets/thumbnails/my-new-cut.jpg
                           ↓
Step 2: Generate the project entry
        Open http://localhost:4200/content-helper
        Fill in Title, Client, Tags -> Click "Generate JSON"
                           ↓
Step 3: Paste into catalog
        Add the snippet into 📁 src/assets/data/portfolio.json
                           ↓
Step 4: Push to GitHub or Netlify
        git add .
        git commit -m "Add new project: my-new-cut"
        git push
                           ↓
       🌐 Automated build deploys your new video live!
```

---

### Step-by-Step Instructions

#### Step 1: Copy your video & thumbnail into `src/assets/`
- Video: Copy your MP4 file to `src/assets/videos/my-project.mp4`
- Poster/Thumbnail: Copy an image to `src/assets/thumbnails/my-project.jpg`

> 💡 **Tip on Video Sizes**:
> For optimal web streaming and fast loading:
> - Keep clips between 10MB – 45MB.
> - Use H.264 / MP4 format.
> - GitHub repositories have a 100MB per-file limit. If a video is larger than 100MB, either compress it (using Handbrake or Adobe Media Encoder) or host it on Vimeo/YouTube and put the direct URL into `portfolio.json`.

#### Step 2: Use the `/content-helper` Tool
Navigate to `http://localhost:4200/content-helper` in your browser.
1. Enter your project title (e.g. *Apex Velocity Reel*).
2. Select Category: *Video Editing*.
3. Enter Thumbnail Path: `assets/thumbnails/my-project.jpg`.
4. Enter Media Path: `assets/videos/my-project.mp4`.
5. Click **"Generate JSON Entry"**.
6. Click **"Copy JSON"**.

#### Step 3: Paste into `src/assets/data/portfolio.json`
Open `src/assets/data/portfolio.json` in your code editor, add a comma `,` after the previous item, and paste your new project block.

#### Step 4: Deploying Changes

- **If you are connected to Netlify / Vercel**:
  Simply run:
  ```bash
  git add .
  git commit -m "Add new video project"
  git push
  ```
  Netlify/Vercel will detect the push and redeploy your live site automatically in ~30 seconds!

- **If you are deploying manually (Drag & Drop)**:
  1. Run `npm run build`
  2. Drag the `dist/portfolio/browser/` folder into Netlify Drop (https://app.netlify.com/drop).

---

## 🌐 Deploying to GitHub Pages

A pre-configured GitHub Actions workflow is included at `.github/workflows/deploy.yml`.

### Automated GitHub Pages Deployment:
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. On GitHub, go to your repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Every push to `main` will automatically build and publish your site!

### Manual GitHub Pages Build:
```bash
npx ng build --configuration production --base-href /YOUR_REPO_NAME/
```
Deploy the contents of `dist/portfolio/browser/` to your `gh-pages` branch.

---

## 🌐 Deploying to Netlify

Netlify is the easiest static host for Angular applications:

1. **New site from Git**: Connect your GitHub repository.
2. **Build command**: `npm run build`
3. **Publish directory**: `dist/portfolio/browser`
4. The included `public/_redirects` file automatically handles client-side Angular routing (`/* /index.html 200`).

---

## 🛠️ Project Structure

```text
src/
├── app/
│   ├── core/
│   │   ├── config/
│   │   │   └── site.config.ts        # Creator info, socials, bio, contact details
│   │   ├── data/
│   │   │   └── portfolio.data.ts     # Bundled fallback data for 0ms initial load
│   │   ├── models/
│   │   │   └── portfolio.model.ts    # TypeScript interfaces
│   │   ├── services/
│   │   │   └── portfolio.service.ts  # Client-side filtering & local JSON service
│   │   └── utils/
│   │       └── asset.util.ts         # Base-href-aware asset URL resolver
│   │
│   ├── shared/
│   │   └── components/
│   │       ├── navbar/               # Sticky glass nav with mobile drawer
│   │       ├── footer/               # Agency footer with quick links
│   │       ├── project-card/         # Unified image/video card
│   │       ├── media-modal/          # Fullscreen accessible video/image lightbox
│   │       ├── category-filter/      # Category pills with count badges
│   │       ├── loading-state/        # Skeleton card shimmer grid
│   │       ├── empty-state/          # Zero-results fallback state
│   │       ├── page-header/          # Consistent editorial header
│   │       └── cta-section/          # High-impact contact banner
│   │
│   ├── pages/
│   │   ├── home/                     # Hero, philosophy, featured, services, bio
│   │   ├── portfolio/                # Filterable grid & text search
│   │   ├── project-details/          # Single case study & video player
│   │   ├── about/                    # Skills bars, process, career timeline
│   │   ├── contact/                  # Direct channels, WhatsApp, transparent mailto
│   │   ├── content-helper/           # Dev-only JSON generator
│   │   └── not-found/                # 404 page
│   │
│   ├── assets/
│   │   ├── images/                   # Local photos & artwork
│   │   ├── videos/                   # Local MP4 video cuts
│   │   ├── thumbnails/               # Project preview covers
│   │   └── data/
│   │       └── portfolio.json        # Main project catalog
│   │
│   ├── styles.scss                   # Design system tokens, dark theme, animations
│   └── index.html                    # SEO meta, Open Graph, Google Fonts (Syne/Inter)
```
