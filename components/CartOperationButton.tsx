import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useUpdateCartMutation } from "@/redux/features/cartSlice";
import { debounce } from "@/app/utils";
import { Toast } from "toastify-react-native";

const CartOperationButton = ({
  quantity = 0,
  userId,
  productId,
  screen = "",
}) => {
  console.log("87654erhjk", quantity);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [localQuantity, setLocalQuantity] = useState({
    value: 0,
    isFirstTime: true,
    prev: 0,
  });
  const [
    updateCart,
    { data, isLoading, isSuccess, isError, error: updateError },
  ] = useUpdateCartMutation();
  const debouncedInput = useCallback(
    debounce(async (val) => {
      console.log(":765rfghjkl", val);
      try {
        await updateCart({
          userId,
          quantity: val?.localQuantity?.value,
          productId,
          action: "remove",
        })
          .unwrap()
          ?.then(() => {
            console.log("8765rfgh");
            setLocalQuantity({
              ...localQuantity,
              value: val?.localQuantity?.value,
              prev: val?.localQuantity?.value,
            });
          });
      } catch (err) {
        console.error("Failed to update cart:", err);
        setLocalQuantity({
          ...localQuantity,
          value: val?.localQuantity?.prev,
          prev: val?.localQuantity?.prev,
        });
      }
    }, 1000),
    []
  );

  useEffect(() => {
    setLocalQuantity({
      value: quantity,
      isFirstTime: true,
      prev: quantity,
    });
  }, [quantity]);

  useEffect(() => {
    if (!localQuantity.isFirstTime) debouncedInput({ localQuantity });
  }, [localQuantity?.value]);

  const handleUpdateCart = async (action) => {
    if (!userId) {
      Toast.warn("Please login first", "top");
      return;
    }
    setLocalQuantity((prevState) => ({
      ...prevState,
      value: action === "add" ? prevState.value + 1 : prevState.value - 1,
      isFirstTime: false,
    }));
  };

  return (
    <View style={[styles.quantityContainer, { opacity: isLoading ? 0.3 : 1 }]}>
      {localQuantity?.value == 0 && screen == "" ? (
        <TouchableOpacity
          disabled={isLoading}
          style={styles.addToCartButton}
          onPress={() => handleUpdateCart("add")}
        >
          <Text style={styles.addToCartButtonText}>Add to cart</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleUpdateCart("remove")}
            disabled={localQuantity?.value <= 0 || isLoading}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{localQuantity?.value}</Text>
          <TouchableOpacity
            disabled={isLoading}
            style={styles.button}
            onPress={() => handleUpdateCart("add")}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CartOperationButton;

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 5,
    padding: 10,
    alignItems: "center",
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
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginVertical: 10,
    marginRight: 20,
    alignSelf: "flex-end",
  },
  addToCartButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
