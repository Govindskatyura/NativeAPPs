import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const App = () => {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchPlaylists();
    fetchSongs();
    fetchAlbums();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/playlists');
      setPlaylists(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/songs');
      setSongs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:5000/albums');
      setAlbums(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Playlists</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.browseId}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
      <Text>Songs</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.videoId}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
      <Text>Albums</Text>
      <FlatList
        data={albums}
        keyExtractor={(item) => item.browseId}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default App;
