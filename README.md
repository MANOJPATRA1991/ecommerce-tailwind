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
  Product data is fetched from the [DummyJSON Products API](https://dummyjson.com/products), which provides a realistic mock backend for development and testing.
- **UI/UX:**  
  The product grid is responsive, and a sticky filter/sort bar improves usability. I prioritized a clean, minimal design for clarity.
- **Persistence:**  
  The cart is persisted in local storage so users don't lose their selections on refresh.
- **Pagination:**  
  I considered adding client-side pagination or infinite scrolling, but skipped it due to the small dataset.

## Known Limitations

- **Pagination/Infinite Scroll:**  
  Not implemented, as the dataset is limited. With more data, this would be necessary for performance and usability.
- **Accessibility:**  
  Basic accessibility is considered, but further improvements (keyboard navigation, ARIA labels, etc.) could be made.

## Requirements Checklist

- **Home Page (Product List)**
  - Fetch and display a list of products from [https://dummyjson.com/products](https://dummyjson.com/products) — **DONE**
  - Each product card shows image, title, price, and rating — **DONE**
  - Clicking a product navigates to its Product Detail Page — **DONE**

- **Product Details Page**
  - Dynamic route: `/products/[id]` — **DONE**
  - Fetch product details from [https://dummyjson.com/products/{id}](https://dummyjson.com/products/{id}) — **DONE**
  - Display title, main image, description, price, discount percentage, and rating — **DONE**

- **Cart Page**
  - Users can add products to the cart — **DONE**
  - Users can remove products from the cart — **DONE**
  - Cart page displays list of added products, total item count, and total price — **DONE**
  - Cart state persists within the session (using localStorage) — **DONE**

- **Navigation**
  - Clear navigation between Home, Product Detail, and Cart pages — **DONE**