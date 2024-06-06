import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CartList from "@/components/CartList";

const CartScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <CartList />
    </SafeAreaView>
  );
};

export default CartScreen;
