import { useEffect } from "react";

export default function GalleryLightbox({ artworks, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="lightboxBackdrop" onClick={onClose}>
      <button className="lightboxClose" onClick={onClose}>×</button>
      <div className="lightboxGrid" onClick={(e) => e.stopPropagation()}>
        {artworks.map((art, i) => (
          <div key={i} className="lightboxThumb">
            <img src={art.src} alt={art.title || ""} />
          </div>
        ))}
      </div>
    </div>
  );
}
