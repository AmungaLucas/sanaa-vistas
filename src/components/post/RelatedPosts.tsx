import PostCard from "@/components/PostCard";
import { Post } from "@/lib/getPosts";

interface RelatedPostsProps {
  posts: Post[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="font-poppins font-bold text-lg text-heading mb-6">
        Related Articles
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
