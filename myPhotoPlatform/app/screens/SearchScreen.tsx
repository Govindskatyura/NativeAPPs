import React from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for search icon
import { useTheme } from "../context/ThemeContext"; // Import useTheme
import mediaData from '../data/mediaData'; // Import media data

// Get device width to calculate image dimensions
const { width } = Dimensions.get('window');
const numColumns = 3;
const tileSize = width / numColumns;

const SearchScreen = () => {
  const { isDarkMode } = useTheme(); // Use theme context

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
      style={styles.searchInput}
      placeholder="Search"
      placeholderTextColor="#666"
      />
      {/* <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} /> */}
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.tile}>
      <Image
        source={{ uri: item.source }}
        style={styles.image}
        resizeMode="cover"
      />
      {item.isVideo && (
        <View style={styles.videoIndicator}>
          <Image // Add your video icon
            style={styles.videoIcon}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#000" : "#fff" }]}>
      {renderSearchBar()}
      <FlatList
        data={mediaData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row', // Add flexDirection to align icon and input
    alignItems: 'center', // Center align items
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchIcon: {
    marginRight: 10, // Add margin to the right of the icon
  },
  searchInput: {
    flex: 1, // Allow input to take remaining space
    height: 40,
    backgroundColor: '#e1e1e1',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  tile: {
    width: tileSize,
    height: tileSize,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#fff',
  },
  videoIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  videoIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});

export default SearchScreen;
