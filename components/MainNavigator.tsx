import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Stack } from "expo-router";
import {
  loadAuthDataFromAsyncStorage,
  setAuth,
} from "@/redux/features/authSlice";

const MainNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("kio");
    const loadInitialAuthState = async () => {
      const { token, userData } = await loadAuthDataFromAsyncStorage();
      dispatch(setAuth({ token, userData: JSON.stringify(userData) }));
    };
    loadInitialAuthState();
  }, []);
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="login"
          options={{ title: "Login", headerBackTitle: "Back" }}
        />
        <Stack.Screen
          name="signup"
          options={{ title: "Sign Up", headerBackTitle: "Back" }}
        />
      </Stack>
    </>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
