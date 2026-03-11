# New DEV Hire Onboarding Guide

Interactive onboarding application for the Privacy / TextIQ engineering team.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+ (`brew install node`)

## Quick Start

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Step-by-step onboarding checklist with persistent progress tracking (saved to localStorage)
- Full PrivacyIQ architecture documentation — pipeline, API, MongoDB, Liquibase, debugging
- Copyable code blocks for all commands
- Image lightbox for screenshots (click to zoom)
- Collapsible sections with smooth animations
- Sidebar navigation with progress bar

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- Next.js 16 + TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Framer Motion animations
