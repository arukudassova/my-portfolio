import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import HeroSlideshow from "./components/HeroSlideshow";
import CityModal from "./components/CityModal";
import GalleryLightbox from "./components/GalleryLightbox";
import { projects, artworks, newsletter, education, experience } from "./data/panels";

export default function App() {
  const [activeCity, setActiveCity] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll(".fadeUp");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <NavBar />

      {/* Intro quote */}
      <p className="introQuote">exploring <strong style={{fontWeight: 600}}>people and the planet</strong> through research, art, and community work across global contexts</p>

      {/* Hero Slideshow */}
      <HeroSlideshow />
      <p className="photoCredit">Original photos by Aru</p>

      {/* Profile */}
      <section className="profileSection fadeUp" id="about">
        <h1 className="profileName">Aru Kudassova</h1>
        <div className="profilePhoto" />
        <div className="profileBioBox">
          <p>Hello! I'm an Environmental Science and Computer Science undergraduate at Minerva University. Minerva's global rotation model has allowed me to gain hands-on industry experience early in my academic career – collaborating with teams in energy research, urban infrastructure, and climate resilience across the U.S., East Asia, and Latin America, applying data and digital tools to real environmental systems.</p>
          <p>As I explore the world, I'm also exploring more about myself – which I love to express through my creative work: newsletter, art, and more.</p>
          <p>See a snapshot of my highlighted experiences below!</p>
        </div>
      </section>

      {/* Education */}
      <section className="magSection fadeUp" id="education">
        <div className="magSectionInner">
          <h2 className="magSectionTitle">education</h2>
          <div className="magDivider" />
          {education.map((e, i) => (
            <div className="eduBlock" key={i}>
              <p className="eduSchool">{e.school}</p>
              {e.location && <p className="eduNote">{e.location}</p>}
              <p className="eduDegree">{e.degree}</p>
            </div>
          ))}
          <div className="eduRow">
            <div className="eduLeft">
              {education.map((e, i) => (
                e.note && <div className="eduActivities" key={i}>{e.note.split("\n").map((line, j) => <p key={j}>{line}</p>)}</div>
              ))}
            </div>
            <a href={newsletter.url} className="outsideCard eduNewsletterCard" target="_blank" rel="noopener noreferrer">
              <div className="outsideCardImage" style={{ background: "url('/substack.png') center / 55% no-repeat #f5f5f5" }} />
              <div className="outsideCardText">
                <h3>Tellus Mater</h3>
                <p>Minerva's sustainability newsletter</p>
                <span className="outsideCta">Read on Substack →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Highlighted Experience */}
      <section className="magSection fadeUp" id="experience">
        <div className="magSectionInner">
          <h2 className="magSectionTitle">highlighted experience</h2>
          <div className="magDivider" />
          <div className="expBox">
            {experience.map((ex, i) => (
              <div className="expBlock" key={i}>
                <p className="expTitle">{ex.org}</p>
                <p className="expOrg">{ex.title}</p>
                <p className="expPeriod">{ex.period}</p>
                {ex.description && <p className="expDesc">{ex.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Art Gallery Strip */}
      {artworks.length > 0 && (
        <section className="galleryStrip" id="gallery" onClick={() => setGalleryOpen(true)}>
          {[...artworks, ...artworks].map((art, i) => (
            <div
              key={i}
              className="galleryStripItem"
              style={{ backgroundImage: `url(${art.src})` }}
            />
          ))}
          <div className="galleryStripOverlay">
            <span>view my art gallery →</span>
          </div>
        </section>
      )}

      {activeCity && (
        <CityModal cityId={activeCity} onClose={() => setActiveCity(null)} />
      )}
      {galleryOpen && artworks.length > 0 && (
        <GalleryLightbox artworks={artworks} onClose={() => setGalleryOpen(false)} />
      )}

      <footer className="footer">
        <div className="footerInner">
          <div className="footerBio">
            <p style={{ fontFamily: "var(--heading)", fontStyle: "italic", fontSize: "24px" }}>Thank You for stopping by!</p>
            <a href="mailto:arukudass@gmail.com" className="footerLink">CONTACT ME</a>
          </div>
        </div>
      </footer>
    </>
  );
}
