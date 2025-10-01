import PostCategories from "@/components/PostCategories";
import PostMeta from "@/components/PostMeta";

interface PostHeaderProps {
  title: string;
  categories: string[];
  author: string;
  date: string;
  views: number;
  likes: number;
}

const PostHeader = ({
  title,
  categories,
  author,
  date,
  views,
  likes,
}: PostHeaderProps) => {
  return (
    <div className="mb-8">
      <PostCategories categories={categories} />
      <h1 className="font-poppins font-bold text-2xl md:text-3xl leading-snug mb-4 text-heading">
        {title}
      </h1>
      <PostMeta author={author} date={date} views={views} likes={likes} />
    </div>
  );
};

export default PostHeader;
