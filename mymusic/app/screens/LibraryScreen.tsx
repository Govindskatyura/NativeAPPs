import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useSidebar } from "../context/SidebarContext";

export default function LibraryScreen() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [activeFilter, setActiveFilter] = useState("Playlists");
  const playlists = [
    { name: "Liked Songs", creator: "You", poster: "https://picsum.photos/50" },
    { name: "Daily Mix 1", creator: "Spotify", poster: "https://picsum.photos/50" },
    { name: "Daily Mix 2", creator: "Spotify", poster: "https://picsum.photos/50" },
    { name: "Discover Weekly", creator: "Spotify", poster: "https://picsum.photos/50" },
    { name: "Release Radar", creator: "Spotify", poster: "https://picsum.photos/50" },
    { name: "Top Hits", creator: "Spotify", poster: "https://picsum.photos/50" },
    { name: "Chill Vibes", creator: "Spotify", poster: "https://picsum.photos/50" },
    { name: "Discover Weekly", creator: "Spotify", poster: "https://picsum.photos/50" },
  ];

  const handleFilterPress = (filter) => {
    setActiveFilter(filter);
    // Add navigation or filtering logic if needed
  };

  return (
    <View style={styles.container}>
      {/* {isSidebarOpen && <Sidebar />} */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Image
            source={{ uri: 'https://picsum.photos/80' }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Your Library</Text>
        <View style={styles.icons}>
          <Ionicons name="search" size={24} color="white" style={styles.icon} />
          <Ionicons name="add" size={24} color="white" style={styles.icon} />
        </View>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.filters}>
        {["Playlists", "Podcasts", "Albums", "Artists", "Downloaded"].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeFilterButton,
            ]}
            onPress={() => handleFilterPress(filter)}
          >
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.playlistsContainer}>
        {playlists.map((playlist, index) => (
          <TouchableOpacity key={index} style={styles.playlist}>
            <Image source={{ uri: playlist.poster }} style={styles.playlistPoster} />
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistText}>{playlist.name}</Text>
              <Text style={styles.playlistSubText}>{playlist.creator}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 35,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 20,
  },
  filters: {
    flexDirection: "row",
    paddingHorizontal: 8,
    height: 40,
    paddingVertical: 5,
    marginBottom: 10,
  },
  filterButton: {
    marginRight: 16,
    backgroundColor: "#333",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 30,
  },
  activeFilterButton: {
    backgroundColor: "#1DB954",
  },
  filterText: {
    color: "#fff",
    fontSize: 16,
  },
  playlistsContainer: {
    paddingTop: 10,
  },
  playlist: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    padding: 5,
  },
  playlistPoster: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 16,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  playlistSubText: {
    color: "#B3B3B3",
    fontSize: 15,
  },
});
