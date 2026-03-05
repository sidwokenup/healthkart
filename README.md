# HealthKart

Medicine E-commerce Application (Mobile-First)

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Mobile-first)
- **Package Manager**: npm

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open the application**:
   Visit [http://localhost:3000](http://localhost:3000)

## Folder Structure

- **app/**: App Router pages and layouts.
  - `layout.tsx`: Global layout with Header/Footer.
  - `page.tsx`: Homepage placeholder.
- **components/**: Reusable UI components.
  - `Header.tsx`: Global header.
  - `Footer.tsx`: Global footer.
- **styles/**: Global styles.
  - `globals.css`: Tailwind imports and global CSS variables.
- **lib/**: Utility functions and shared logic (currently empty).
- **public/**: Static assets (images, fonts).

## Environment Variables

Copy `.env.example` to `.env.local` to configure environment variables.
