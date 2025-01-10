import React, { useRef, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useSidebar } from "../context/SidebarContext";

// Dummy data for podcasts
const podcasts = [
  { id: "1", title: "Podcast 1", image: "https://picsum.photos/150" },
  { id: "2", title: "Podcast 2", image: "https://picsum.photos/150" },
  { id: "3", title: "Podcast 3", image: "https://picsum.photos/150" },
];

const renderPodcastCard = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{item.title}</Text>
  </View>
);

export default function PodcastScreen() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      {/* {isSidebarOpen && <Sidebar />} */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Image
            source={{ uri: 'https://picsum.photos/80' }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Podcasts</Text>
      </View>
      <FlatList
        data={podcasts}
        renderItem={renderPodcastCard}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    width: 150,
    marginRight: 16,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    marginTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
});
