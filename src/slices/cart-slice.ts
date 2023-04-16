import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
};

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

type UpdateCart = RequireOnly<Product, "id" | "price">;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<UpdateCart>) => {
      const cartItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        const newItem = { id: action.payload.id, quantity: 1 };
        state.items.push(newItem);
      }
      state.totalAmount += action.payload.price;
      state.totalItems += 1;
    },
    removeFromCart: (state, action: PayloadAction<UpdateCart>) => {
      const cartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const cartItem = state.items[cartItemIndex];
      if (cartItem) {
        cartItem.quantity -= 1;
        if (cartItem.quantity === 0) {
          state.items.splice(cartItemIndex, 1);
        }
        state.totalAmount -= action.payload.price;
        state.totalItems -= 1;
      }
    },
    removeAllFromCart: (state, action: PayloadAction<UpdateCart>) => {
      const cartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const cartItem = state.items[cartItemIndex];
      if (cartItem) {
        state.totalAmount -= cartItem.quantity * action.payload.price;
        state.totalItems -= cartItem.quantity;
        state.items.splice(cartItemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const { addToCart, removeFromCart, removeAllFromCart, clearCart } = cartSlice.actions;

export default cartSlice;
