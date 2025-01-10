import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, PanResponder, TouchableWithoutFeedback } from "react-native";
import { BlurView } from 'expo-blur';
import { useSidebar } from "./context/SidebarContext";
import { useTheme } from "./context/ThemeContext"; // Import useTheme

export default function ChatScreen() {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const { isDarkMode } = useTheme(); // Use theme context
  const translateX = useRef(new Animated.Value(250)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isSidebarOpen ? 0 : 250,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isSidebarOpen]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 20;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx < -50) {
        toggleSidebar();
      }
    },
  });

  return (
    <TouchableWithoutFeedback onPress={toggleSidebar}>
      <BlurView intensity={isSidebarOpen ? 10 : 0} style={isSidebarOpen ? styles.overlay : styles.overlaybefore}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.chat, { transform: [{ translateX }], backgroundColor: isDarkMode ? "#333" : "#fff" }]} {...panResponder.panHandlers}>
            <Text style={[styles.chatHeader, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>Chats</Text>
            {/* Add your chat UI here */}
          </Animated.View>
        </TouchableWithoutFeedback>
      </BlurView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlaybefore: {
    zIndex: -1,
  },
  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  chat: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 250,
    padding: 16,
  },
  chatHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
