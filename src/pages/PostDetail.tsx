import { useParams } from "react-router-dom";
import { mockPosts } from "@/data/mockPosts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye, Heart, User, Share2, Bookmark, Facebook, Twitter, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PostCard from "@/components/PostCard";
import { useState } from "react";

const PostDetail = () => {
  const { slug } = useParams();
  const post = mockPosts.find(p => p.slug === slug);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

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

  const relatedPosts = mockPosts
    .filter(p => p.id !== post.id && p.categories.some(cat => post.categories.includes(cat)))
    .slice(0, 3);

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
            
            <div className="space-y-6">
              <p>
                The contemporary art scene in Kenya is experiencing a remarkable renaissance, 
                with young artists boldly redefining what it means to be African in the 21st century. 
                From the bustling galleries of Nairobi to the intimate studios scattered across the country, 
                a new generation of creatives is emerging with fresh perspectives that honor tradition 
                while embracing innovation.
              </p>
              
              <p>
                These artists are not simply creating art for art's sake; they are weaving narratives 
                that speak to the Kenyan experience, addressing contemporary issues while drawing 
                from rich cultural heritage. Their work challenges stereotypes, questions societal norms, 
                and celebrates the complexity of modern African identity.
              </p>
              
              <p>
                What sets this movement apart is its authentic voice. Unlike previous generations 
                who often felt pressured to create for Western audiences, today's Kenyan artists 
                are confidently creating for themselves and their communities first. This shift 
                has resulted in art that is more genuine, more powerful, and more resonant with 
                both local and international audiences.
              </p>
              
              <p>
                The renaissance extends beyond individual artistic expression. Collaborative 
                spaces, artist collectives, and community-driven initiatives are flourishing, 
                creating an ecosystem that supports and nurtures creative talent at every level. 
                This collaborative spirit is essential to sustaining the momentum and ensuring 
                that Kenya's artistic renaissance continues to grow and evolve.
              </p>
            </div>
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
                src="/api/placeholder/80/80"
                alt={post.authorName}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-poppins font-semibold text-lg text-heading mb-2">
                  {post.authorName}
                </h3>
                <p className="font-lora text-content text-sm mb-3">
                  Cultural curator and writer passionate about documenting Kenya's evolving art scene. 
                  With over a decade of experience, Amina brings deep insight into the intersection 
                  of traditional and contemporary African art.
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