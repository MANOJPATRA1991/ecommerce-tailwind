# E-Commerce Product Listing Page

## How to Run Locally

1. **Install dependencies:**
    ```bash
    yarn
    ```
2. **Start the development server:**
    ```bash
    yarn start
    ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Thought Process & Trade-offs

- **State Management:**  
  I used Redux Toolkit to manage global state for products, filters, sidebar, and the cart list.
- **Data Source:**  
  Product data is fetched from a mock API or a static JSON file, which is sufficient for demo purposes and avoids backend complexity.
- **UI/UX:**  
  The product grid is responsive, and a sticky filter/sort bar improves usability. I prioritized a clean, minimal design for clarity.
- **Persistence:**  
  The favorites list is persisted in local storage so users don't lose their selections on refresh.
- **Pagination:**  
  I considered adding client-side pagination or infinite scrolling, but skipped it due to the small dataset.

## Known Limitations

- **Pagination/Infinite Scroll:**  
  Not implemented, as the dataset is limited. With more data, this would be necessary for performance and usability.
- **Favorites Implementation:**  
  The "favorites" feature reuses the cart logic, which may not be ideal for a real-world app where cart and favorites are distinct concepts.
- **Mock Data:**  
  The app uses static/mock data. Integrating with a real backend would require additional work.
- **Accessibility:**  
  Basic accessibility is considered, but further improvements (keyboard navigation, ARIA labels, etc.) could be made.

## Requirements Checklist

- Display a list of products with image, name, price, category, and rating — **DONE**
- Filter by category and rating — **DONE**
- Sort by price (asc/desc) — **DONE**
- Add to favorites — **DONE** (via cart logic)
- Highlight favorited products — **DONE**
- Responsive grid layout — **DONE**
- Sticky filter/sort bar — **DONE**
- Fetch data from mock API/JSON — **DONE**
- State management for filters/favorites — **DONE**
- Persist favorites in local storage — **DONE**