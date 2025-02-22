import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cart-slice";
import { productsReducer } from "./slices/products-slice";
import { sidebarReducer } from "./slices/sidebar-slice";
import { filterSidebarReducer } from "./slices/filter-sidebar-slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    sidebar: sidebarReducer,
    cart: cartReducer,
    filterSidebar: filterSidebarReducer,
  },
});

export default store;

export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;