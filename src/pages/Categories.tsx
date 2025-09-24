import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPosts, getCategories, type Post } from "@/lib/getPosts";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allPosts, cats] = await Promise.all([
          getPosts(),
          getCategories()
        ]);
        setPosts(allPosts);
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.categories.includes(selectedCategory))
    : posts;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-poppins font-bold text-3xl text-heading mb-4">
                {selectedCategory ? `Category: ${selectedCategory}` : "All Categories"}
              </h1>
              <p className="text-content text-muted-foreground">
                Explore our collection of articles organized by category
              </p>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={!selectedCategory ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => window.location.href = "/categories"}
                >
                  All
                </Badge>
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => window.location.href = `/categories?category=${encodeURIComponent(category)}`}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-content text-muted-foreground">
                    No posts found {selectedCategory && `in "${selectedCategory}"`}.
                  </p>
                </div>
              )}
            </div>
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

export default Categories;