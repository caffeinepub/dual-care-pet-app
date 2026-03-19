import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import type { GalleryPost } from "../context/AppContext";

function formatTime(ts: number) {
  const d = new Date(ts);
  const h = d.getHours() % 12 || 12;
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";
  return `${h}:${m} ${ampm}`;
}

export function GalleryScreen() {
  const { galleryPosts, toggleLike, addComment, setShowAddPost } =
    useAppContext();
  const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleSendComment = () => {
    if (!selectedPost || !commentText.trim()) return;
    addComment(selectedPost.id, commentText.trim());
    setCommentText("");
  };

  const openPost = (post: GalleryPost) => {
    setSelectedPost(post);
    setShowComments(false);
  };

  const currentPost = selectedPost
    ? (galleryPosts.find((p) => p.id === selectedPost.id) ?? selectedPost)
    : null;

  return (
    <div className="tab-screen">
      <div className="flex items-center justify-between px-4 pt-10 pb-3">
        <h1 className="font-poppins font-bold text-2xl text-foreground">
          Gallery 📸
        </h1>
        <button
          type="button"
          onClick={() => setShowAddPost(true)}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-xl text-sm font-semibold"
          data-ocid="gallery.upload_button"
        >
          + Upload
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1 px-1 pb-6">
        {galleryPosts.map((post, i) => (
          <button
            key={post.id}
            type="button"
            onClick={() => openPost(post)}
            className="aspect-square overflow-hidden rounded-lg relative"
            data-ocid={`gallery.item.${i + 1}`}
          >
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute bottom-1 right-1 bg-black/50 rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
              <span className="text-white text-xs">❤️</span>
              <span className="text-white text-xs">{post.likes}</span>
            </div>
          </button>
        ))}
      </div>

      {currentPost && !showComments && (
        <div
          className="modal-overlay center"
          onClick={() => setSelectedPost(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedPost(null)}
          data-ocid="gallery.modal"
        >
          <div
            className="w-full max-w-[430px] bg-card rounded-t-3xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <img
              src={currentPost.imageUrl}
              alt={currentPost.caption}
              className="w-full aspect-square object-cover"
            />
            <div className="p-4">
              <p className="text-foreground font-medium mb-3">
                {currentPost.caption}
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => toggleLike(currentPost.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    currentPost.likedInSession
                      ? "bg-red-100 text-red-500"
                      : "bg-muted text-muted-foreground"
                  }`}
                  data-ocid="gallery.like_button"
                >
                  <span>{currentPost.likedInSession ? "❤️" : "🤍"}</span>
                  <span>{currentPost.likes}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowComments(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm font-semibold"
                  data-ocid="gallery.comments_button"
                >
                  💬 {currentPost.comments.length}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="ml-auto px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm"
                  data-ocid="gallery.close_button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPost && showComments && (
        <div
          className="modal-overlay"
          onClick={() => setShowComments(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowComments(false)}
          data-ocid="gallery.comments_modal"
        >
          <div
            className="w-full max-w-[430px] bg-card rounded-t-3xl max-h-[70dvh] flex flex-col animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-poppins font-semibold text-foreground">
                Comments 💬
              </h3>
              <button
                type="button"
                onClick={() => setShowComments(false)}
                className="text-muted-foreground"
                data-ocid="gallery.comments.close_button"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {currentPost.comments.length === 0 ? (
                <p
                  className="text-center text-muted-foreground text-sm py-6"
                  data-ocid="gallery.comments.empty_state"
                >
                  No comments yet. Be the first! 🐾
                </p>
              ) : (
                currentPost.comments.map((c, i) => (
                  <div
                    key={c.id}
                    className="bg-muted rounded-xl p-3"
                    data-ocid={`gallery.comment.item.${i + 1}`}
                  >
                    <p className="text-sm text-foreground">{c.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(c.timestamp)}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t border-border flex gap-2">
              <input
                className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
                data-ocid="gallery.comment_input"
              />
              <button
                type="button"
                onClick={handleSendComment}
                className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold"
                data-ocid="gallery.comment_submit_button"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
