import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useUpdateWishlistMutation } from "@/redux/features/wishlistSlice";
import { Toast } from "toastify-react-native";

const WishListOperation = ({ isInWishList, userId, productId }) => {
  const [localWishlistStatus, setLocalWishlistStatus] = useState(isInWishList);
  const [
    updateWishlist,
    { isLoading, isSuccess, isError, error: updateError },
  ] = useUpdateWishlistMutation();

  const handleUpdate = async () => {
    if (!userId) {
      Toast.warn("Please login first", "top");
      return;
    }
    const optimisticWishlistStatus = !localWishlistStatus;
    setLocalWishlistStatus(optimisticWishlistStatus);

    try {
      await updateWishlist({
        userId,
        productId,
        action: localWishlistStatus ? "remove" : "add",
      }).unwrap();
    } catch (err) {
      console.error("Failed to update wishlist:", err);
      setLocalWishlistStatus(localWishlistStatus); // Revert back to original status on error
    }
  };

  return (
    <TouchableOpacity onPress={handleUpdate} disabled={isLoading}>
      <AntDesign
        name={localWishlistStatus ? "heart" : "hearto"}
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};

export default WishListOperation;

const styles = StyleSheet.create({});
