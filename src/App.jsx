import { useState } from "react";
import NavBar from "./components/NavBar";
import CityModal from "./components/CityModal";
import WorldMap from "./components/WorldMap";
import GalleryLightbox from "./components/GalleryLightbox";
import { projects, artworks, newsletter } from "./data/panels";

export default function App() {
  const [activeCity, setActiveCity] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <>
      <NavBar />


      {/* Hero */}
      {/* <header className="hero">
        <h1>Aru Kudassova</h1>
        <p>Computer Science Student & Product Enthusiast</p>
      </header> */}

      {/* About + Map */}
      <section className="section" id="about">
        <h2 className="sectionTitle">About</h2>
        <p className="sectionIntro">
          Hi! My name is Aru and I'm a Computer Science student at Minerva University who gets to build and tackle problems across the world. Click each city to learn more.
        </p>
        <WorldMap onCityClick={setActiveCity} />
      </section>

      {/* Projects */}
      <section className="section" id="projects">
        <h2 className="sectionTitle">Projects</h2>
        <div className="projectGrid">
          {projects.map((proj) => (
            <a className="projectCard" key={proj.id} href={proj.link}>
              <div
                className="projectImage"
                style={
                  proj.image
                    ? { backgroundImage: `url(${proj.image})` }
                    : { background: "linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 100%)" }
                }
              />
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Outside of Tech */}
      <section className="section" id="outside">
        <h2 className="sectionTitle">Outside of Tech</h2>

        {artworks.length === 0 && <p className="sectionMuted">A selection of my creative and community projects.</p>}

        <div className="newsletterBlock">
          <a href={newsletter.url} className="newsletterCard" target="_blank" rel="noopener noreferrer">
            <div className="newsletterText">
              <h3>Newsletter</h3>
              <p>{newsletter.label}</p>
              <span className="newsletterCta">Read on Substack →</span>
            </div>
            <div className="newsletterImage" />
          </a>
        </div>

        <div className="newsletterBlock">
          <div className="newsletterCard" onClick={() => setGalleryOpen(true)} style={{ cursor: "pointer" }}>
            <div className="newsletterText">
              <h3>Gallery</h3>
              <p>As a self-taught artist, painting and illustrating has always been a major part of my life.</p>
              <span className="newsletterCta">View my art gallery →</span>
            </div>
            <div className="newsletterImage" style={artworks[0] ? { backgroundImage: `url(${artworks[0].src})`, backgroundSize: "cover", backgroundPosition: "center" } : {}} />
          </div>
        </div>

      </section>

      {activeCity && (
        <CityModal cityId={activeCity} onClose={() => setActiveCity(null)} />
      )}
      {galleryOpen && artworks.length > 0 && (
        <GalleryLightbox artworks={artworks} onClose={() => setGalleryOpen(false)} />
      )}


      {/* Footer */}
      <footer className="footer">
        <div className="footerInner">
          <div className="footerPhoto" />
          <div className="footerBio">
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}>Thanks for stopping by!</p>
            <p></p>
            <a href="mailto:arukudass@gmail.com" className="footerLink">CONTACT ME</a>
          </div>
        </div>
      </footer>
    </>
  );
}
