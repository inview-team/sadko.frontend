import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import '../../styles/VideoComponent.css';

const VideoComponent = ({ videoData }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  // Проверка, что videoData не undefined и имеет правильную структуру
  const { url, descriptions } = videoData || {};
  const validDescriptions = Array.isArray(descriptions) ? descriptions : [];

  // Обработчик клика по видео
  const handleVideoClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  // Переключение звука
  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    videoRef.current.muted = !videoRef.current.muted;
  };

  return (
    <div className="video-container" onClick={handleVideoClick}>
      <div className="top-info">
        <div className="music"></div>
      </div>
      <video
        ref={videoRef}
        src={url}
        className="video"
        loop
        muted={isMuted}
        playsInline
      />
      <div className="video-info">
        <div className="views">
          <FontAwesomeIcon icon={faThumbsUp} />
        </div>
        <div className="tags">
          Описание: {validDescriptions.map((description, index) => (
            <span key={index}>{description}</span>
          ))}
        </div>
      </div>
      <button className="mute-button" onClick={toggleMute}>
        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
      </button>
    </div>
  );
};

export default VideoComponent;
