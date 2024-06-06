import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import AllProductList from "@/components/AllProductList";
import { debounce } from "../utils";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debouncedInput = useCallback(
    debounce((val: any) => {
      console.log(val);
      setDebouncedSearch(val);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedInput(search);
  }, [search]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <SearchBar setSearch={setSearch} search={search} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      >
        <AllProductList search={debouncedSearch} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchScreen;
