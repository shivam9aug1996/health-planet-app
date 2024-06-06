import { Pressable, StyleSheet, TextInput } from "react-native";
import React from "react";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchBar = ({
  readOnly = false,
  search,
  setSearch,
}: {
  readOnly?: boolean;
  search?: string;
  setSearch?: any;
}) => {
  return (
    <Pressable
      onPress={() => {
        router.push("/search");
      }}
      style={styles.searchBarContainer}
    >
      <TextInput
        onChangeText={(text) => {
          setSearch(text);
        }}
        value={search}
        onPress={() => {
          router.push("/search");
        }}
        readOnly={readOnly}
        placeholder="Search..."
        style={styles.searchInput}
      />

      <Ionicons name="search" size={20} />
    </Pressable>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "#f5f5f5", // Light background
    borderRadius: 10, // Rounded corners
    flexDirection: "row", // Arrange elements horizontally
    alignItems: "center", // Align vertically
    paddingHorizontal: 10, // Add horizontal padding
    marginHorizontal: 20,
    marginTop: 10,
  },
  searchInput: {
    flex: 1, // Allow input to fill most of the space
    // backgroundColor: "#fff", // White background for input
    padding: 8, // Add padding for better readability
    fontSize: 16, // Adjust font size
  },
  searchIcon: {
    marginLeft: 10, // Add margin from input
  },
});
