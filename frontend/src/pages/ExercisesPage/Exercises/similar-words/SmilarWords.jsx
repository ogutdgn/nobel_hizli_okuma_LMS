import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Button, Slider, IconButton, Box, Switch, FormControlLabel } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import useSound from 'use-sound';
import clickSound from '../../../../assets/sound/beep.mp3';
import './SimilarWords.css';

const generateWords = () => {
  const words = ["word1", "word2", "word3", "word4", "word5"];
  const shuffledWords = words.sort(() => Math.random() - 0.5);
  return shuffledWords;
};

const SimilarWords = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [duration, setDuration] = useState(60);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [words, setWords] = useState(generateWords());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [play] = useSound(clickSound);

  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  const speedLevels = [1000, 900, 600, 300, 100];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentWordIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          play();
          if (nextIndex >= words.length) {
            setWords(generateWords());
            return 0; // Immediately start the new sequence
          }
          return nextIndex;
        });
      }, speedLevels[speed - 1]);

      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      clearInterval(timerRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, play, words]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsPlaying(false);
      setTimeLeft(duration);
      setCurrentWordIndex(0);
    }
  }, [timeLeft, duration]);

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
  };

  const handleDurationChange = (event, newValue) => {
    setDuration(newValue);
    setTimeLeft(newValue);
  };

  const handleStartStop = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentWordIndex(0);
    setTimeLeft(duration);
    setWords(generateWords());
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <Container>
      <Box className="similar-words-container">
        {words.map((word, index) => (
          <Typography
            key={index}
            className={`word ${index <= currentWordIndex ? 'visible' : ''}`}
          >
            {word}
          </Typography>
        ))}
      </Box>
      <Box mt={2}>
        <Typography variant="h6">Kalan Süre: {timeLeft}s</Typography>
      </Box>
      <Box mt={2}>
        <IconButton onClick={handleStartStop} color="primary">
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton onClick={handleReset} color="secondary">
          <RefreshIcon />
        </IconButton>
        <IconButton onClick={toggleSettings} color="default">
          <SettingsIcon />
        </IconButton>
      </Box>
      {settingsOpen && (
        <Box mt={2}>
          <Typography gutterBottom>Hız Seviyesi</Typography>
          <Slider value={speed} onChange={handleSpeedChange} min={1} max={5} step={1} disabled={isPlaying} />
          <Typography gutterBottom>Süre (saniye): {duration}</Typography>
          <Slider value={duration} onChange={handleDurationChange} min={10} max={300} step={10} disabled={isPlaying} />
          <IconButton onClick={toggleSettings} color="default">
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Container>
  );
};

export default SimilarWords;
