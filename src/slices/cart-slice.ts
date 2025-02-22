import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
};

const STORAGE_KEY = "cartState";

const loadCartFromStorage = (): CartState => {
  try {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : { items: [], totalAmount: 0, totalItems: 0 };
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return { items: [], totalAmount: 0, totalItems: 0 };
  }
};

const saveCartToStorage = (cartState: CartState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

const initialState: CartState = loadCartFromStorage();

type UpdateCart = { id: string; price: number };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<UpdateCart>) => {
      const cartItem = state.items.find((item) => item.id === action.payload.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.items.push({ id: action.payload.id, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
      state.totalItems += 1;
      saveCartToStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<UpdateCart>) => {
      const cartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (cartItemIndex !== -1) {
        const cartItem = state.items[cartItemIndex];
        cartItem.quantity -= 1;
        if (cartItem.quantity === 0) {
          state.items.splice(cartItemIndex, 1);
        }
        state.totalAmount -= action.payload.price;
        state.totalItems -= 1;
        saveCartToStorage(state);
      }
    },
    removeAllFromCart: (state, action: PayloadAction<UpdateCart>) => {
      const cartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (cartItemIndex !== -1) {
        const cartItem = state.items[cartItemIndex];
        state.totalAmount -= cartItem.quantity * action.payload.price;
        state.totalItems -= cartItem.quantity;
        state.items.splice(cartItemIndex, 1);
        saveCartToStorage(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      saveCartToStorage(state);
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const { addToCart, removeFromCart, removeAllFromCart, clearCart } = cartSlice.actions;

export default cartSlice;
