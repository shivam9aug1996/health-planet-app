import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { Link } from "expo-router";

const SettingScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state?.auth?.token);
  const user = useSelector((state: any) => state?.auth?.userData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      {token ? (
        <>
          <Text style={styles.greeting}>Hi, {user?.name}!</Text>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              dispatch(logout());
            }}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.authLinksContainer}>
          <Link href="/login" style={styles.link}>
            <Text style={styles.linkText}>Login</Text>
          </Link>
          <Link href="/signup" style={styles.link}>
            <Text style={styles.linkText}>Signup</Text>
          </Link>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    margin: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  userInfoContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  userInfoLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
  },
  userInfoValue: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#ff5a5f",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  authLinksContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 20,
  },
  link: {
    backgroundColor: "#994c75",
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
