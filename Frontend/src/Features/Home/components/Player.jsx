import React, { useContext, useRef, useState, useEffect } from 'react';

import {useSong} from '../hooks/use.song'
import './Player.scss';

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = playbackRate;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [playbackRate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [song.songurl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  };

  const forward5 = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
    }
  };

  const backward5 = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 5, 0);
    }
  };

  const changeSpeed = (e) => {
    const rate = parseFloat(e.target.value);
    setPlaybackRate(rate);
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = rate;
    }
  };

  return (
    <div className="player">
      <img src={song.posterUrl} alt={song.title} />
      <h3>{song.title}</h3>
      <audio ref={audioRef} src={song.songurl} preload="metadata" />
      <div className="controls">
        <button onClick={backward5}>⏪ -5s</button>
        <button className="play-pause" onClick={togglePlay}>
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button onClick={forward5}>+5s ⏩</button>
      </div>
      <div className="speed-control">
        <label>Speed:</label>
        <select value={playbackRate} onChange={changeSpeed}>
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1">1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
  );
};

export default Player;
