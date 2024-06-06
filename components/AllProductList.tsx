import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useFetchAllProductsQuery } from "@/redux/features/productSlice";
import { useFetchCartQuery } from "@/redux/features/cartSlice";
import { useSelector } from "react-redux";
import CartOperationButton from "./CartOperationButton";
import { useFetchWishlistQuery } from "@/redux/features/wishlistSlice";
import WishListOperation from "./WishListOperation";
import PriceContainer from "./PriceContainer";

const AllProductList = ({ search }) => {
  const { isSuccess, isLoading, isError, error, data } =
    useFetchAllProductsQuery({
      search: search,
    });
  const userId = useSelector((state: any) => state?.auth?.userData?.userId);

  const {
    isSuccess: cartSuccess,
    isLoading: isCartLoading,
    isError: isCartError,
    error: cartError,
    data: cartData,
  } = useFetchCartQuery(
    {
      userId,
    },
    { skip: !userId }
  );
  const {
    isSuccess: isWishListSuccess,
    isLoading: isWishListLoading,
    isError: isWishListError,
    error: wishListError,
    data: wishListData,
  } = useFetchWishlistQuery(
    {
      userId,
    },
    { skip: !userId }
  );
  const [combineData, setCombineData] = useState([]);

  useEffect(() => {
    if (cartData && data && wishListData && userId) {
      // Create a lookup object for cart items
      const cartLookup = cartData?.cartItems?.reduce((acc, cartItem) => {
        acc[cartItem?.productId] = cartItem?.quantity;
        return acc;
      }, {});
      const wishListLookup = wishListData?.wishlistItems?.reduce(
        (acc, wishListItem) => {
          acc[wishListItem?.productId] = wishListItem?.productId;
          return acc;
        },
        {}
      );

      // Combine products with their quantities from the cart
      const combinedProducts = data?.products?.map((product) => {
        return {
          ...product,
          quantity: cartLookup?.[product?._id] || 0,
          isInWishList: wishListLookup?.[product?._id] || false,
          // Default to 0 if the product is not in the cart
        };
      });
      setCombineData(combinedProducts);
    } else if (data) {
      const cartLookup = cartData?.cartItems?.reduce((acc, cartItem) => {
        acc[cartItem?.productId] = cartItem?.quantity;
        return acc;
      }, {});
      const wishListLookup = wishListData?.wishlistItems?.reduce(
        (acc, wishListItem) => {
          acc[wishListItem?.productId] = wishListItem?.productId;
          return acc;
        },
        {}
      );

      // Combine products with their quantities from the cart
      const combinedProducts = data?.products?.map((product) => {
        return {
          ...product,
          quantity: cartLookup?.[product?._id] || 0,
          isInWishList: wishListLookup?.[product?._id] || false,
          // Default to 0 if the product is not in the cart
        };
      });
      setCombineData(combinedProducts);
    }
  }, [cartData, data, wishListData]);

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <View
        style={{
          position: "absolute",
          padding: 20,
          alignSelf: "flex-end",
          zIndex: 1,
        }}
      >
        <WishListOperation
          isInWishList={item?.isInWishList}
          userId={userId}
          productId={item?._id}
        />
      </View>
      <Image
        source={{ uri: item.imagePath }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>

        <PriceContainer
          wrapperStyle={{ marginTop: 5 }}
          price={item?.price}
          discountedPrice={item?.discountedPrice}
        />
      </View>

      <CartOperationButton
        quantity={item?.quantity}
        userId={userId}
        productId={item?._id}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading products...</Text>
      ) : isError ? (
        <Text>Error fetching products: {error.message}</Text>
      ) : isSuccess && combineData?.length > 0 ? (
        <FlatList
          keyboardShouldPersistTaps={"handled"}
          data={combineData}
          renderItem={renderProductItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          horizontal={false}
        />
      ) : (
        <Text>No products found for this category.</Text>
      )}
    </View>
  );
};

export default AllProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productItem: {
    flex: 1, // Allow items to share space evenly within a row
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // width: Dimensions.get("screen").width - 50 / 2,
  },
  productImage: {
    width: "100%",
    height: 200, // Adjust image height as needed
  },
  productDetails: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountedPrice: {
    fontSize: 14,
    color: "#333",
  },
  originalPrice: {
    fontSize: 12,
    color: "#aaa",
    textDecorationLine: "line-through",
    marginLeft: 5,
  },
});
