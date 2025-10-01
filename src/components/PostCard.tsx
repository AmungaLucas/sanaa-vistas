import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/lib/getPosts";
import PostMeta from "@/components/PostMeta";
import PostCategories from "@/components/PostCategories";

interface PostCardProps {
  post: Post;
  variant?: "default" | "featured" | "compact";
}

const PostCard = ({ post, variant = "default" }: PostCardProps) => {
  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // 🔹 Compact variant
  if (variant === "compact") {
    return (
      <Link to={`/${post.slug}`} className="group">
        <article className="flex gap-4 p-4 border-b border-border hover:bg-muted/30 transition-colors">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="font-poppins font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <PostMeta
              author={post.authorName}
              date={formatDate(post.publishedAt)}
              views={post.views}
              likes={post.likes}
            />
          </div>
        </article>
      </Link>
    );
  }

  // 🔹 Featured variant
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
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-[10px] sm:text-xs">
              Sponsored
            </Badge>
          )}
          {post.featured && (
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] sm:text-xs">
              Featured
            </Badge>
          )}
        </div>

        <div className="p-6">
          <PostCategories categories={post.categories} />

          <h2 className="font-poppins font-bold text-xl md:text-2xl mb-3 line-clamp-2 hover:text-primary transition-colors">
            <Link to={`/${post.slug}`}>{post.title}</Link>
          </h2>

          <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <PostMeta
            author={post.authorName}
            date={formatDate(post.publishedAt)}
            views={post.views}
            likes={post.likes}
          />

          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/${post.slug}`}>Read More</Link>
            </Button>
          </div>
        </div>
      </article>
    );
  }

  // 🔹 Default variant
  return (
    <article
      className="post-card"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <meta
        itemProp="mainEntityOfPage"
        content={`https://sanaathrumylens.co.ke/${post.slug}`}
      />
      <meta
        itemProp="datePublished"
        content={new Date(post.publishedAt).toISOString()}
      />
      <meta
        itemProp="dateModified"
        content={new Date(post.updatedAt || post.publishedAt).toISOString()}
      />
      <meta itemProp="headline" content={post.title} />
      <meta itemProp="description" content={post.excerpt} />
      <meta itemProp="image" content={post.featuredImage} />

      <div className="relative">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4">
        <PostCategories categories={post.categories.slice(0, 2)} />

        <h3
          className="font-poppins font-semibold text-base md:text-lg mb-2 line-clamp-2 hover:text-primary transition-colors"
          itemProp="headline"
        >
          <Link to={`/${post.slug}`} itemProp="url">
            {post.title}
          </Link>
        </h3>

        <p
          className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2"
          itemProp="description"
        >
          {post.excerpt}
        </p>

        <PostMeta
          author={post.authorName}
          date={formatDate(post.publishedAt)}
          views={post.views}
          likes={post.likes}
        />
      </div>
    </article>
  );
};

export default PostCard;
