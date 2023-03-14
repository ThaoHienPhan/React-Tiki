import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    miniCart: false,
    cartItems: [],
  },
  reducers: {
    showMiniCart(state) {
      state.miniCart = true;
    },
    hideMiniCart(state) {
      state.miniCart = false;
    },
    addToCart(state, action) {
      // new item
      const newItem = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === newItem.id);
      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === id);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },
    removeItems(state, action) {
      const idNeedToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== idNeedToRemove
      );
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  showMiniCart,
  hideMiniCart,
  addToCart,
  removeItems,
  setQuantity,
} = actions; //named export
export default reducer; //default export
