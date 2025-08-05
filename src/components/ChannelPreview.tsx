import { useEffect, useState } from "react";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
};

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

function TopVideos() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        // 1. Buscar os uploads
        const res1 = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        const data1 = await res1.json();
        const uploadsPlaylistId = data1.items[0].contentDetails.relatedPlaylists.uploads;

        // 2. Buscar vídeos da playlist de uploads
        const res2 = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=${uploadsPlaylistId}&key=${API_KEY}`
        );
        const data2 = await res2.json();
        const videoIds = data2.items.map((item: any) => item.snippet.resourceId.videoId).join(",");

        // 3. Buscar estatísticas dos vídeos
        const res3 = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${API_KEY}`
        );
        const data3 = await res3.json();

        const videoData: Video[] = data3.items.map((item: any) => ({
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          views: parseInt(item.statistics.viewCount),
        }));

        // 4. Ordenar por visualizações
        const top3 = videoData.sort((a, b) => b.views - a.views).slice(0, 3);

        setVideos(top3);
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <section className="top-videos">
      <h2>Top 3 vídeos do YouTube</h2>
      <div className="videos-grid">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="video-card"
          >
            <img src={video.thumbnail} alt={video.title} />
            <h4>{video.title}</h4>
            <p>{video.views.toLocaleString()} visualizações</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export default TopVideos;
