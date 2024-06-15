import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoComponent from './VideoComponent';
import '../../styles/ScrollComponent.css';

const VideoList = ({ videoData }) => {
	const [videos, setVideos] = useState([]);
	const [hasMore, setHasMore] = useState(true); // еще видео для загрузки
	const [page, setPage] = useState(1); // Текущая страница
	const [loading, setLoading] = useState(false); // управление загрузкой
	const videosPerPage = 8;

	useEffect(() => {
		// Сбрасываем состояния при изменении videoData
		setVideos([]);
		setPage(1);
		setHasMore(true);
	}, [videoData]);

	useEffect(() => {
		const fetchVideos = () => {
			console.log('Video data:', videoData);
			setLoading(true);

			// Проверяем, что videoData определена и это массив
			if (!Array.isArray(videoData)) {
				console.error('videoData is not an array:', videoData);
				setHasMore(false); // Устанавливаем, что больше нет видео для загрузки
				setLoading(false); // Останавливаем состояние загрузки
				return; // Прекращаем выполнение функции
			}

			const startIndex = (page - 1) * videosPerPage;
			const endIndex = startIndex + videosPerPage;
			const videosForPage = videoData.slice(startIndex, endIndex);
			console.log('Videos for page:', videosForPage);

			if (videosForPage.length === 0) {
				setHasMore(false);
			} else {
				setVideos(prevVideos => [...prevVideos, ...videosForPage]);
			}
			setLoading(false);
		};

		fetchVideos();
	}, [page, videoData]);

	return (
		<div className="infinite-video-list">
			<InfiniteScroll
				dataLength={videos.length}
				next={() => setPage(page + 1)}
				hasMore={hasMore}
				loader={loading && <h4>Loading...</h4>}
				endMessage={!hasMore && <p>Видео больше нет, попробуйте другой запрос</p>}
				className="infinite-scroll-component"
			>
				<div className="video-grid">
					{videos.map((video, index) => (
						<VideoComponent key={index} videoData={video} />
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
};

export default VideoList;
