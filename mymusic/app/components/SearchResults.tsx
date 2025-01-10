import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
// Import necessary audio playing library
import { Audio } from 'expo-av';

const SearchResults = ({ results }) => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [sound, setSound] = useState(null);

  const playSong = async (url) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
    setSound(newSound);
    await newSound.playAsync();
  };

  const handlePress = (item) => {
    setSelectedSong(item.id);
    playSong(item.previewUrl); // Assuming `previewUrl` is the URL to play the song
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.resultItem,
        selectedSong === item.id && styles.selectedItem,
      ]}
      onPress={() => handlePress(item)}
    >
      <Image source={{ uri: item.thumbnails[0].url }} style={styles.thumbnail} />
      <View style={styles.resultText}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.artist}>{item.artist?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.resultsContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultsContainer: {
    flexGrow: 1, // Added to make the list scrollable
    padding: 20,
    backgroundColor: '#000',
    marginTop: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
  },
  selectedItem: {
    backgroundColor: '#333',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  resultText: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    color: '#AAAAAA',
    fontSize: 14,
  },
});

export default SearchResults;
