import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import React from "react";

const ShareButtons = ({ url, title, text }) => {
  // fallback to current page if url is not provided
  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = (platform) => {
    let link = "";

    switch (platform) {
      case "facebook":
        link = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "twitter":
        link = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(text)}`;
        break;
      case "linkedin":
        link = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          shareUrl
        )}&title=${encodeURIComponent(title)}`;
        break;
      case "native":
        if (navigator.share) {
          navigator
            .share({ title, text, url: shareUrl })
            .catch((err) => console.error("Share failed:", err));
          return;
        } else {
          alert("Sharing not supported on this browser.");
          return;
        }
    }

    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Share:</span>

      <Button
        size="sm"
        variant="outline"
        className="p-1"
        onClick={() => handleShare("facebook")}
      >
        <Facebook className="w-3 h-3" />
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="p-1"
        onClick={() => handleShare("twitter")}
      >
        <Twitter className="w-3 h-3" />
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="p-1"
        onClick={() => handleShare("linkedin")}
      >
        <Linkedin className="w-3 h-3" />
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="p-1"
        onClick={() => handleShare("native")}
      >
        <Share2 className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default ShareButtons;
