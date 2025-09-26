import { useEffect, useState } from "react";
import { getPosts, getFeaturedPosts, type Post } from "@/lib/getPosts";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

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
            <section id="latest-articles">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-poppins font-bold text-2xl text-heading">Latest Articles</h2>
                <span className="text-sm text-muted-foreground">Fresh perspectives</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {posts
                  .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
                  .map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
              </div>

              {/* Pagination */}
              {posts.length > postsPerPage && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(currentPage - 1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          />
                        </PaginationItem>
                      )}
                      
                      {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => i + 1)
                        .filter(page => 
                          page === 1 || 
                          page === Math.ceil(posts.length / postsPerPage) || 
                          Math.abs(page - currentPage) <= 2
                        )
                        .map((page, index, array) => (
                          <PaginationItem key={page}>
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="px-2">...</span>
                            )}
                            <PaginationLink
                              href="#"
                              isActive={currentPage === page}
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                      
                      {currentPage < Math.ceil(posts.length / postsPerPage) && (
                        <PaginationItem>
                          <PaginationNext 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(currentPage + 1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
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
