import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { cities } from "../data/panels";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap({ onCityClick }) {
  const [hovered, setHovered] = useState(null);
  const mapped = cities.filter((c) => c.coordinates);

  return (
    <div className="mapContainer">
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 160, center: [0, 5] }}
        width={800}
        height={360}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
                geographies.filter((geo) => geo.id !== "010").map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#e8e8e8"
                stroke="#ffffff"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {mapped.map((city) => (
          <Marker
            key={city.id}
            coordinates={city.coordinates}
            onClick={() => onCityClick(city.id)}
            onMouseEnter={() => setHovered(city.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <circle
            r={hovered === city.id ? 9 : 6}              fill="#1a1a1a"
              stroke="#ffffff"
              strokeWidth={1.5}
              style={{ cursor: "pointer", transition: "r 150ms" }}
            />
            {hovered === city.id && (
              <text
                textAnchor="middle"
                y={-10}
                style={{ fontFamily: "var(--sans)", fontSize: "10px", fill: "#1a1a1a", pointerEvents: "none" }}
              >
                {city.name}
              </text>
            )}
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
