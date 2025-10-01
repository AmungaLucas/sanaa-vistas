"use client";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostBySlug } from "@/lib/getPostBySlug";
import { getPosts } from "@/lib/getPosts";
import PostCard from "@/components/PostCard";
import DOMPurify from "dompurify";
import ShareButtons from "@/components/ShareButtons";
import PostActions from "@/components/PostActions";
import AuthorCard from "@/components/AuthorCard";
import LoaderSkeleton from "@/components/LoaderSkeleton";
import SEO from "@/components/SEO";
import PostMeta from "@/components/PostMeta";
import PostCategories from "@/components/PostCategories";
import Comments from "@/components/Comments";

import { auth, db } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { toggleLike } from "@/lib/updatePostStats";

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [user, setUser] = useState(null);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  // Fetch post & related posts
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const [postData, allPosts] = await Promise.all([
          getPostBySlug(slug),
          getPosts(),
        ]);
        if (!postData) return;

        setPost(postData);
        setLikes(postData.likes || 0);

        const related = allPosts
          .filter(
            (p) =>
              p.id !== postData.id &&
              p.categories.some((cat) => postData.categories.includes(cat))
          )
          .slice(0, 3);
        setRelatedPosts(related);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Increment views once per user & real-time updates
  useEffect(() => {
    if (!post?.id) return;

    const viewedKey = `viewed-${post.id}`;
    if (!localStorage.getItem(viewedKey)) {
      const incrementViews = async () => {
        try {
          const postRef = doc(db, "posts", post.id);
          await updateDoc(postRef, { views: increment(1) });
        } catch (err) {
          console.error("Error incrementing views:", err);
        }
      };
      incrementViews();
      localStorage.setItem(viewedKey, "true");
    }

    const postRef = doc(db, "posts", post.id);
    const unsubscribe = onSnapshot(postRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPost((prev) => (prev ? { ...prev, views: data?.views || 0 } : prev));
      }
    });

    return () => unsubscribe();
  }, [post?.id]);

  if (loading) return <LoaderSkeleton />;

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="font-poppins font-bold text-2xl text-heading mb-4">
          Post Not Found
        </h1>
        <p className="font-lora text-sm text-muted-foreground">
          The article you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleLike = async () => {
    if (!post?.id || !user) return alert("Please login to like posts.");
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    try {
      await toggleLike(post.id, user.uid, liked);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleBookmark = () => {
    if (!user) return alert("Please login to bookmark posts.");
    setBookmarked((prev) => !prev);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        keywords={post.seoKeywords || post.tags?.join(", ")}
        url={`${window.location.origin}/${post.slug}`}
        image={post.featuredImage}
      />

      <article className="max-w-4xl mx-auto">
        {/* Categories + Title */}
        <div className="mb-8">
          <PostCategories categories={post.categories} />
          <h1 className="font-poppins font-bold text-2xl md:text-3xl leading-snug mb-4 text-heading">
            {post.title}
          </h1>
          <PostMeta
            author={post.authorName}
            date={formatDate(post.publishedAt)}
            views={post.views}
            likes={likes}
          />
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-6">
            <img
              src={post.featuredImage}
              alt={post.title}
              loading="eager"
              className="w-full h-56 md:h-80 object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose max-w-none mb-6 font-lora text-base leading-relaxed text-content">
          <p className="text-base font-medium mb-4 text-muted-foreground">
            {post.excerpt}
          </p>
          <div
            className="space-y-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-t border-border">
          <PostActions
            initialLiked={liked}
            initialBookmarked={bookmarked}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
          <ShareButtons
            url={`${window.location.origin}/${post.slug}`}
            title={post.title}
            text={`Check out this article: ${post.title}`}
          />
        </div>

        {/* Author */}
        <AuthorCard
          name={post.authorName}
          about={post.authorAbout}
          avatar={post.authorProfilePic}
        />

        {/* Comments */}
        {user ? (
          <Comments
            postId={post.id}
            currentUser={{
              id: user.uid,
              name: user.displayName || "Anonymous",
              avatar: user.photoURL || "https://i.pravatar.cc/100?u=anon",
            }}
          />
        ) : (
          <p className="text-sm text-muted-foreground mt-6">
            Please{" "}
            <a href="/login" className="text-primary font-medium">
              login
            </a>{" "}
            to write a comment.
          </p>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-10">
          <h2 className="font-poppins font-bold text-lg text-heading mb-6">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
