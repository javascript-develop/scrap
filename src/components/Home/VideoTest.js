// Vidotest.js

import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const Vidotest = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className='container'>
      <h1>Video Test Page</h1>

      <input
        type="text"
        placeholder="Enter YouTube video URL"
        value={videoUrl}
        onChange={handleInputChange}
      />

      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>

      <div className='player-wrapper'>
        <ReactPlayer
          url={videoUrl}
          playing={isPlaying}
          controls
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};

export default Vidotest;
