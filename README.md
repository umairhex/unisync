# UniSync

**Smart course scheduling system with drag-drop, conflict prevention, and export to calendar.**

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/umairhex/unisync)

![UniSync Scheduler](https://via.placeholder.com/1200x600/667eea/ffffff?text=UniSync+Course+Scheduler)

---

## Problem Statement

Students spend **hours** manually creating timetables. Registering for courses is chaos: **conflicts**, overlaps, unbalanced schedules. Building a timetable in Excel or Google Sheets is error-prone and time-consuming. Modern scheduling apps are expensive or unavailable in many regions.

UniSync solves this: **visual drag-drop scheduler** that prevents conflicts and exports to calendar.

**What you get:**
- 🗓️ Visual weekly grid (like Google Calendar)
- 🚫 Automatic conflict prevention
- 📊 Credit/load tracking
- 📥 Import reference images (from university portal)
- 📤 Export as PNG (share with advisors)
- 💾 Save unlimited schedules
- ⚙️ Customizable course colors
- 📱 Works on mobile + desktop

**Result:** Build a semester schedule in **10 minutes**, not hours.

---

## Key Features

- **Drag-Drop Scheduling** – dnd-kit powered for accessibility and touch
- **Visual Weekly Grid** – See all courses at a glance
- **Conflict Detection** – Prevents overlapping course registrations
- **Course Management** – Add courses with time, instructor, location, credits
- **Credit Tracking** – See total credits and balance (Min/Max per semester)
- **Reference Images** – Upload university timetables as reference layers
- **Export as PNG** – Share schedule with advisors or friends
- **Multiple Schedules** – Save different scenarios (Section A vs B, etc.)
- **Custom Colors** – Color-code courses by dept/type
- **Dark Mode** – Night-friendly UI for late-night planning
- **Local Persistence** – All data saved to IndexedDB (works offline)

---

## Architecture Decisions

**Why React 19 + Vite (not Next.js)?** UniSync is a **stateful UI tool**. dnd-kit needs instant feedback on drags. Vite's 60ms HMR is essential for testing drag interactions. React 19's new hooks (`use`) enable Suspense for loading reference images. Result: 3x faster development cycle.

**Why dnd-kit over react-beautiful-dnd?** dnd-kit is:
- ✅ Actively maintained (rbdnd is in maintenance mode)
- ✅ Smaller bundle (~8KB vs ~30KB)
- ✅ Better accessibility (keyboard nav, ARIA)
- ✅ Touch-friendly (phones work perfectly)

**Why IndexedDB for persistence?** Structured grid data (courses, times, colors) needs relationships. IndexedDB provides:
- ✅ Relational queries (find all courses on Monday)
- ✅ Large capacity (~100MB per origin)
- ✅ Offline access
- ✅ Zero hosting costs

**Why html-to-image for PNG export?** Canvas screenshots are tricky (fonts, CSS, SVG). html-to-image:
- ✅ Uses Puppeteer under the hood
- ✅ Captures DOM exactly as rendered
- ✅ Handles complex CSS (gradients, shadows)
- ✅ Works in browser without backend

**Why React Router for navigation?** Single-page app with multiple schedules. React Router provides:
- ✅ URL-based schedule navigation (shareable links)
- ✅ Browser history (back button works)
- ✅ Lazy code-splitting per route

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| **Frontend** | React 19, Vite 7, TypeScript |
| **Routing** | React Router 7.13.0 |
| **Drag-Drop** | dnd-kit suite (core, sortable, utilities) |
| **Storage** | IndexedDB, idb-keyval 6.2.2 |
| **Export** | html-to-image 1.11.13 |
| **UI** | shadcn/ui, Radix UI, Tailwind CSS 4 |
| **Toast Notifications** | Sonner 2.0.7 |
| **Theme** | next-themes |
| **Form Handling** | React Hook Form, Zod |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## Getting Started (5 minutes)

### Prerequisites
- Node.js 20+, pnpm 10+

### Clone & Install

```bash
# Clone repository
git clone https://github.com/your-username/unisync.git
cd unisync

# Install dependencies
pnpm install

# No .env files needed
```

### Run Locally

```bash
# Development server
pnpm dev

# Open http://localhost:5173
```

### Build & Production

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Production build
pnpm build

# Preview production build
pnpm preview
```

### Deploy to Vercel

```bash
# One-click deploy
vercel

# Vercel auto-detects Vite configuration
```

---

## Usage

### Create a Schedule
1. Click **New Schedule**
2. Name it (e.g., "Spring 2026 Plan A")
3. Enter semester dates

### Add Courses
1. Click **Add Course**
2. Fill in:
   - Course code (e.g., CS 101)
   - Title (e.g., Data Structures)
   - Day(s) of week
   - Time (start/end)
   - Instructor
   - Location
   - Credits
   - Color (optional)
3. Click **Save**

### Drag-Drop to Schedule
1. Drag course from left panel to weekly grid
2. UniSync prevents overlaps automatically
3. Drop to confirm placement

### Track Credits
- See total credits on dashboard
- Warning if exceeding max or below min
- Adjust courses to balance load

### Upload Reference Image
1. Click **Reference Images**
2. Upload university timetable screenshot
3. Use as guide while planning
4. Toggle visibility

### Export Schedule
1. Click **Export as PNG**
2. Download image
3. Share with academic advisor

### Save Multiple Scenarios
1. Create "Plan A", "Plan B", "Plan C"
2. Switch between them instantly
3. Compare layouts side-by-side

---

## Known Limitations

1. **IndexedDB limits** – Max ~100MB per origin. After dozens of schedules with images, may hit limit. Solution: export and delete old schedules.
2. **No sync across devices** – Data stored locally. Coming in v2: optional cloud sync.
3. **No time zone support** – All times in local timezone. Multi-timezone coming in v2.
4. **No integration with university portals** – Manual course entry. API integration coming in v2.
5. **PNG export quality** – Dependent on browser capabilities. High-DPI screens show full quality; older devices may be pixelated.

---

## Roadmap

- **v2 (Q2 2026)** – Cloud sync with Google Drive, university portal integration, iOS/Android app
- **v3 (Q3 2026)** – Professor ratings integration, room location maps, meeting organizer (free time detection)
- **v4 (Q4 2026)** – AI schedule recommendations based on difficulty, prerequisite tracking, GPA calculator

---

## License

MIT – See [LICENSE](LICENSE) for details.

---

**Plan your semester smarter.** [Start scheduling →](https://unisync.vercel.app)

---

**Author:** [Umair](https://github.com/umairhex) | [Portfolio](https://umairrx.dev) | [LinkedIn](https://www.linkedin.com/in/umairhex)
