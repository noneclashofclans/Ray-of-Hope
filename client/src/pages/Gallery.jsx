import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import newLogo from "../assets/newLogo.png";
import vid3 from "../assets/vid3.mp4";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const galleryData = [
    { id: 1, category: "Food",      title: "Food Donation: Cuttack Slum",          img: img1 },
    { id: 2, category: "Education", title: "Our team members",                      img: img2 },
    { id: 3, category: "Health",    title: "Blood donor award to Narayan Maharana", img: img3 },
    { id: 4, category: "Education", title: "International Women's Day",             img: img4 },
    { id: 5, category: "Health",    title: "Blood Donor Felicitation",              img: img5 },
    { id: 6, category: "Health",    title: "Blood Donation Drive",                  img: img6 },
    { id: 7, category: "Health",    title: "Social Work in Shivratri",              img: img7 },
    { id: 8, category: "Education", title: "Satyabhumi Charity Honour",             img: img8 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const filteredItems =
    filter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  const CATEGORIES = ["All", "Blood", "Food", "Education", "Health"];

  return (
    <div className="roh-root">
      <Toaster position="top-center" />

      {/* VIDEO BACKGROUND */}
      <div className="gallery-video-bg">
        <video autoPlay muted loop playsInline className="gallery-video">
          <source src={vid3} type="video/mp4" />
        </video>
        <div className="gallery-video-scrim" />
      </div>

      {/* NAV */}
      <nav className="roh-nav">
        <div className="roh-nav-inner">
          <Link className="roh-brand" to="/">
            <img src={newLogo} alt="Logo" width="30" height="30" className="roh-logo-img" />
            <span>Ray of <span className="roh-accent">Hope</span></span>
          </Link>

          <div className="roh-nav-links">
            {["Home", "About", "Impact", "Gallery"].map(item => (
              <Link
                key={item}
                className={`roh-navlink${item === "Gallery" ? " roh-navlink--active" : ""}`}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="gallery-hero">
        <div className="roh-beta-badge">
          <span className="roh-badge-dot" /> Serving Odisha since 2022
        </div>
        <h1 className="gallery-h1">
          Mission in <span className="roh-accent">Action.</span>
        </h1>
        <p className="gallery-sub">
          Witness the impact of your empathy across Odisha.
        </p>
      </div>

      {/* FILTER PILLS */}
      <div className="gallery-filters-wrap">
        <div className="gallery-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`gallery-filter-btn${filter === cat ? " gallery-filter-btn--active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <main className="roh-container gallery-main">
        <div className="gallery-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="gallery-card">
              <div className="gallery-card-img-wrap">
                <img src={item.img} alt={item.title} className="gallery-card-img" />
                <div className="gallery-card-badge">{item.category}</div>
              </div>
              <div className="gallery-card-body">
                <h5 className="gallery-card-title">{item.title}</h5>
                <span className="gallery-card-location">
                  <span className="gallery-dot">●</span> Cuttack, Odisha
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="roh-footer">
        <div className="roh-container roh-footer-grid">
          <div>
            <Link className="roh-brand" to="/" style={{ marginBottom: 12, display: "inline-flex" }}>
              <img src={newLogo} alt="Logo" width="28" height="28" className="roh-logo-img" />
              <span>Ray of <span className="roh-accent">Hope</span></span>
            </Link>
            <p className="roh-footer-tagline">Serving communities across Odisha since 2022.</p>
            <a href="https://www.instagram.com/rayof_hope22?igsh=dm5vdXpweDVleW5j" target="_blank" rel="noreferrer" className="roh-footer-social">
              <i className="bi bi-instagram" />
            </a>
          </div>
          <div>
            <p className="roh-footer-col-title">Pages</p>
            <ul className="roh-footer-links">
              {["Home", "About", "Impact", "Gallery"].map(item => (
                <li key={item}><Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="roh-footer-col-title">Contact</p>
            <ul className="roh-footer-links roh-footer-contact">
              <li><i className="bi bi-geo-alt-fill" /><span>Mahanadi Vihar, Cuttack</span></li>
              <li><i className="bi bi-envelope-fill" /><span>rayofhopecontact22@gmail.com</span></li>
              <li><i className="bi bi-telephone-fill" /><span>+91 7605903287</span></li>
            </ul>
          </div>
        </div>
        <div className="roh-footer-bottom">
          <span>© 2026 Ray of Hope Foundation, Cuttack. All rights reserved.</span>
        </div>
      </footer>

      <style>{`
        .roh-root { background: #0e0f0e; color: #f0f0ef; overflow-x: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .roh-accent { color: #4ade80; }
        .roh-container { max-width: 1160px; margin: 0 auto; padding: 0 28px; }

        /* VIDEO BG */
        .gallery-video-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
        .gallery-video { width: 100%; height: 100%; object-fit: cover; }
        .gallery-video-scrim { position: absolute; inset: 0; background: rgba(14,15,14,0.82); }

        /* NAV */
        .roh-nav { position: sticky; top: 0; z-index: 100; background: rgba(14,15,14,0.88); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .roh-nav-inner { max-width: 1160px; margin: 0 auto; padding: 0 28px; height: 60px; display: flex; align-items: center; gap: 32px; }
        .roh-brand { display: inline-flex; align-items: center; gap: 10px; font-size: 1rem; font-weight: 800; color: #f0f0ef; text-decoration: none; letter-spacing: -0.3px; flex-shrink: 0; }
        .roh-logo-img { border-radius: 50%; }
        .roh-nav-links { display: flex; gap: 2px; margin: 0 auto; }
        .roh-navlink { color: rgba(255,255,255,0.5); font-size: 0.88rem; text-decoration: none; padding: 6px 14px; border-radius: 8px; transition: color .18s, background .18s; }
        .roh-navlink:hover { color: #fff; background: rgba(255,255,255,0.07); }
        .roh-navlink--active { color: #4ade80 !important; background: rgba(74,222,128,0.08); }
        .roh-nav-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .roh-toggler { display: none; margin-left: auto; }
        .roh-mobile-nav { padding: 12px 28px 20px; display: flex; flex-direction: column; gap: 4px; border-top: 1px solid rgba(255,255,255,0.06); background: #0e0f0e; }
        .roh-mobile-link { color: rgba(255,255,255,0.65); text-decoration: none; font-size: 1rem; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .roh-mobile-actions { display: flex; gap: 10px; margin-top: 16px; }
        .roh-avatar-sm { width: 26px; height: 26px; background: #4ade80; color: #0a0f0a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; flex-shrink: 0; }
        .roh-dropdown { background: #1a1b1a; border: 1px solid rgba(255,255,255,0.1); }
        .roh-dropdown .dropdown-item { color: rgba(255,255,255,0.65); font-size: 0.88rem; }
        .roh-dropdown .dropdown-item:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .roh-btn-primary { background: #4ade80; color: #0a0f0a; font-size: 0.88rem; font-weight: 800; padding: 9px 20px; border-radius: 8px; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; transition: opacity .18s; }
        .roh-btn-primary:hover { opacity: 0.85; color: #0a0f0a; }
        .roh-btn-ghost { background: transparent; color: rgba(255,255,255,0.6); font-size: 0.88rem; font-weight: 600; padding: 9px 18px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.14); cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: border-color .18s, color .18s; }
        .roh-btn-ghost:hover { border-color: rgba(255,255,255,0.4); color: #fff; }

        /* HERO */
        .gallery-hero { position: relative; z-index: 1; padding: 96px 28px 60px; max-width: 1160px; margin: 0 auto; }
        .roh-beta-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 6px 16px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 28px; }
        .roh-badge-dot { width: 7px; height: 7px; background: #4ade80; border-radius: 50%; flex-shrink: 0; }
        .gallery-h1 { font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.03em; color: #fff; margin-bottom: 18px; }
        .gallery-sub { font-size: clamp(0.95rem, 1.6vw, 1.15rem); color: rgba(255,255,255,0.5); line-height: 1.65; max-width: 480px; margin: 0; }

        /* FILTER PILLS */
        .gallery-filters-wrap { position: relative; z-index: 1; padding: 0 28px 48px; max-width: 1160px; margin: 0 auto; }
        .gallery-filters { display: flex; flex-wrap: wrap; gap: 10px; }
        .gallery-filter-btn { background: transparent; color: rgba(255,255,255,0.5); font-size: 0.82rem; font-weight: 700; padding: 8px 22px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.12); cursor: pointer; transition: all .2s; letter-spacing: 0.03em; }
        .gallery-filter-btn:hover { color: #fff; border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.05); }
        .gallery-filter-btn--active { background: #4ade80; color: #0a0f0a; border-color: #4ade80; }
        .gallery-filter-btn--active:hover { opacity: 0.88; color: #0a0f0a; }

        /* GRID */
        .gallery-main { position: relative; z-index: 1; padding-bottom: 96px; }
        .gallery-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .gallery-card { background: #111211; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; overflow: hidden; transition: transform .3s, border-color .3s, box-shadow .3s; }
        .gallery-card:hover { transform: translateY(-6px); border-color: rgba(74,222,128,0.25); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .gallery-card-img-wrap { position: relative; height: 260px; overflow: hidden; }
        .gallery-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform .55s; }
        .gallery-card:hover .gallery-card-img { transform: scale(1.1); }
        .gallery-card-badge { position: absolute; top: 14px; right: 14px; background: rgba(74,222,128,0.9); color: #0a0f0a; font-size: 0.68rem; font-weight: 800; padding: 4px 12px; border-radius: 20px; backdrop-filter: blur(4px); }
        .gallery-card-body { padding: 18px 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); }
        .gallery-card-title { font-size: 0.88rem; font-weight: 700; color: #f0f0ef; margin-bottom: 6px; }
        .gallery-card-location { font-size: 0.7rem; color: rgba(255,255,255,0.35); font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 5px; }
        .gallery-dot { color: #4ade80; font-size: 0.55rem; }

        /* FOOTER */
        .roh-footer { background: #080908; border-top: 1px solid rgba(255,255,255,0.05); padding: 60px 0 0; position: relative; z-index: 1; }
        .roh-footer-grid { display: grid; grid-template-columns: 1.8fr 1fr 1.6fr; gap: 36px; padding-bottom: 44px; }
        .roh-footer-tagline { font-size: 0.82rem; color: rgba(255,255,255,0.3); line-height: 1.6; margin: 10px 0 14px; max-width: 200px; }
        .roh-footer-social { color: rgba(255,255,255,0.3); font-size: 1.1rem; text-decoration: none; transition: color .18s; }
        .roh-footer-social:hover { color: #4ade80; }
        .roh-footer-col-title { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.22); margin-bottom: 14px; }
        .roh-footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
        .roh-footer-links a { color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.86rem; transition: color .18s; }
        .roh-footer-links a:hover { color: #f0f0ef; }
        .roh-footer-contact { gap: 10px; }
        .roh-footer-contact li { font-size: 0.82rem; color: rgba(255,255,255,0.4); display: flex; align-items: flex-start; gap: 8px; }
        .roh-footer-contact li i { color: #4ade80; font-size: 0.82rem; margin-top: 2px; flex-shrink: 0; }
        .roh-footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding: 18px 28px; text-align: center; }
        .roh-footer-bottom span { font-size: 0.76rem; color: rgba(255,255,255,0.18); }

        @media (max-width: 992px) {
          .roh-nav-links, .roh-nav-actions { display: none; }
          .roh-toggler { display: block; }
          .gallery-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .roh-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-h1 { font-size: 2.4rem; }
          .roh-footer-grid { grid-template-columns: 1fr; }
          .gallery-hero { padding: 64px 28px 40px; }
        }
      `}</style>
    </div>
  );
};

export default Gallery;