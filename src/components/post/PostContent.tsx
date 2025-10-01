import DOMPurify from "dompurify";

interface PostContentProps {
  featuredImage?: string;
  title: string;
  excerpt: string;
  content: string;
}

const PostContent = ({
  featuredImage,
  title,
  excerpt,
  content,
}: PostContentProps) => {
  return (
    <>
      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-6">
          <img
            src={featuredImage}
            alt={title}
            loading="eager"
            className="w-full h-56 md:h-80 object-cover rounded-xl shadow-md"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose max-w-none mb-6 font-lora text-base leading-relaxed text-content">
        <p className="text-base font-medium mb-4 text-muted-foreground">
          {excerpt}
        </p>
        <div
          className="space-y-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
        />
      </div>
    </>
  );
};

export default PostContent;
