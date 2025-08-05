import { type Post } from "../models/Post";


type Props = {
  posts: Post[];
};



function PostPreview({ posts }: Props) {
  return (
    <section className="blog-preview">
      <h2>Últimas publicações:</h2>
      {posts.length === 0 ? (
        <p>Carregando publicações...</p>
      ) : (
        posts.map((post) => (
          <div key={post.url} className="blog-post">
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              <h3>{post.title}</h3>
            </a>
            {post.published && (
              <p className="post-date">
                Publicado em {new Date(post.published).toLocaleDateString("pt-PT")}
              </p>
            )}
          </div>
        ))
      )}
    </section>
  );
}

export default PostPreview;
