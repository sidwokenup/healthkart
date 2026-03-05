# Home Page UI Implementation Plan

## 1. Component Structure

I will create a structured set of components to keep the Home page clean and modular:

- **`components/home/Hero.tsx`**:
  - A welcoming section with a "Medical Blue" background or gradient.
  - Large, prominent search bar with a search icon.
  - Headline: "Your Pharmacy, Delivered."
- **`components/home/CategoryGrid.tsx`**:
  - A grid of quick-access categories (Pain Relief, Cold & Cough, etc.).
  - Use `lucide-react` icons (Pill, Thermometer, etc.) for visual cues.
  - Mobile: Scrollable or tight grid. Desktop: Spacious grid.
- **`components/home/OfferBanner.tsx`**:
  - A promotional banner highlighting discounts (e.g., "Flat 20% off").
  - Use distinct colors (e.g., teal or green) to stand out from the primary blue.
- **`components/ProductCard.tsx`**:
  - A reusable component for displaying medicines.
  - Features: Image placeholder, Name, Dosage info, Price, "Add" button.
- **`components/home/FeaturedSection.tsx`**:
  - Displays a list of `ProductCard`s under a "Popular Medicines" heading.

## 2. Implementation Details

- **Styling**:
  - Use `bg-primary/5` or similar light shades for section backgrounds to maintain the "clean medical" look.
  - Ensure touch targets (buttons, cards) are large enough for mobile users.
  - Use `container mx-auto` for consistent alignment with the Header/Footer.
- **Data**:
  - Create a mock data file or array within the components to populate the UI (Categories, Products).

## 3. Integration

- Update **`app/page.tsx`** to import and stack these sections vertically:
  1. `<Hero />`
  2. `<CategoryGrid />`
  3. `<OfferBanner />`
  4. `<FeaturedSection />`

## 4. Verification

- Verify responsiveness (Mobile vs. Desktop layout).
- Ensure consistency with the existing Header/Footer.
