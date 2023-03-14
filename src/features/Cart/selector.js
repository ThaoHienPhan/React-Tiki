import { createSelector } from "@reduxjs/toolkit";

const cartItemSelector = (state) => state.cart.cartItems;
export const cartItemCountSelector = createSelector(cartItemSelector, (cartItems) =>
  cartItems.reduce((count, items) => count + items.quantity, 0)
);

export const cartItemTotalSelector = createSelector(cartItemSelector, (cartItems) =>
  cartItems.reduce((total, items) => total + (items.product.salePrice * items.quantity), 0)
);
