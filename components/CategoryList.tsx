import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { useFetchCategoriesQuery } from "@/redux/features/categorySlice";
import { router, useNavigation } from "expo-router";
import { throttle } from "@/app/utils";

const CategoryList = () => {
  const { isSuccess, isLoading, isError, error, data } =
    useFetchCategoriesQuery();
  const navigation = useNavigation();
  const renderCategoryItem = ({ item }) => (
    <Pressable
      onPress={throttle(() => {
        const params = {
          categoryId: item._id,
          categoryName: item?.name,
        };

        router.push(`product/${JSON.stringify(params)}`);
        // navigation.navigate("product1", {
        //   params: item,
        // });
      }, 2000)}
      style={styles.categoryItem}
    >
      <Image
        source={{ uri: item.imagePath }}
        style={styles.categoryImage}
        resizeMode="cover"
      />
    </Pressable>
  );

  if (isLoading) {
    return <Text>Loading categories...</Text>;
  }

  if (isError) {
    return <Text>Error fetching categories: {error.message}</Text>;
  }

  const numColumns = 2;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={data?.categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item._id}
        numColumns={numColumns}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    margin: 10,
  },
  categoryImage: {
    width: (Dimensions.get("window").width - 100) / 2,
    height: 200,
  },
  categoryName: {
    marginTop: 5,
    textAlign: "center",
  },
});
