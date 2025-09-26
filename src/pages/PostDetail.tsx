import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostBySlug } from "@/lib/getPostBySlug";
import { getPosts, type Post } from "@/lib/getPosts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye, Heart, User, Share2, Bookmark, Facebook, Twitter, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PostCard from "@/components/PostCard";
const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        const [postData, allPosts] = await Promise.all([
          getPostBySlug(slug),
          getPosts()
        ]);
        
        setPost(postData);
        
        if (postData) {
          const related = allPosts
            .filter(p => p.id !== postData.id && p.categories.some(cat => postData.categories.includes(cat)))
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-64 bg-muted rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="font-poppins font-bold text-3xl text-heading mb-4">Post Not Found</h1>
          <p className="font-lora text-muted-foreground">The article you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }


  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          
          <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 text-heading">
            {post.title}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-poppins font-medium">{post.authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{post.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>{post.likes} likes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img 
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-warm"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div className="font-lora text-lg leading-relaxed text-content">
            <p className="text-xl font-medium mb-6 text-muted-foreground">
              {post.excerpt}
            </p>
            
            <div 
              className="space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>

        {/* Article Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-border">
          <div className="flex items-center gap-2">
            <Button
              variant={liked ? "default" : "outline"}
              size="sm"
              onClick={() => setLiked(!liked)}
              className={liked ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <Heart className="w-4 h-4 mr-2" />
              {liked ? "Liked" : "Like"}
            </Button>
            
            <Button
              variant={bookmarked ? "default" : "outline"}
              size="sm"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark className="w-4 h-4 mr-2" />
              {bookmarked ? "Saved" : "Save"}
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-poppins text-sm text-muted-foreground mr-2">Share:</span>
            <Button size="sm" variant="outline" className="p-2">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="p-2">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="p-2">
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="p-2">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Author Bio */}
        <Card className="feature-card my-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <img 
                src={post.authorProfilePic || "/api/placeholder/80/80"}
                alt={post.authorName}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-poppins font-semibold text-lg text-heading mb-2">
                  {post.authorName}
                </h3>
                <p className="font-lora text-content text-sm mb-3">
                  {post.authorAbout || "Passionate writer and cultural curator documenting Kenya's vibrant creative scene."}
                </p>
                <Button variant="outline" size="sm">
                  Follow Author
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-poppins font-bold text-2xl text-heading mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PostDetail;