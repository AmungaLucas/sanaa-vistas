import { useEffect, useState, useMemo } from "react";
import { getPosts, getFeaturedPosts, type Post } from "@/lib/getPosts";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import AdSense from "@/components/AdSense";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  // Fetch posts + featured
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [allPosts, featured] = await Promise.all([
          getPosts(),
          getFeaturedPosts(),
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

  // Pagination logic
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const visiblePages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).filter(
      (page) =>
        page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2
    );
  }, [totalPages, currentPage]);

  // Loading skeletons
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-muted h-48 rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* SEO */}
      <Helmet>
        <title>My Blog | Home</title>
        <meta
          name="description"
          content="Read featured stories and the latest articles on My Blog."
        />
      </Helmet>

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Posts Area */}
          <div className="lg:col-span-2">
            {/* Featured Posts */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-poppins font-bold text-2xl text-heading">
                  Featured Stories
                </h2>
                <span className="text-sm text-muted-foreground">
                  Handpicked highlights
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {featuredPosts.length > 0 ? (
                  featuredPosts
                    .slice(0, 2)
                    .map((post) => (
                      <PostCard key={post.id} post={post} variant="featured" />
                    ))
                ) : (
                  <p className="text-muted-foreground">
                    No featured stories yet.
                  </p>
                )}
              </div>
            </section>

            {/* Latest Posts Section */}
            <section id="latest-articles">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-poppins font-bold text-2xl text-heading">
                  Latest Articles
                </h2>
                <span className="text-sm text-muted-foreground">
                  Fresh perspectives
                </span>
              </div>

              {posts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {posts
                      .slice(
                        (currentPage - 1) * postsPerPage,
                        currentPage * postsPerPage
                      )
                      .map((post, index) => (
                        <>
                          <PostCard key={post.id} post={post} />
                          {/* Ad after every 4th post */}
                          {index === 3 && (
                            <Card className="md:col-span-2">
                              <CardContent className="p-6">
                                <AdSense
                                  adSlot="5074357227"
                                  adFormat="horizontal"
                                  className="min-h-[100px]"
                                />
                              </CardContent>
                            </Card>
                          )}
                        </>
                      ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
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
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                              />
                            </PaginationItem>
                          )}

                          {visiblePages.map((page, index, array) => (
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
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          ))}

                          {currentPage < totalPages && (
                            <PaginationItem>
                              <PaginationNext
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(currentPage + 1);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                              />
                            </PaginationItem>
                          )}
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center text-muted-foreground py-12">
                  No posts available yet. Check back soon!
                </p>
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
