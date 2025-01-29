// pages/blog/[id].tsx
import { GetServerSideProps } from 'next';

type Post = {
  id: number;
  title: string;
  body: string;
};

const BlogPostPage = ({ post }: { post: Post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

// Fetching a single blog post based on the dynamic ID
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!; // Dynamic route parameter
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    return {
      notFound: true, // Show 404 if post not found
    };
  }

  const data = await res.json();

  return {
    props: {
      post: data,
    },
  };
};

export default BlogPostPage;
