import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, PanResponder } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { usePlayer } from "./context/PlayerContext"; // Import PlayerContext

export default function PlayerScreen() {
  const { currentSong, isPlaying, progress, setIsPlaying, setProgress, sound, playSound, togglePlayPause } = usePlayer(); // Use PlayerContext
  console.log('currentSong', currentSong);
  console.log('progress', progress);

  const progressBarRef = useRef(null);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: async (event, gestureState) => {
        if (sound && progressBarRef.current) {
          const progressBarWidth = progressBarRef.current.clientWidth;
          const newProgress = Math.min(Math.max(gestureState.moveX / progressBarWidth, 0), 1);
          const newPosition = newProgress * sound._durationMillis;
          await sound.setPositionAsync(newPosition);
          setProgress(newProgress);
        }
      },
      onPanResponderRelease: async (event, gestureState) => {
        if (sound && progressBarRef.current) {
          const progressBarWidth = progressBarRef.current.clientWidth;
          const newProgress = Math.min(Math.max(gestureState.moveX / progressBarWidth, 0), 1);
          const newPosition = newProgress * sound._durationMillis;
          await sound.setPositionAsync(newPosition);
          setProgress(newProgress);
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (currentSong && sound) {
      sound.setPositionAsync(progress * sound._durationMillis);
    }
  }, [currentSong, sound]);

  const handleSkipForward = async () => {
    if (sound) {
      const newPosition = Math.min(sound._durationMillis, sound._positionMillis + 15000);
      await sound.setPositionAsync(newPosition);
      setProgress(newPosition / sound._durationMillis);
    }
  };

  const handleSkipBackward = async () => {
    if (sound) {
      const newPosition = Math.max(0, sound._positionMillis - 15000);
      await sound.setPositionAsync(newPosition);
      setProgress(newPosition / sound._durationMillis);
    }
  };

  const handleProgressBarPress = async (event) => {
    if (sound && progressBarRef.current) {
      const { locationX } = event.nativeEvent;
      const progressBarWidth = progressBarRef.current.clientWidth;
      const newProgress = locationX / progressBarWidth;
      const newPosition = newProgress * sound._durationMillis;
      await sound.setPositionAsync(newPosition);
      setProgress(newProgress);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={currentSong.image} style={styles.songImage} />
      <Text style={styles.songTitle}>{currentSong.title}</Text>
      <Text style={styles.songArtist}>{currentSong.artist}</Text>
      <View
        style={styles.progressBarContainer}
        ref={progressBarRef}
        onTouchEnd={handleProgressBarPress}
        {...panResponder.panHandlers}
      >
        <View style={styles.progressBar}>
          <View style={{ ...styles.progress, width: `${progress * 100}%` }} />
          <View style={{ ...styles.progressDot, left: `${progress * 100}%` }} />
        </View>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleSkipBackward}>
          <MaterialIcons name="replay-10" size={48} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
          <FontAwesome name={isPlaying ? 'pause' : 'play'} size={48} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkipForward}>
          <MaterialIcons name="forward-10" size={48} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.lyricsContainer}>
        <View style={styles.lyricsSticker}>
          <Text style={styles.lyricsText}>
            {/* Replace with actual lyrics */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  songImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  songTitle: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
  },
  songArtist: {
    color: '#aaa',
    fontSize: 18,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#333',
    borderRadius: 15,
    overflow: 'visible',
    marginBottom: 20,
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#555',
    position: 'relative',
  },
  progress: {
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#1DB954',
    overflow:'visible',
  },
  progressDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -2,
    transform: [{ translateX: -7 }],
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  lyricsContainer: {
    width: '80%',
    marginTop: 20,
    maxHeight: 150, // Increase the height to show more of the lyrics
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 10,
  },
  lyricsSticker: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 8,
  },
  lyricsText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
});
