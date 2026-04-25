import { useState, useEffect } from "react";

const photos = [
  { src: "/globe/taipei.jpg", alt: "Taipei, Taiwan" },
  { src: "/globe/sandiego.jpg", alt: "San Diego, USA" },
  { src: "/globe/aconcagua.jpg", alt: "Mendoza, Argentina" },
  { src: "/globe/lakeisland.jpg", alt: "Lake Island" },
  { src: "/globe/rio.jpg", alt: "Rio de Janeiro, Brazil" },
  { src: "/globe/incas.jpg", alt: "Inca Trail" },
];

const GROUP_SIZE = 3;
const groups = [];
for (let i = 0; i < photos.length; i += GROUP_SIZE) {
  groups.push(photos.slice(i, i + GROUP_SIZE));
}

// order: middle (1) → left (0) → right (2), uniform 1.4s gap
const delays = ["1.4s", "0s", "2.8s"];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null);

  useEffect(() => {
    if (groups.length <= 1) return;
    const timer = setInterval(() => {
      const nextIdx = (current + 1) % groups.length;
      setNext(nextIdx);
      // after crossfade completes, promote next to current
      setTimeout(() => {
        setCurrent(nextIdx);
        setNext(null);
      // last photo finishes at 2.8s delay + 1.4s fade = 4.2s
      }, 4400);
    }, 5500);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="heroPhotoRow">
      {groups[current].map((photo, i) => (
        <div key={i} className="heroPhotoSlot">
          {/* current group — stays visible underneath */}
          <img src={photo.src} alt={photo.alt} className="heroPhotoImg heroPhotoCurrent" />
          {/* next group — fades in on top */}
          {next !== null && (
            <img
              src={groups[next][i].src}
              alt={groups[next][i].alt}
              className="heroPhotoImg heroPhotoNext"
              style={{ animationDelay: delays[i] }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
