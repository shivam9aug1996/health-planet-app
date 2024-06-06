import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (data) => ({
        url: "/products",
        method: "GET",
        params: {
          categoryId: data?.categoryId,
        },
      }),
    }),
    fetchAllProducts: builder.query({
      query: (data) => ({
        url: "/allProducts",
        method: "GET",
        params: {
          search: data?.search,
        },
      }),
    }),
  }),
});

const productSlice = createSlice({
  name: "productSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export const { useFetchProductsQuery, useFetchAllProductsQuery } = productApi;

export default productSlice.reducer;
