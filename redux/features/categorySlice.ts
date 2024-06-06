import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),
  }),
});

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export const { useFetchCategoriesQuery } = categoryApi;

export default categorySlice.reducer;
