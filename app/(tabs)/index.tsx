import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchBar from "@/components/SearchBar";
import CategoryList from "@/components/CategoryList";
import { useSelector } from "react-redux";
import { useFetchCartQuery } from "@/redux/features/cartSlice";
import { useFetchWishlistQuery } from "@/redux/features/wishlistSlice";

const HomeScreen = () => {
  const userId = useSelector((state: any) => state?.auth?.userData?.userId);

  const { data: data1 } = useFetchCartQuery(
    {
      userId,
    },
    { skip: !userId }
  );
  const { data } = useFetchWishlistQuery(
    {
      userId,
    },
    { skip: !userId }
  );
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar readOnly={true} />
      <CategoryList />
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
