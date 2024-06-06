import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFetchWishlistQuery } from "@/redux/features/wishlistSlice";
import RemoveWishList from "./RemoveWishList";
import PriceContainer from "./PriceContainer";

const WishList = () => {
  const userId = useSelector((state: any) => state?.auth?.userData?.userId);
  const [loadingItems, setLoadingItems] = useState([]);

  const { isSuccess, isLoading, isError, error, data } = useFetchWishlistQuery(
    {
      userId,
    },
    { skip: !userId }
  );

  const renderWishItem = (item: any) => (
    <View key={item._id} style={styles.wishItemContainer}>
      <View style={styles.wishItemContent}>
        <Image
          source={{ uri: item?.product?.imagePath }}
          style={styles.productImage}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.productName}>{item?.product?.name}</Text>
          <PriceContainer
            wrapperStyle={styles.priceContainer}
            price={item?.product?.price}
            discountedPrice={item?.product?.discountedPrice}
          />

          <RemoveWishList
            loadingItems={loadingItems}
            setLoadingItems={setLoadingItems}
            item={item}
            userId={userId}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Wish List Items</Text>
      {!userId ? (
        <>
          <Text style={styles.emptyCartText}>
            You need to login to view your Wish List.
          </Text>
        </>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text>Error: {error?.data?.message || error?.message || "Error"}</Text>
      ) : isSuccess && data?.wishlistItems?.length > 0 ? (
        data?.wishlistItems?.map(renderWishItem)
      ) : (
        <Text style={styles.emptyCartText}>
          Your wish list is currently empty.
        </Text>
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
  wishItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wishItemContent: {
    flexDirection: "row",
    alignItems: "center",
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
  priceContainer: {
    marginTop: 30,
    position: "absolute",
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
  removeButton: {
    backgroundColor: "#ff0000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyCartText: {
    marginTop: 10,
    fontStyle: "italic",
  },
});

export default WishList;
