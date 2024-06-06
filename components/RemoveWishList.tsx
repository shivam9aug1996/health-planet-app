import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useUpdateWishlistMutation } from "@/redux/features/wishlistSlice";
import { Toast } from "toastify-react-native";

const RemoveWishList = ({ item, userId, setLoadingItems, loadingItems }) => {
  const [
    updateWishlist,
    {
      isLoading: isWishListUpdateLoading,
      isSuccess: isWishListUpdateSuccess,
      isError: isWishListUpdateError,
      error: wishListUpdateError,
    },
  ] = useUpdateWishlistMutation();
  const handleRemoveItem = () => {
    if (!userId) {
      Toast.warn("Please login first", "top");
      return;
    }
    // Function to handle removing the item from the wishlist
    // console.log("Removing item with ID:", productId);
    // setLoadingItems([...new Set([...loadingItems, item?.productId])]);

    updateWishlist({
      userId,
      productId: item?.productId,
      action: "remove",
    });
  };
  return (
    <TouchableOpacity
      style={[
        styles.removeButton,
        { opacity: isWishListUpdateLoading ? 0.3 : 1 },
      ]}
      onPress={() => handleRemoveItem()}
      disabled={isWishListUpdateLoading}
    >
      <Text style={styles.removeButtonText}>{"Remove"}</Text>
    </TouchableOpacity>
  );
};

export default RemoveWishList;

const styles = StyleSheet.create({
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
});
