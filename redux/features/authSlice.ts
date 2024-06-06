import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveAuthDataToAsyncStorage = async (token: any, userData: any) => {
  try {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  } catch (e) {
    console.error("Failed to save auth data to AsyncStorage", e);
  }
};

export const loadAuthDataFromAsyncStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    let userData = await AsyncStorage.getItem("userData");
    userData = userData ? JSON.parse(userData) : null;
    return { token, userData };
  } catch (e) {
    console.error("Failed to load auth data from AsyncStorage", e);
    return { token: null, userData: null };
  }
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/auth`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    token: null,
    userData: null,
    authLoader: false,
    reduxStarted: false,
  },
  reducers: {
    setAuth: (state, action) => {
      if (action?.payload?.userData) {
        state.userData = JSON.parse(action?.payload?.userData);
        state.token = action?.payload?.token;
      } else {
        state.userData = null;
      }
      state.reduxStarted = true;
    },
    setAuthLoader: (state, action) => {
      state.authLoader = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload?.token || null;
        state.userData = action.payload?.userData || null;

        saveAuthDataToAsyncStorage(state.token, state.userData);
      }
    );

    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, action) => {
        state.token = action.payload?.token || null;
        state.userData = action.payload?.userData || null;
        saveAuthDataToAsyncStorage(state.token, state.userData);
      }
    );
  },
});

export const { useLoginMutation, useSignupMutation } = authApi;

export const { setAuth, setAuthLoader, logout } = authSlice.actions;

export default authSlice.reducer;
