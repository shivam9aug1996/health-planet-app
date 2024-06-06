import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import WishList from "@/components/WishList";

const WishListScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <WishList />
    </SafeAreaView>
  );
};

export default WishListScreen;
