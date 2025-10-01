"use client";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostBySlug } from "@/lib/getPostBySlug";
import { getPosts } from "@/lib/getPosts";
import AuthorCard from "@/components/AuthorCard";
import LoaderSkeleton from "@/components/LoaderSkeleton";
import SEO from "@/components/SEO";
import Comments from "@/components/Comments";
import PostHeader from "@/components/post/PostHeader";
import PostContent from "@/components/post/PostContent";
import PostFooter from "@/components/post/PostFooter";
import RelatedPosts from "@/components/post/RelatedPosts";

import { auth, db } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { toggleLike, toggleBookmark } from "@/lib/updatePostStats";

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

  const handleBookmark = async () => {
    if (!post?.id || !user) return alert("Please login to bookmark posts.");
    setBookmarked((prev) => !prev);
    try {
      await toggleBookmark(post.id, user.uid, bookmarked);
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
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
        <PostHeader
          title={post.title}
          categories={post.categories}
          author={post.authorName}
          date={formatDate(post.publishedAt)}
          views={post.views}
          likes={likes}
        />

        <PostContent
          featuredImage={post.featuredImage}
          title={post.title}
          excerpt={post.excerpt}
          content={post.content}
        />

        <PostFooter
          liked={liked}
          bookmarked={bookmarked}
          onLike={handleLike}
          onBookmark={handleBookmark}
          shareUrl={`${window.location.origin}/${post.slug}`}
          shareTitle={post.title}
          isAuthenticated={!!user}
        />

        <AuthorCard
          name={post.authorName}
          about={post.authorAbout}
          avatar={post.authorProfilePic}
        />

        {/* Comments Section */}
        <Comments
          postId={post.id}
          currentUser={
            user
              ? {
                  id: user.uid,
                  name: user.displayName || "Anonymous",
                  avatar: user.photoURL || "https://i.pravatar.cc/100?u=anon",
                }
              : null
          }
        />
      </article>

      <RelatedPosts posts={relatedPosts} />
    </div>
  );
};

export default PostDetail;
