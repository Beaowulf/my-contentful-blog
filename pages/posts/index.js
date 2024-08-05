// pages/index.js

import Link from "next/link";
import { getAllPosts } from "../../lib/contentful";

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

const Home = ({ posts }) => {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.sys.id}>
            <Link href={`/posts/${post.fields.slug}`}>
              <a>{post.fields.blogTitle}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
