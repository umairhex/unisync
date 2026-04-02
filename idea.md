# Calyra (autimetable)

## Core Idea

### Problem

University students face a recurring challenge every semester: building their weekly class schedule. Official timetable documents are often dense PDF grids or spreadsheet exports that are difficult to parse. Students must cross-reference course sections, time slots, classrooms, and credit limits manually. Existing tools are either institution-specific, require accounts, or send data to external servers. There is no simple, private, visual tool that lets students drag courses onto a weekly grid, track credits, and export the result — all without creating an account or sharing personal academic data.

### Solution

Calyra is a fully client-side university course scheduling tool. Students add their courses (manually or via JSON import), then visually arrange them on a Monday-through-Friday time grid using drag-and-drop or click-to-assign interactions. The finished timetable can be exported as a high-quality PNG image. All data stays entirely in the browser — there is no backend, no database, and no account required.

### Value

Calyra eliminates the friction of manual schedule planning by providing an interactive visual grid with instant feedback on credit totals, time conflicts, and classroom assignments. Because everything runs locally, students retain complete privacy over their academic data. The zero-setup nature means students can start building their timetable immediately without registration or installation.

### User Outcome

A student opens the app, adds their courses, drags them onto the time grid, verifies credit totals and conflicts at a glance, and exports the completed schedule as a shareable PNG image — all in a single session with no account, no data upload, and no dependency on university IT infrastructure.

---

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: React state
- **Components & Libraries**: Lucide React, Next Themes, Sonner, TipTap, DND Kit, React Router
- **Architecture**: Client-side only (zero backend)

---

## Key Features

### Course Management

#### Purpose

Allow students to define their course catalog with all relevant details before placing them on the timetable.

#### Capabilities

- Add courses with code, name, section/class, credits, faculty, and classroom fields
- Duplicate detection by course code and section combination
- Input validation for course codes (alphanumeric pattern), sections, and credit ranges (0–12)
- Edit and delete existing courses
- JSON import for bulk course loading with smart matching and unresolved course reporting
- Visual course cards in a sidebar ready for drag-and-drop placement

#### User Benefit

Students build their course catalog once and reuse it across the scheduling process, with validation preventing data entry errors and JSON import enabling quick setup from shared course lists.

---

### Visual Timetable Grid

#### Purpose

Provide an interactive weekly grid where students can see their entire schedule at a glance and arrange courses spatially.

#### Capabilities

- Monday-through-Friday grid with configurable start time, end time, and interval duration
- Default configuration of 08:00–17:00 with 60-minute slots
- Drag-and-drop course placement from sidebar to grid slots (via dnd-kit)
- Double-click assignment via modal for precise slot selection
- Multiple entries per slot with visual stacking and conflict indication
- Inline classroom editing per slot assignment
- Real-time total and scheduled credit counters
- Automatic slot migration when time settings change (existing assignments shift to the new grid)

#### User Benefit

The visual grid transforms schedule planning from a mental exercise into a spatial interaction where conflicts, gaps, and balance are immediately visible.

---

### Export and Reference Tools

#### Purpose

Enable students to produce a shareable schedule image and compare against official university timetables.

#### Capabilities

- One-click PNG export of the timetable grid at 2x resolution for print-quality output
- Proper background handling for both light and dark themes during export
- Reference image gallery for uploading official university timetable screenshots or PDFs
- Side-by-side comparison between the built schedule and official reference images
- Images stored in IndexedDB to handle large file sizes without affecting localStorage

#### User Benefit

Students get a portable, shareable image of their finalized schedule and can verify accuracy against official documents without switching between tabs or applications.

---

### Customization and Settings

#### Purpose

Adapt the timetable grid to match different university schedule formats and personal preferences.

#### Capabilities

- Adjustable schedule start and end times
- Configurable time interval (30, 60, 90 minutes, etc.)
- Light, dark, and system-aware theme toggle
- Intelligent assignment migration when settings change — existing placements are preserved and repositioned

#### User Benefit

The tool adapts to any university's schedule format rather than forcing students into a fixed grid, and theme support ensures comfortable use in any lighting condition.

---

## System Structure

### User Interface

The application has two main views: a marketing landing page at the root path with feature explanations, how-it-works steps, statistics, FAQs, and testimonials; and the timetable builder at `/table` featuring a resizable sidebar with course cards and a main grid area. The builder interface includes a toolbar for settings, import/export, and reference image management.

### Data Layer

The system stores courses (code, name, section, credits, faculty, classroom), timetable assignments (mapping of day-time slots to course entries with optional classroom overrides), timetable settings (start time, end time, interval), and reference images (name, data URL, upload timestamp). Courses, assignments, and settings use localStorage. Reference images use IndexedDB via idb-keyval to handle large binary data.

### Access Model

There is no authentication. The application is fully anonymous and local. No accounts, no server communication, no data collection. Every user's data exists exclusively in their own browser storage.

### Persistence

Data persists across browser sessions via localStorage and IndexedDB. There is no cloud sync — closing the browser retains all data, but clearing browser storage removes it. The FAQ explicitly states that no account is required and all data is stored locally.

---

## User Workflow

### Entry

Users land on the marketing homepage explaining features and workflow. Clicking the call-to-action navigates to the timetable builder interface.

### Creation

Students add courses through a modal form with validation (code, name, section, credits, optional faculty and classroom). Alternatively, they import a structured JSON file containing course and schedule data. Courses appear as draggable cards in the sidebar.

### Organization

Courses are placed on the grid by dragging cards onto specific day-time slots or by double-clicking a slot and selecting a course from a modal. Each slot can hold multiple entries. The credit counter updates in real-time as courses are scheduled.

### Retrieval

The timetable is always visible as the primary view. Reference images can be uploaded and browsed in a gallery for comparison. Settings allow adjusting the time grid parameters, with existing assignments automatically migrating.

### Reuse

The completed timetable is exported as a PNG image for sharing. Course data persists in localStorage for future semester planning. JSON export enables sharing course lists with classmates who can import them directly.

---

## Documentation / Support Layer

### Purpose

Help students understand the tool's capabilities and workflow without requiring external documentation.

### Contents

- Landing page with feature explanations and step-by-step workflow guide
- FAQ section addressing common questions (data privacy, account requirements, supported formats)
- Inline validation messages guiding correct data entry
- Testimonial section providing social proof and use-case examples

### User Benefit

Students can understand and use the full feature set within minutes of their first visit, with no documentation to read or tutorials to watch.

---

## Product Positioning

### Category

Education utility — university course schedule builder.

### Scope

Focuses exclusively on visual timetable construction, credit tracking, and schedule export. Intentionally avoids course registration, grade tracking, academic calendar integration, or social features. The product is a single-purpose scheduling tool that does one thing well.

### Primary Users

University and college students who need to plan their weekly class schedule, particularly in institutions where students manually select sections and time slots across multiple courses.

### Core Value Proposition

A zero-setup, privacy-first visual timetable builder that runs entirely in the browser — no accounts, no servers, no data collection — letting students drag-and-drop their way to a complete weekly schedule and export it as a shareable image.
