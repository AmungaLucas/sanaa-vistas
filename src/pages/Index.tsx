import { useEffect, useState } from "react";
import { getPosts, getFeaturedPosts, type Post } from "@/lib/getPosts";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [allPosts, featured] = await Promise.all([
          getPosts(),
          getFeaturedPosts()
        ]);
        setPosts(allPosts);
        setFeaturedPosts(featured);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Featured Posts Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-poppins font-bold text-2xl text-heading">Featured Stories</h2>
                <span className="text-sm text-muted-foreground">Handpicked highlights</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {featuredPosts.slice(0, 2).map((post) => (
                  <PostCard key={post.id} post={post} variant="featured" />
                ))}
              </div>
            </section>

            {/* Latest Posts Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-poppins font-bold text-2xl text-heading">Latest Articles</h2>
                <span className="text-sm text-muted-foreground">Fresh perspectives</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {posts.slice(0, 6).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
