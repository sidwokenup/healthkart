# Global UI Foundation Implementation Plan

## 1. Setup & Dependencies

- Install `lucide-react` for icons (Cart, Menu, Search, User, etc.).
- Update `styles/globals.css` to define the "Medical Blue" theme color (e.g., `#0ea5e9` or similar standard Tailwind blue).

## 2. Component Implementation

### Header (`components/Header.tsx`)

- **Mobile View (< 768px)**:
  - Hamburger Menu (Left) - Toggle state for mobile menu.
  - Logo "HealthKart" (Center/Left).
  - Icons: Search, Cart (Right).
- **Desktop View (≥ 768px)**:
  - Logo "HealthKart" (Left).
  - Search Bar (Center - wide input with search icon).
  - Navigation Links (Categories, Offers, etc.).
  - Actions: Account, Cart (Right).
- **Structure**:
  - Use `<header>` tag with `sticky` positioning.
  - Use `nav` for links.

### Footer (`components/Footer.tsx`)

- **Layout**: Simple multi-column or centered layout depending on content density (keep minimal as requested).
- **Content**:
  - Copyright text.
  - Links: About, Contact, Privacy Policy.
- **Style**: Light gray background to separate from main content.

## 3. Global Layout & Styling

- **Layout (`app/layout.tsx`)**:
  - Verify `flex-col` and `min-h-screen` to ensure footer stays at the bottom.
  - Apply global font smoothing and base text colors.
- **Styling**:
  - Use Tailwind's utility classes for spacing (`p-4`, `gap-4`).
  - Ensure touch targets are at least 44px for mobile (buttons/icons).
  - Apply "Medical Blue" for primary actions and branding.

## 4. Verification

- Verify the build runs (`npm run dev`).
- Check responsiveness on mobile and desktop viewports.
