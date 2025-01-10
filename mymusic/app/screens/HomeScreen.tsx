import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSidebar } from "../context/SidebarContext";
import PlayerBox from "../components/PlayerBox"; // Import PlayerBox component
import { usePlayer } from "../context/PlayerContext"; // Import PlayerContext
import { fetchData } from '../utils/fetchFromSavan'; // Import fetchData function

// Dummy data
const dummyRecentlyPlayed = [
  { id: "1", title: "New Trending 1", image: "https://picsum.photos/150" },
  { id: "4", title: "Khatra sar pe tha...", image: require('../../assets/images/pic1.jpg')}, // Local song added
];
const dummyTopMixes = [
  { id: "1", title: "New Trending 1", image: "https://picsum.photos/150" },
];
const dummyMadeForYou = [
  { id: "1", title: "Playlist 1", image: "https://picsum.photos/150" },
  { id: "2", title: "Playlist 2", image: "https://picsum.photos/150" },
];

const dummyLastPlays = [
  { id: "1", title: "New Trending 1", image: "https://picsum.photos/150" },
  { id: "2", title: "New Trending 2", image: "https://picsum.photos/150" },
];

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [recentlyPlayed, setRecentlyPlayed] = useState(dummyRecentlyPlayed);
  const [topMixes, setTopMixes] = useState(dummyTopMixes);
  const [madeForYou, setMadeForYou] = useState(dummyMadeForYou);
  const [lastPlays, setLastPlays] = useState(dummyLastPlays);
  const navigation = useNavigation();
  const { toggleSidebar, isSidebarOpen } = useSidebar();
  const { currentSong, setCurrentSong } = usePlayer(); // Use PlayerContext

  useEffect(() => {
    fetchSavanData(); // Fetch data from Savan
  }, []);

  const fetchSavanData = async () => {
    try {
      const savanData = await fetchData();
      if (savanData) {
        // Extract and add the Savan data to dummyTopMixes
        const newTopMixes = savanData.new_trending.map((item, index) => ({
          id: item.id,
          title: item.title,
          image: item.image,
        }));
        setTopMixes([...dummyTopMixes, ...newTopMixes]);

        // Extract and add the Savan data to dummyMadeForYou
        const newMadeForYou = savanData.top_playlists.map((item, index) => ({
          id: item.id,
          title: item.title,
          image: item.image,
        }));
        setMadeForYou([ ...newMadeForYou.slice(0,8)]);

        // Extract and add the Savan data to dummyLastPlays
        const newLastPlays = savanData.new_trending.map((item, index) => ({
          id: item.id,
          title: item.title,
          image: item.image,
        }));
        setLastPlays([...dummyLastPlays, ...newLastPlays]);

        // Extract and add the Savan data to dummyRecentlyPlayed
        const newRecentlyPlayed = savanData.new_albums.map((item, index) => ({
          id: item.id,
          title: item.title,
          image: item.image,
        }));
        setRecentlyPlayed([...dummyRecentlyPlayed, ...newRecentlyPlayed]);
      } else {
        // Use dummy data if API call fails
        setTopMixes(dummyTopMixes);
        setMadeForYou(dummyMadeForYou);
        setLastPlays(dummyLastPlays);
        setRecentlyPlayed(dummyRecentlyPlayed);
      }
    } catch (error) {
      console.error(error);
      // Use dummy data if API call fails
      setTopMixes(dummyTopMixes);
      setMadeForYou(dummyMadeForYou);
      setLastPlays(dummyLastPlays);
      setRecentlyPlayed(dummyRecentlyPlayed);
    }
  };

  const handleFilterPress = (filter) => {
    setActiveFilter(filter);
    if (filter === "Podcasts") {
      navigation.navigate("PodcastScreen");
    }
  };

  const handleProfileIconClick = () => {
    toggleSidebar();
  };

  const handleSongPress = async (song) => {
    if (currentSong && currentSong.id !== song.id && sound) {
      await sound.stopAsync();
    }
    if (song.id === "4") { // Check if the local song is clicked
      setCurrentSong({
        title: "Khatra sar pe tha...",
        artist: "Unknown Artist",
        image: require('../../assets/images/pic1.jpg'),
        audio: require('../../assets/audio/Khatra sar pe tha meme  Gangs of Wasseypur.mp3'), // Local audio file
      });
    } else {
      setCurrentSong(song); // Set the current song for other songs
    }
    // console.log('currentSong', currentSong);
  };

  const filteredContent = [...recentlyPlayed, ...topMixes, ...madeForYou];

  const renderCard = ({ item }) => (
    <TouchableOpacity onPress={() => handleSongPress(item)}>
      <View style={styles.card}>
        <Image source={{ uri: item.thumbnails ? item.thumbnails[0].url : item.image }} style={styles.cardImage} />
        <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const renderLastPlayItem = ({ item }) => (
    <View style={styles.lastPlayItem}>
      <Image source={{ uri: item.thumbnails ? item.thumbnails[0].url : item.image }} style={styles.lastPlayImage} />
      <View style={styles.lastPlayTextContainer}>
        <Text style={styles.lastPlayTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
      </View>
    </View>
  );

  const renderSection = ({ item }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      <FlatList
        data={item.data}
        renderItem={item.renderItem}
        keyExtractor={(item) => item.videoId || item.id}
        horizontal={item.horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={item.numColumns}
      />
    </View>
  );

  const sections = [
    {
      title: "Recently Played",
      data: lastPlays.slice(0, 8), // Limit to 8 items
      renderItem: renderLastPlayItem,
      horizontal: false,
      numColumns: 2,
    },
    {
      title: "Good Morning",
      data: recentlyPlayed,
      renderItem: renderCard,
      horizontal: true,
      numColumns: 1,
    },
    {
      title: "Your Top Mixes",
      data: topMixes,
      renderItem: renderCard,
      horizontal: true,
      numColumns: 1,
    },
    {
      title: "Made for You",
      data: madeForYou,
      renderItem: renderCard,
      horizontal: true,
      numColumns: 1,
    },
  ];

  return (
    <View style={styles.container}>
      {/* { isSidebarOpen && <Sidebar /> } */}
      {/* PlayerBox component */}
      {currentSong && <PlayerBox song={currentSong} />}
      <View style={styles.stickyHeader}>
        <TouchableOpacity onPress={handleProfileIconClick}>
          <Image source={{ uri: "https://picsum.photos/80" }} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={styles.filters}>
          {["All", "Music", "Podcasts"].map((filter) => (
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
        </View>
      </View>
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  stickyHeader: {
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  filters: {
    flexDirection: "row",
  },
  filterButton: {
    marginRight: 16,
    backgroundColor: "#333",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeFilterButton: {
    backgroundColor: "#1DB954",
  },
  filterText: {
    color: "#fff",
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    color: "#fff",
    fontSize: 18,
    marginRight: 16,
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
    flexWrap: "nowrap",
  },
  lastPlayItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    backgroundColor: "#333", // Added gray background color
    // padding: 8,
    borderRadius: 8,
    margin: 4, // Added margin to create gap between items
  },
  lastPlayImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  lastPlayTextContainer: {
    flex: 1,
  },
  lastPlayTitle: {
    color: "#fff",
    fontSize: 16,
    flexWrap: "nowrap",
  },
});
