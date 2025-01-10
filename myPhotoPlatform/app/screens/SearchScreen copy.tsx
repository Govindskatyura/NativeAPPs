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
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.tile}>
      <Image
        source={{ uri: item.source }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>
      {item.isVideo && (
        <View style={styles.videoIndicator}>
          <Image
            source={item.source} // Add your video icon
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
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
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
  infoContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    padding: 5,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
  },
  caption: {
    color: '#fff',
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
