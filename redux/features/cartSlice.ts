import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["cartList"],
  endpoints: (builder) => ({
    updateCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cartList"],
    }),
    fetchCart: builder.query({
      query: (data) => ({
        url: "/cart",
        method: "GET",
        params: {
          userId: data?.userId,
        },
      }),
      providesTags: ["cartList"],
    }),
  }),
});

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export const { useUpdateCartMutation, useFetchCartQuery } = cartApi;

export default cartSlice.reducer;
