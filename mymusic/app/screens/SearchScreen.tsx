import React, { useState } from "react";
import { Text, View, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useSidebar } from "../context/SidebarContext";
import fetchMusic from '../../fetchMusic';
import SearchResults from '../components/SearchResults'; // Import the SearchResults component

export default function SearchScreen() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const categories = [
    "Podcasts", "Made For You", "Charts", "New Releases", "Discover", "Concerts", "Hip Hop", "Pop", "Rock", "Indie"
  ];

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = await fetchMusic(query);
      setSearchResults(results); // Set the search results
      console.log(results);
    }
  };

  const handleSearchIconDoubleClick = () => {
    setSearchQuery('');
    setSearchResults([]);
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
        <Text style={styles.heading}>Search</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <TouchableOpacity onPress={handleSearchIconDoubleClick} delayLongPress={300} onLongPress={handleSearchIconDoubleClick}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="What do you want to listen to?"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.resultsContainer}>
        <SearchResults results={searchResults} /> {/* Display search results */}
      </View>
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.category}>
            <Text style={styles.categoryText}>{category}</Text>
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
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  resultsContainer: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 150,
  },
  category: {
    backgroundColor: "#282828",
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    width: "48%",
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
