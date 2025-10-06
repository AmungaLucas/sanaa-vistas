import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { getTrendingPosts, getCategories, type Post } from "@/lib/getPosts";
import { categories as fallbackCategories } from "@/data/mockPosts";
import PostCard from "./PostCard";
import SubscribeForm from "./SubscribeForm";
import AdSense from "./AdSense";

const Sidebar = () => {
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>(fallbackCategories);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trending, cats] = await Promise.all([
          getTrendingPosts(),
          getCategories(),
        ]);
        setTrendingPosts(trending);

        // Use Firebase categories if available, otherwise keep fallback
        if (cats.length > 0) {
          setCategories(cats);
        }
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <aside className="space-y-6">
      {/* Categories */}
      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="text-heading text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() =>
                  (window.location.href = `/categories?category=${encodeURIComponent(
                    category
                  )}`)
                }
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Google Ads - Sidebar Top */}
      <Card className="feature-card">
        <CardContent className="p-6">
          <AdSense
            adSlot="5074357227"
            adFormat="auto"
            className="min-h-[250px]"
          />
        </CardContent>
      </Card>

      {/* Trending Posts */}
      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="text-heading text-lg">Trending Posts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {trendingPosts.map((post) => (
              <PostCard key={post.id} post={post} variant="compact" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Author Bio */}
      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="text-heading text-lg">
            About the Author
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/sharon.webp"
              alt="Author Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-poppins font-semibold">Sharon Agigi</h3>
              <p className="text-sm text-muted-foreground">Writer and author</p>
            </div>
          </div>
          <p className="text-content text-sm text-muted-foreground mb-4">
            Sharon is a writer and editor with a deep love for art and
            creativity in all its forms. Drawn to the culturally rich and the
            artistically unique, she finds inspiration in the stories,
            expressions, and innovations that shape the creative world. Her
            passion fuels not just her work, but her everyday life, as she seeks
            to spark the same appreciation for art and culture in others.
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="p-2">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="p-2">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="p-2">
              <Instagram className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="p-2">
              <Youtube className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <SubscribeForm />

      {/* Google Ads - Sidebar Bottom */}
      <Card className="feature-card">
        <CardContent className="p-6">
          <AdSense
            adSlot="5074357227"
            adFormat="auto"
            className="min-h-[200px]"
          />
        </CardContent>
      </Card>
    </aside>
  );
};

export default Sidebar;
