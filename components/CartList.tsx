import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useFetchCartQuery } from "@/redux/features/cartSlice";
import { useSelector } from "react-redux";
import CartOperationButton from "./CartOperationButton";
import PriceContainer from "./PriceContainer";

const CartList = () => {
  const userId = useSelector((state: any) => state?.auth?.userData?.userId);

  const { isSuccess, isLoading, isError, error, data } = useFetchCartQuery(
    {
      userId,
    },
    { skip: !userId }
  );

  const renderCartItem = (item: any) => (
    <View
      key={item._id}
      style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: item?.product?.imagePath }}
          style={styles.productImage}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.productName}>{item.product.name}</Text>
          <PriceContainer
            wrapperStyle={styles.priceContainer}
            price={item?.product?.price}
            discountedPrice={item?.product?.discountedPrice}
          />
          <CartOperationButton
            productId={item?.productId}
            userId={userId}
            quantity={item?.quantity}
            screen={"cart"}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart Items</Text>
      {!userId ? (
        <>
          <Text style={styles.emptyCartText}>
            You need to login to view your cart.
          </Text>
        </>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text>Error: {error.message || error?.data?.message || "Error"}</Text>
      ) : isSuccess && data?.cartItems?.length > 0 ? (
        data?.cartItems?.map(renderCartItem)
      ) : (
        <Text style={styles.emptyCartText}>Your cart is currently empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyCartText: {
    marginTop: 10,
    fontStyle: "italic",
  },
  priceContainer: {
    marginTop: 30,
    position: "absolute",
  },
});

export default CartList;
