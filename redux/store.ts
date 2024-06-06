import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice, { authApi } from "./features/authSlice";
import cartSlice, { cartApi } from "./features/cartSlice";
import categorySlice, { categoryApi } from "./features/categorySlice";
import productSlice, { productApi } from "./features/productSlice";
import wishlistSlice, { wishlistApi } from "./features/wishlistSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    category: categorySlice,
    [categoryApi.reducerPath]: categoryApi.reducer,
    product: productSlice,
    [productApi.reducerPath]: productApi.reducer,
    cart: cartSlice,
    [cartApi.reducerPath]: cartApi.reducer,
    wishlist: wishlistSlice,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    // plan: planSlice,
    // [planApi.reducerPath]: planApi.reducer,
    // member: memberSlice,
    // [memberApi.reducerPath]: memberApi.reducer,
    // payment: paymentSlice,
    // [paymentApi.reducerPath]: paymentApi.reducer,
    // attendance: attendanceSlice,
    // [attendanceApi.reducerPath]: attendanceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
      .concat(wishlistApi.middleware),
  // .concat(gymApi.middleware)
  // .concat(planApi.middleware)
  // .concat(memberApi.middleware)
  // .concat(paymentApi.middleware)
  // .concat(attendanceApi.middleware),
});

export default store;
setupListeners(store.dispatch);
