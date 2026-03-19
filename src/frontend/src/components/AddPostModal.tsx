import { useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";

export function AddPostModal() {
  const { setShowAddPost, addGalleryPost, setActiveTab } = useAppContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!imagePreview) return;
    addGalleryPost({
      imageUrl: imagePreview,
      caption: caption.trim() || "My pet 🐾",
    });
    setShowAddPost(false);
    setActiveTab("gallery");
  };

  return (
    <div
      className="modal-overlay"
      data-ocid="add_post.modal"
      onClick={() => setShowAddPost(false)}
      onKeyDown={(e) => e.key === "Escape" && setShowAddPost(false)}
    >
      <div
        className="w-full max-w-[430px] bg-card rounded-t-3xl p-5 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-poppins font-bold text-xl text-foreground">
            New Post 📸
          </h2>
          <button
            type="button"
            onClick={() => setShowAddPost(false)}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
            data-ocid="add_post.close_button"
          >
            ✕
          </button>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-52 rounded-2xl border-2 border-dashed border-border bg-muted flex flex-col items-center justify-center gap-3 mb-4 hover:border-primary transition-colors overflow-hidden"
          data-ocid="add_post.dropzone"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <span className="text-4xl">🐾</span>
              <span className="text-sm text-muted-foreground font-medium">
                Tap to select a photo
              </span>
            </>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          data-ocid="add_post.upload_button"
        />

        <textarea
          placeholder="Write a caption... 🐶🐱"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary mb-4"
          data-ocid="add_post.caption_textarea"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowAddPost(false)}
            className="flex-1 py-3 rounded-xl bg-muted text-muted-foreground font-semibold text-sm"
            data-ocid="add_post.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!imagePreview}
            className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-50 transition-opacity"
            data-ocid="add_post.submit_button"
          >
            Share Post 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
