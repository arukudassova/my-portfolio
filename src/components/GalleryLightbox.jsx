import { useEffect } from "react";

function Caption({ art }) {
  const parts = [art.title, art.tool, art.year].filter(Boolean);
  if (!parts.length) return null;
  return <p className="galleryCaption">{parts.join(" · ")}</p>;
}

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
    <div className="galleryPage">
      <div className="galleryPageHeader">
        <button className="galleryBack" onClick={onClose}>← back</button>
        <span className="galleryPageTitle">my art</span>
      </div>

      <div className="galleryMasonry">
        {artworks.map((art, i) => (
          <div key={i} className="galleryMasonryItem" style={{ animationDelay: `${i * 60}ms` }}>
            <img src={art.src} alt={art.title || ""} />
            <Caption art={art} />
          </div>
        ))}
      </div>
    </div>
  );
}
