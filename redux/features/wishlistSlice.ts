import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["wishList"],
  endpoints: (builder) => ({
    updateWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishList"],
    }),
    fetchWishlist: builder.query({
      query: (data) => ({
        url: "/wishlist",
        method: "GET",
        params: {
          userId: data?.userId,
        },
      }),
      providesTags: ["wishList"],
    }),
  }),
});

const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export const { useFetchWishlistQuery, useUpdateWishlistMutation } = wishlistApi;

export default wishlistSlice.reducer;
