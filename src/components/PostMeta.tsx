import { User, Clock, Eye, Heart } from "lucide-react";

const PostMeta = ({ author, date, views, likes }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted-foreground">
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <User className="w-3 h-3" />
        <span>{author}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        <span>{date}</span>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <Eye className="w-3 h-3" />
        <span>{views} views</span>
      </div>
      <div className="flex items-center gap-1">
        <Heart className="w-3 h-3" />
        <span>{likes} likes</span>
      </div>
    </div>
  </div>
);

export default PostMeta;
