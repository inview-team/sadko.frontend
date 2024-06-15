import React, { useState } from 'react';
import Header from './components/Header';
import VideoList from './components/video/VideoListComponent';
import './App.css';

const App = () => {
  const [videoData, setVideoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Header setVideoData={setVideoData} setSearchQuery={setSearchQuery} />
      {searchQuery && <h2 className="h2">Результаты поиска "{searchQuery}"</h2>}
      <VideoList videoData={videoData} />
    </div>
  );
};

export default App;
