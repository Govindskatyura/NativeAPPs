import React, { createContext, useState, useContext } from 'react';
import { Audio } from 'expo-av';

const PlayerContext = createContext({
  currentSong: null,
  sound: null,
  setCurrentSong: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  progress: 0,
  setProgress: () => {},
  playSound: () => {},
  togglePlayPause: () => {},
});

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sound, setSound] = useState();
  
  async function playSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(currentSong.audio);
    setSound(newSound);
    await newSound.playAsync();
    setIsPlaying(true);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setProgress(status.positionMillis / status.durationMillis);
        if (status.didJustFinish) {
          setIsPlaying(false);
          setProgress(1);
        }
      }
    });
  }

  async function togglePlayPause() {
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      if (progress > 0.99) {
        await sound.setPositionAsync(0);
        setProgress(0);
      }
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying, progress, setProgress, playSound, togglePlayPause }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
