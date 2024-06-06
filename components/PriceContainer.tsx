import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PriceContainer = ({ price, discountedPrice, wrapperStyle }) => {
  return (
    <View style={[styles.priceContainer, wrapperStyle]}>
      <Text style={styles.originalPrice}>₹{price}</Text>
      <Text style={styles.discountedPrice}>₹{discountedPrice}</Text>
    </View>
  );
};

export default PriceContainer;

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    marginRight: 5,
    color: "#888",
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d32f2f",
  },
});
