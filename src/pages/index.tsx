import { GetServerSideProps } from 'next';
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  description: string;
};

const BlogHomePage = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <Link href={`/blog/${post.id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Fetching blog posts on the server
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  const posts = data.slice(0, 20).map((post:{ id: number; title: string; body: string;}) => ({
    id: post.id,
    title: post.title,
    description: post.body.slice(0, 100) + '...',
  }));

  return {
    props: {
      posts,
    },
  };
};

export default BlogHomePage;
