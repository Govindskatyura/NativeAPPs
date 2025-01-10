import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, PanResponder, GestureResponderEvent } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { usePlayer } from "../context/PlayerContext"; // Import PlayerContext

export default function PlayerBox() {
  const { currentSong, sound, isPlaying, progress, playSound, togglePlayPause, setProgress } = usePlayer(); // Use PlayerContext
  const navigation = useNavigation();
  console.log('PlayerBox', currentSong);
  const handleProgressBarPress = async (evt: GestureResponderEvent) => {
    if (sound) {
      const { locationX, layout } = evt.nativeEvent;
      const newProgress = locationX / layout.width;
      setProgress(newProgress);
      await sound.setPositionAsync(newProgress * sound._durationMillis);
    }
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (sound) {
          const newProgress = gestureState.moveX / evt.nativeEvent.layout.width;
          setProgress(newProgress);
          sound.setPositionAsync(newProgress * sound._durationMillis);
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (currentSong) {
      playSound();
    }
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [currentSong]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('PlayerScreen')}>
        <View style={styles.playerBox}>
          <Image source={currentSong.image} style={styles.songImage} />
          <View style={styles.songDetails}>
            <Text style={styles.songTitle}>{currentSong.title}</Text>
            <Text style={styles.songArtist}>{currentSong.artist}</Text>
          </View>
          <TouchableOpacity onPress={togglePlayPause}>
            <FontAwesome name={isPlaying ? 'pause' : 'play'} size={24} color="#1DB954" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View
        style={styles.progressBarContainer}
        {...panResponder.panHandlers}
        onStartShouldSetResponder={() => true}
        onResponderRelease={handleProgressBarPress}
      >
        <View style={styles.progressBar}>
          <View style={{ ...styles.progress, width: `${progress * 100}%` }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  playerBox: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    zIndex: 100,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  songDetails: {
    flex: 1,
    marginLeft: 10,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
  },
  songArtist: {
    color: '#aaa',
    fontSize: 14,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#333',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#555',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: '#1DB954',
  },
});
