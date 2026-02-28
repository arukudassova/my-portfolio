import { useEffect } from "react";
import { cities } from "../data/panels";

export default function CityModal({ cityId, onClose }) {
  const city = cities.find((c) => c.id === cityId);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!city) return null;

  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose}>×</button>
        <h2 className="modalTitle">{city.name}</h2>
        {city.country && <p className="modalSubtitle">{city.country}{city.timeline ? ` · ${city.timeline}` : ""}</p>}
        
        <div className="modalBodyRow">
          <p className="modalBody">{city.description}</p>
          {city.photo && <img src={city.photo} alt={city.name} className="modalPhoto" />}
        </div>
              
        {city.press?.length > 0 && (
          <div className="modalPress">
            <p className="modalPressLabel">Featured in:</p>
            {city.press.map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="modalPressCard">
                <div className="modalPressText">
                  <h3>{item.source}</h3>
                  <p>{item.title}</p>
                  <span className="modalPressCta">Read on {item.source} →</span>
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
