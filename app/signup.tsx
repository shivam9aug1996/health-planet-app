import React, { useState } from "react";
import { useSignupMutation } from "@/redux/features/authSlice";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { router } from "expo-router";

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [signup, { isLoading }] = useSignupMutation();

  const handleInputChange = (field: any, value: any) => {
    setFormData({ ...formData, [field]: value });
    setError("");
  };

  const validateForm = () => {
    const { name, mobileNumber, password } = formData;
    const mobileNumberRegex = /^[6-9]\d{9}$/;

    if (!name.trim()) return "Please fill in your name.";
    if (!mobileNumber.trim()) return "Please fill in mobile number.";
    if (!password.trim()) return "Please fill in password.";
    if (!mobileNumber.match(mobileNumberRegex))
      return "Please enter a valid Indian mobile number";
    if (mobileNumber.length !== 10)
      return "Mobile number should be 10 digits long";
    if (password.length < 4)
      return "Password should be at least 4 characters long";

    return "";
  };

  const handleSignup = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    signup(formData)
      .unwrap()
      .then((res) => {
        console.log("Signup successful", res);
        setFormData({ name: "", mobileNumber: "", password: "" });
        router.push("");
      })
      .catch((err) => {
        console.log("Signup error", err);
        setError(err?.data?.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={(text) => handleInputChange("name", text)}
              value={formData.name}
            />
            <TextInput
              maxLength={10}
              style={styles.input}
              placeholder="Mobile Number"
              onChangeText={(text) => handleInputChange("mobileNumber", text)}
              value={formData.mobileNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(text) => handleInputChange("password", text)}
              value={formData.password}
              secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={styles.spinner}
                />
              ) : (
                <Text style={styles.signupButtonText}>Signup</Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  spinner: {
    width: 50,
  },
});
