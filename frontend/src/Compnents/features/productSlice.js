import { createSlice } from "@reduxjs/toolkit";
// import {toast} from 'react-toastify'

const initialState = {
  items: [],
  quantity: 0,
  seller: ''
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.product === action.payload.product
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].cartQuantity += 1;
        state.quantity += 1;
        // toast.info("Products quanity increased", {
        //     position: 'bottom-left'
        // })
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.items.push(tempProduct);
        state.quantity += 1;
        state.seller = action.payload.seller
      }
    },
    removeFromCart(state, action) {
      const newCart = state.items.filter(
        (item) => item.product !== action.payload.product
      );
      state.items = newCart;
      state.quantity -= 1;
    },
    decreaseCart(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.product === action.payload.product
      );
      if (state.items[itemIndex].cartQuantity > 1) {
        state.items[itemIndex].cartQuantity -= 1;
        state.quantity -= 1;
      } else if (state.items[itemIndex].cartQuantity === 1) {
        const newCart = state.items.filter(
          (item) => item.product !== action.payload.product
        );
        state.items = newCart;
        state.quantity -= 1;
      }
    },
    increaseCart(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.product === action.payload.product
      );
      if (state.items[itemIndex].cartQuantity >= 1) {
        state.items[itemIndex].cartQuantity += 1;
        state.quantity += 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  increaseCart,
} = productSlice.actions;
export default productSlice.reducer;
