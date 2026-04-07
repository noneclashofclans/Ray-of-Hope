import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import newLogo from "../assets/newLogo.png";
import vid3 from "../assets/vid3.mp4";
import pres from "../assets/pres.png";
import newBhai from "../assets/newBhai.png";

const About = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div className="ab-root">
      {/* VIDEO BACKGROUND */}
      <div className="ab-video-bg">
        <video autoPlay muted loop playsInline className="ab-video">
          <source src={vid3} type="video/mp4" />
        </video>
        <div className="ab-video-overlay" />
      </div>

      {/* NAV */}
      <nav className="ab-nav">
        <Link className="ab-brand" to="/">
          <img src={newLogo} alt="Logo" width="28" height="28" className="ab-logo-img" />
          <span>Ray of <span className="ab-accent">Hope</span></span>
        </Link>

        <button className="ab-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <i className={`bi ${menuOpen ? "bi-x" : "bi-list"}`} />
        </button>

        <div className={`ab-nav-links ${menuOpen ? "ab-nav-open" : ""}`}>
          <Link className="ab-nav-link" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link className="ab-nav-link ab-nav-active" to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link className="ab-nav-link" to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          {user ? (
            <Link className="ab-btn-nav" to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          ) : (
            <Link className="ab-btn-nav" to="/login" onClick={() => setMenuOpen(false)}>Join us</Link>
          )}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="ab-main">

        {/* HERO */}
        <div className="ab-hero">
          <p className="ab-eyebrow">Who we are</p>
          <h1 className="ab-hero-title">Our <span className="ab-accent">Story</span></h1>
          <p className="ab-hero-sub">
            Founded in Cuttack, Ray of Hope is a dedicated collective working to bridge the gap between resource abundance and those in desperate need across Odisha.
          </p>
        </div>

        {/* PRESIDENT CARD */}
        <div className="ab-card-wrap">
          <div className="ab-person-card">
            <div className="ab-person-img-col">
              <div className="ab-person-img-frame">
                <img src={pres} alt="Kumar Pradipta Mishra" className="ab-person-img" />
              </div>
            </div>
            <div className="ab-person-content">
              <p className="ab-card-eyebrow">Message from the President</p>
              <h2 className="ab-card-quote">"Service to humanity is service to God"</h2>
              <p className="ab-card-body">
                "I started Ray of Hope with a simple belief: no one in our city should go hungry or lose a loved one due to a shortage of blood. What started as a small group of friends has now grown into a community of hundreds, all bound by the same thread of empathy."
              </p>
              <div className="ab-card-divider" />
              <p className="ab-card-name">Kumar Pradipta Mishra</p>
              <p className="ab-card-role">President, Ray of Hope</p>
            </div>
          </div>
        </div>

        {/* SECRETARY CARD */}
        <div className="ab-card-wrap">
          <div className="ab-person-card">
            <div className="ab-person-img-col">
              <div className="ab-person-img-frame">
                <img src={newBhai} alt="Rajib Swain" className="ab-person-img" />
              </div>
            </div>
            <div className="ab-person-content">
              <p className="ab-card-eyebrow">Message from the Secretary</p>
              <h2 className="ab-card-quote">"Hands that help are holier than lips that pray"</h2>
              <p className="ab-card-body">
                "No one in our city should go hungry or lose a loved one due to a shortage of blood. What started as a small group of friends has now grown into a community of hundreds, all bound by the same thread of empathy. My role is to ensure that this empathy is backed by action, and that every volunteer's effort translates into a life saved in Odisha."
              </p>
              <div className="ab-card-divider" />
              <p className="ab-card-name">Rajib Swain</p>
              <p className="ab-card-role">Secretary, Ray of Hope</p>
            </div>
          </div>
        </div>

        {/* PILLARS */}
        <div className="ab-pillars-section">
          <p className="ab-eyebrow" style={{ textAlign: "center" }}>What drives us</p>
          <h3 className="ab-pillars-title">Our Core <span className="ab-accent">Pillars</span></h3>
          <div className="ab-pillars-grid">
            {[
              {
                title: "Transparency",
                desc: "Every rupee donated and every unit of blood tracked is visible to our community.",
                icon: "bi-eye-fill",
              },
              {
                title: "Urgency",
                desc: "Our 24/7 emergency response team ensures help reaches the doorstep when it matters most.",
                icon: "bi-lightning-charge-fill",
              },
              {
                title: "Dignity",
                desc: "We believe in serving with respect, ensuring the privacy and honor of every beneficiary.",
                icon: "bi-shield-fill",
              },
            ].map((pillar, idx) => (
              <div key={idx} className="ab-pillar-card">
                <div className="ab-pillar-icon">
                  <i className={`bi ${pillar.icon}`} />
                </div>
                <h4 className="ab-pillar-title">{pillar.title}</h4>
                <p className="ab-pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <style>{`
        /* ROOT */
        .ab-root { min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .ab-accent { color: #4ade80; }

        /* VIDEO */
        .ab-video-bg { position: fixed; inset: 0; z-index: 0; background: #000; }
        .ab-video { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.3); }
        .ab-video-overlay { position: absolute; inset: 0; background: rgba(14,15,14,0.55); }

        /* NAV */
        .ab-nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 60px; background: rgba(14,15,14,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .ab-brand { display: inline-flex; align-items: center; gap: 10px; font-size: 1rem; font-weight: 800; color: #f0f0ef; text-decoration: none; letter-spacing: -0.3px; }
        .ab-logo-img { border-radius: 50%; }
        .ab-nav-links { display: flex; align-items: center; gap: 28px; }
        .ab-nav-link { font-size: 0.88rem; font-weight: 500; color: rgba(255,255,255,0.5); text-decoration: none; transition: color .18s; }
        .ab-nav-link:hover { color: rgba(255,255,255,0.85); }
        .ab-nav-active { color: #f0f0ef !important; }
        .ab-btn-nav { background: #4ade80; color: #0a0f0a; font-size: 0.85rem; font-weight: 800; padding: 8px 20px; border-radius: 8px; text-decoration: none; transition: opacity .18s; }
        .ab-btn-nav:hover { opacity: 0.85; color: #0a0f0a; }
        .ab-menu-toggle { display: none; background: none; border: none; color: #f0f0ef; font-size: 1.4rem; cursor: pointer; padding: 4px; }

        /* MAIN */
        .ab-main { position: relative; z-index: 1; max-width: 960px; margin: 0 auto; padding: 72px 24px 96px; }

        /* HERO */
        .ab-hero { text-align: center; margin-bottom: 72px; }
        .ab-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #4ade80; margin-bottom: 14px; }
        .ab-hero-title { font-size: clamp(2.8rem, 6vw, 4.5rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.03em; color: #f0f0ef; margin-bottom: 20px; }
        .ab-hero-sub { font-size: 1.05rem; color: rgba(255,255,255,0.5); line-height: 1.75; max-width: 640px; margin: 0 auto; }

        /* PERSON CARDS */
        .ab-card-wrap { margin-bottom: 28px; }
        .ab-person-card { display: grid; grid-template-columns: 280px 1fr; background: rgba(17,18,17,0.82); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; overflow: hidden; }
        .ab-person-img-col { background: rgba(255,255,255,0.03); display: flex; align-items: center; justify-content: center; padding: 32px; }
        .ab-person-img-frame { width: 100%; max-width: 220px; aspect-ratio: 4/5; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
        .ab-person-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .3s ease; }
        .ab-person-img-frame:hover .ab-person-img { transform: scale(1.03); }
        .ab-person-content { padding: 44px 48px; display: flex; flex-direction: column; justify-content: center; }
        .ab-card-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #4ade80; margin-bottom: 14px; }
        .ab-card-quote { font-size: 1.35rem; font-weight: 900; color: #f0f0ef; letter-spacing: -0.02em; line-height: 1.3; margin-bottom: 18px; }
        .ab-card-body { font-size: 0.93rem; color: rgba(255,255,255,0.48); line-height: 1.8; font-style: italic; margin-bottom: 24px; }
        .ab-card-divider { width: 40px; height: 2px; background: #4ade80; border-radius: 2px; margin-bottom: 16px; }
        .ab-card-name { font-size: 1rem; font-weight: 800; color: #f0f0ef; margin-bottom: 2px; }
        .ab-card-role { font-size: 0.78rem; font-weight: 700; color: #4ade80; text-transform: uppercase; letter-spacing: 0.05em; }

        /* PILLARS */
        .ab-pillars-section { margin-top: 72px; }
        .ab-pillars-title { font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 900; color: #f0f0ef; letter-spacing: -0.03em; text-align: center; margin-bottom: 40px; }
        .ab-pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ab-pillar-card { background: rgba(17,18,17,0.82); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px 28px; transition: border-color .2s; }
        .ab-pillar-card:hover { border-color: rgba(74,222,128,0.25); }
        .ab-pillar-icon { font-size: 1.6rem; color: #4ade80; margin-bottom: 16px; }
        .ab-pillar-title { font-size: 1.05rem; font-weight: 800; color: #f0f0ef; margin-bottom: 10px; }
        .ab-pillar-desc { font-size: 0.88rem; color: rgba(255,255,255,0.42); line-height: 1.7; margin: 0; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .ab-nav { padding: 0 20px; }
          .ab-nav-links { display: none; flex-direction: column; position: absolute; top: 60px; left: 0; right: 0; background: rgba(14,15,14,0.97); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 20px 24px 28px; gap: 16px; align-items: flex-start; }
          .ab-nav-open { display: flex; }
          .ab-menu-toggle { display: block; }
          .ab-person-card { grid-template-columns: 1fr; }
          .ab-person-img-col { padding: 28px 28px 0; }
          .ab-person-img-frame { max-width: 180px; aspect-ratio: 1/1; margin: 0 auto; }
          .ab-person-content { padding: 28px; }
          .ab-pillars-grid { grid-template-columns: 1fr; }
          .ab-main { padding: 48px 16px 72px; }
        }
      `}</style>
    </div>
  );
};

export default About;