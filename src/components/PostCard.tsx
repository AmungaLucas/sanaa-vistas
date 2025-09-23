import { Clock, Eye, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/lib/getPosts";

interface PostCardProps {
  post: Post;
  variant?: "default" | "featured" | "compact";
}

const PostCard = ({ post, variant = "default" }: PostCardProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (variant === "compact") {
    return (
      <Link to={`/post/${post.slug}`} className="group">
        <article className="flex gap-4 p-4 border-b border-border hover:bg-muted/30 transition-colors">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="font-poppins font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <Eye className="w-3 h-3" />
              <span>{post.views}</span>
              <Heart className="w-3 h-3 ml-2" />
              <span>{post.likes}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <article className="post-card">
        <div className="relative">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-64 object-cover"
          />
          {post.sponsored && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
              Sponsored
            </Badge>
          )}
          {post.featured && (
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
          <h2 className="font-poppins font-bold text-2xl mb-3 line-clamp-2 hover:text-primary transition-colors">
            <Link to={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
          <p className="text-content text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-poppins">{post.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/post/${post.slug}`}>
                Read More
              </Link>
            </Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="post-card">
      <div className="relative">
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        {post.sponsored && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs">
            Sponsored
          </Badge>
        )}
        {post.featured && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs">
            Featured
          </Badge>
        )}
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-3">
          {post.categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        <h3 className="font-poppins font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link to={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-content text-muted-foreground text-sm mb-3 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3" />
            <span className="font-poppins">{post.authorName}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;