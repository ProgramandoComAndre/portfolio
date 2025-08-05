import { useEffect, useState } from "react";
import HeaderSection from "../components/HeaderSection"
import PostPreview from "../components//PostPreview";
import { type Post } from "../models/Post";
import "./Home.css";
import TopVideos from "../components/ChannelPreview";

const API_KEY = import.meta.env.VITE_BLOGGER_API_KEY;
function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/blogger/v3/blogs/5336458373388012527/posts?key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const recentPosts = data.items?.slice(0, 2).map((item: any) => ({
          title: item.title,
          url: item.url,
          published: item.published,
        }));
        setPosts(recentPosts || []);
      })
      .catch((err) => console.error("Erro ao buscar posts:", err));
  }, []);

  return (
    <>
      <section id="main-section">
        <HeaderSection />
      </section>
      <PostPreview posts={posts} />
      <TopVideos/>
    </>
  );
}

export default Home;
