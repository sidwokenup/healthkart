# Medicine Listing Page UI Fix Plan

## 1. Filter Sidebar Visibility (Desktop)
- The sidebar currently uses `hidden lg:block` which is generally correct, but the issue might be related to layout container width or flex behavior.
- **Fix**: Ensure the `aside` has a robust width and isn't being crushed by the main content.
  - Confirm `w-full lg:w-64 flex-shrink-0` is working as expected.
  - Verify `sticky top-20` behavior (needs a parent with height).

## 2. Filter Section Visuals
- The current implementation has basic headings and checkboxes.
- **Improvement**:
  - Add `border-b` dividers between filter groups for better visual separation.
  - Increase spacing (`gap` or `py`) between items.
  - Ensure checkboxes have `accent-primary` or custom Tailwind forms styling (though standard checkbox is usually visible).
  - Add a "Clear All" button for desktop as well, or make the mobile one visible if needed (though requirement says "mobile filter toggle").

## 3. Mobile Filter UI
- The "Show Filters" button is present (`lg:hidden`).
- **Improvement**:
  - Make it more prominent: `w-full bg-white border border-primary text-primary hover:bg-blue-50` instead of gray.
  - Ensure it's placed logically (e.g., sticky bottom or top of grid) if the user wants it always accessible, but for now, top of the grid is fine.

## 4. Sort Dropdown Visibility
- The sort dropdown is standard HTML `<select>`.
- **Improvement**:
  - Add a custom "Sort by" label styling.
  - Ensure the select box has a clear border and background.
  - Check alignment on mobile (stack vs row).

## 5. Layout Validation
- **Desktop**: Sidebar (Left, Fixed Width) + Grid (Right, Flex Grow).
- **Mobile**: Grid (Full Width) + Filter Toggle (Top).
- **Fix**: Verify `flex-col lg:flex-row` on the container.

## Implementation Steps
1.  **Modify `app/medicines/page.tsx`**:
    - Update `aside` styles for better desktop visibility.
    - Enhance filter group styling (headings, spacing, dividers).
    - Style the mobile "Show Filters" button to be more distinct.
    - Style the "Sort by" dropdown container.
2.  **Verify**:
    - Check responsiveness.
    - Ensure text contrast is high (gray-900 for headings).
