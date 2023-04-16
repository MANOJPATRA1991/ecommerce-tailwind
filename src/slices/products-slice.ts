import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type ProductsState = {
  entities: { [id: Product["id"]]: Product };
  ids: Product["id"][];
  loading?: boolean;
};

const initialState: ProductsState = {
  entities: {},
  ids: [],
  loading: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (): Promise<Product[]> => {
    const response = await fetch("https://fakestoreapi.com/products").then(
      (response) => response.json()
    );
    return response;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.entities = action.payload.reduce((acc: any, curr) => {
        acc[curr.id] = { ...curr, id: `${curr.id}` };
        return acc;
      }, {});
      state.ids = action.payload.map((item) => `${item.id}`);
      state.loading = false;
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const productsReducer = productsSlice.reducer;

export default productsSlice;
