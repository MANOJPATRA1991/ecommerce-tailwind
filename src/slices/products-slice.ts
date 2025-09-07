import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ALLOWED_CATEGORIES } from "../constants";

type ProductsState = {
  entities: { [id: string]: Product };
  ids: string[];
  filteredProductIds: string[];
  loading?: boolean;
  filters: {
    category: string;
    rating: number;
    sortOrder: "asc" | "desc";
  };
};

const initialState: ProductsState = {
  entities: {},
  ids: [],
  filteredProductIds: [],
  loading: false,
  filters: {
    category: "all",
    rating: 0,
    sortOrder: "asc",
  },
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (): Promise<Product[]> => {
  const response = await fetch("https://dummyjson.com/products").then((response) => response.json());

  return response.products.filter((product: Product) => ALLOWED_CATEGORIES.includes(product.category));
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ProductsState["filters"]>) => {
      state.filters = action.payload;
    },
    updateFilteredProducts: (state) => {
      const { category, rating, sortOrder } = state.filters;

      let filtered = state.ids.filter((id) => {
        const product = state.entities[id];

        // if (!ALLOWED_CATEGORIES.includes(product.category)) return false;

        const matchesCategory = category === "all" || product.category === category;
        const matchesRating = product.rating >= rating;

        return matchesCategory && matchesRating;
      });

      filtered = filtered.sort((a, b) => {
        const priceA = state.entities[a].price;
        const priceB = state.entities[b].price;
        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      });
      state.filteredProductIds = filtered;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {

      state.entities = action.payload.reduce((acc: any, curr) => {
        acc[curr.id] = {
          ...curr,
          id: `${curr.id}`,
          discountPrice: curr.price * (1 - curr.discountPercentage / 100)
        };
        return acc;
      }, {});
      state.ids = action.payload.map((item) => `${item.id}`);
      state.loading = false;
      state.filteredProductIds = state.ids;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
  },
});

export const productsReducer = productsSlice.reducer;
export const { setFilters, updateFilteredProducts } = productsSlice.actions;

export default productsSlice;
