import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFetchCartQuery } from "@/redux/features/cartSlice";
import { useSelector } from "react-redux";
import { useFetchWishlistQuery } from "@/redux/features/wishlistSlice";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const userId = useSelector((state: any) => state?.auth?.userData?.userId);

  const { isSuccess, isLoading, isError, error, data } = useFetchCartQuery(
    {
      userId,
    },
    { skip: !userId }
  );

  const { data: wishData } = useFetchWishlistQuery(
    {
      userId,
    },
    { skip: !userId }
  );

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={"black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarBadge:
            userId && data?.cartItems?.length > 0
              ? data?.cartItems?.length
              : undefined,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cart" : "cart-outline"}
              color={"black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search" : "search-outline"}
              color={"black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wish List",
          tabBarBadge:
            userId && wishData?.wishlistItems?.length > 0
              ? wishData?.wishlistItems?.length
              : undefined,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "heart" : "heart-outline"}
              color={"black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={"black"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
