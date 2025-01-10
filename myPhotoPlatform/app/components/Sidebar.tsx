import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, PanResponder, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSidebar } from "../context/SidebarContext";

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar ,closeSidebar} = useSidebar();
  const translateX = useRef(new Animated.Value(-250)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isSidebarOpen ? 0 : -250,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isSidebarOpen]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 20;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 50) {
        toggleSidebar();
      }
    },
  });
  return (
    <TouchableWithoutFeedback onPress={toggleSidebar}>
      <BlurView intensity={isSidebarOpen?10:0} style={isSidebarOpen?styles.overlay:styles.overlaybefore}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]} {...panResponder.panHandlers}>
            <View style={styles.profileCard}>
              <Image
                source={{ uri: 'https://picsum.photos/80' }}
                style={styles.profileIconLarge}
              />
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>User Name</Text>
                <TouchableOpacity>
                  <Text style={styles.viewProfile}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.sidebarButton}>
              <Ionicons name="star" size={20} color="white" />
              <Text style={styles.sidebarButtonText}>What's New</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarButton}>
              <Ionicons name="musical-notes" size={20} color="white" />
              <Text style={styles.sidebarButtonText}>Your Sound Capsule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarButton}>
              <Ionicons name="time" size={20} color="white" />
              <Text style={styles.sidebarButtonText}>Listen History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarButton}>
              <Ionicons name="settings" size={20} color="white" />
              <Text style={styles.sidebarButtonText}>Settings and Privacy</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>
      </BlurView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlaybefore:{
    zIndex:-1,
  },
  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#333",
    padding: 16,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 35,
  },
  profileTextContainer: {
    marginLeft: 10,
  },
  profileIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  viewProfile: {
    color: "#e0e0e0",//gray
    fontSize: 14,
  },
  sidebarButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sidebarButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10,
  },
});
