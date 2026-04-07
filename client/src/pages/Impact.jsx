import React, { useState } from "react";
import { Link } from "react-router-dom";
import newLogo from "../assets/newLogo.png";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";

const Impact = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  const odishaProjects = [
    {
      id: 1,
      title: "Food Donation Drive: Cuttack Slums",
      location: "Cuttack, Odisha",
      date: "November 2025",
      shortDesc: "Providing nutritional support to over 100 families in need.",
      fullDesc: "Our team visited the underserved areas of Cuttack to distribute dry ration kits and cooked meals. This drive focused on ensuring that children and elderly residents had access to healthy food during the changing season. Beyond food, we conducted a small hygiene awareness camp to help prevent local seasonal diseases.",
      image: img1,
      category: "Food Relief"
    },
    {
      id: 2,
      title: "Our team members",
      location: "Cuttack, Odisha",
      date: "February 2026",
      shortDesc: "Hardworking and society-oriented members",
      fullDesc: "Meet the heartbeat of our mission: a diverse collective of students, professionals, and change-makers who believe that the grandest transformations begin with the smallest acts. Our members are the architects of empathy in Odisha—hardworking, value-oriented, and driven by a singular goal: to build a more inclusive society through consistent, grassroots change. Whether it is navigating the city at midnight for a blood emergency or mentoring a child in Bharatpur, our team values human dignity above all else, proving every day that when collective will meets local action, hope is never out of reach.",
      image: img2,
      category: "Education"
    },
    {
      id: 3,
      title: "Blood Donor Felicitation",
      location: "Cuttack, Odisha",
      date: "March 2025",
      shortDesc: "Honoring Mr. Narayan Maharana for his selfless 25+ blood donations.",
      fullDesc: "Meet our hardworking team members who believe that small acts of recognition can drive massive societal change. In a special ceremony held in Cuttack, our value-oriented volunteers felicitated Mr. Narayan Maharana, an inspiration who has donated blood more than 25 times. Our members organized this event to not only honor a local hero but to foster a culture of voluntary donation. By celebrating such milestones, our team aims to build a better society where empathy is recognized and life-saving contributions are never ignored. Every plaque handed over represents our commitment to a future where no one in Odisha suffers due to a lack of blood.",
      image: img3,
      category: "Recognition"
    },
    {
      id: 4,
      title: "Blood Donation & Health Awareness Speech",
      location: "Cuttack, Odisha",
      date: "March 2026",
      shortDesc: "Our value-oriented members educating the public on life-saving health practices.",
      fullDesc: "Meet our hardworking team members, who are dedicated to making a better society through small, intentional changes. In this initiative, our members moved beyond the clinical aspect of donation to host a Health Awareness Speech in Cuttack. Our aim was to dismantle myths surrounding blood donation and provide vital information on preventive healthcare. Our value-oriented volunteers engaged with the local community, emphasizing that a healthy society is built on informed empathy and collective responsibility. By combining a donation drive with educational outreach, our team ensured that every attendee left with a deeper understanding of how their small contribution can sustain a life and strengthen the health of our entire city.",
      image: img4,
      category: "Health & Education"
    },
    {
      id: 6,
      title: "Blood Donation Program",
      location: "Cuttack, Odisha",
      date: "December 2025",
      shortDesc: "Our hardworking members coordinating a vital blood drive in the Silver City.",
      fullDesc: "Driven by the aim of making a better society through small, consistent changes, our value-oriented team members organized this comprehensive blood donation program in Cuttack. Recognizing the frequent shortages in regional blood banks, our volunteers worked tirelessly to mobilize local youth and professionals. This initiative wasn't just about collecting units; it was about our members educating the public on the importance of regular donation. Every volunteer involved displayed immense dedication, ensuring a safe and supportive environment for donors. Through such structured programs, our team continues to weave a thread of empathy across Odisha, ensuring that emergency needs are met with immediate action.",
      image: img6,
      category: "Health"
    }
  ];

  return (
    <div className="roh-root">

      {/* NAV */}
      <nav className="roh-nav">
        <div className="roh-nav-inner">
          <Link className="roh-brand" to="/">
            <img src={newLogo} alt="Logo" width="30" height="30" className="roh-logo-img" />
            <span>Ray of <span className="roh-accent">Hope</span></span>
          </Link>
          <div className="roh-nav-links">
            {["Home", "About", "Impact", "Gallery"].map(item => (
              <Link key={item} className="roh-navlink" to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                {item}
              </Link>
            ))}
          </div>
          <div className="roh-nav-actions">
            <Link className="roh-btn-primary" to="/">← Home</Link>
          </div>
        </div>
      </nav>

      {/* HERO HEADER */}
      <header className="impact-hero">
        <div className="impact-hero-scrim" />
        <div className="impact-hero-content">
          <div className="roh-beta-badge">
            <span className="roh-badge-dot" /> Serving Odisha since 2022
          </div>
          <h1 className="impact-h1">
            Our Impact in <span className="roh-accent">Odisha.</span>
          </h1>
          <p className="impact-sub">
            Documenting our journey of service, compassion, and transformation across the heart of Odisha.
          </p>
        </div>
      </header>

      {/* CARDS GRID */}
      <main className="roh-section roh-section--dark">
        <div className="roh-container">
          <p className="roh-eyebrow">Stories from the field</p>
          <h2 className="roh-section-h2">Every act of <span className="roh-accent">kindness</span> counts.</h2>
          <div className="impact-grid">
            {odishaProjects.map((project) => (
              <div
                className="impact-card"
                key={project.id}
                onClick={() => setSelectedStory(project)}
              >
                <div className="impact-card-img-wrap">
                  <img src={project.image} className="impact-card-img" alt={project.title} />
                  <div className="impact-category-badge">{project.category}</div>
                </div>
                <div className="impact-card-body">
                  <h5 className="impact-card-title">{project.title}</h5>
                  <p className="impact-card-desc">{project.shortDesc}</p>
                  <div className="impact-card-footer">
                    <span className="impact-card-location">
                      <span className="impact-dot">●</span> {project.location}
                    </span>
                    <span className="impact-read-more">Read story <i className="bi bi-chevron-right" /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* MODAL */}
      {selectedStory && (
        <div className="impact-modal-overlay" onClick={() => setSelectedStory(null)}>
          <div className="impact-modal" onClick={e => e.stopPropagation()}>
            <div className="impact-modal-img-wrap">
              <img src={selectedStory.image} className="impact-modal-img" alt="Story Banner" />
              <button className="impact-modal-close" onClick={() => setSelectedStory(null)}>
                <i className="bi bi-x-lg" />
              </button>
            </div>
            <div className="impact-modal-body">
              <div className="impact-modal-meta">
                <span className="impact-modal-category">{selectedStory.category}</span>
                <span className="impact-modal-date">
                  <i className="bi bi-calendar3" style={{marginRight: 6}} />{selectedStory.date}
                </span>
              </div>
              <h2 className="impact-modal-title">{selectedStory.title}</h2>
              <p className="impact-modal-location">
                <i className="bi bi-geo-alt-fill" style={{marginRight: 6}} />{selectedStory.location}
              </p>
              <div className="impact-modal-content">
                <p>{selectedStory.fullDesc}</p>
              </div>
              <div className="impact-modal-action">
                <button className="roh-btn-primary roh-btn-lg" onClick={() => setSelectedStory(null)}>
                  ← Back to Impact Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="roh-footer">
        <div className="roh-container roh-footer-grid">
          <div className="roh-footer-brand-col">
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
        /* ── Base (copied from landing page) ── */
        .roh-root{background:#0e0f0e;color:#f0f0ef;overflow-x:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
        .roh-accent{color:#4ade80}
        .roh-container{max-width:1160px;margin:0 auto;padding:0 28px}

        .roh-nav{position:sticky;top:0;z-index:100;background:rgba(14,15,14,0.9);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.06)}
        .roh-nav-inner{max-width:1160px;margin:0 auto;padding:0 28px;height:60px;display:flex;align-items:center;gap:32px}
        .roh-brand{display:inline-flex;align-items:center;gap:10px;font-size:1rem;font-weight:800;color:#f0f0ef;text-decoration:none;letter-spacing:-0.3px;flex-shrink:0}
        .roh-logo-img{border-radius:50%}
        .roh-nav-links{display:flex;gap:2px;margin:0 auto}
        .roh-navlink{color:rgba(255,255,255,0.5);font-size:0.88rem;text-decoration:none;padding:6px 14px;border-radius:8px;transition:color .18s,background .18s}
        .roh-navlink:hover{color:#fff;background:rgba(255,255,255,0.07)}
        .roh-nav-actions{display:flex;align-items:center;gap:10px;flex-shrink:0}

        .roh-btn-primary{background:#4ade80;color:#0a0f0a;font-size:0.88rem;font-weight:800;padding:9px 20px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;transition:opacity .18s;letter-spacing:-0.1px}
        .roh-btn-primary:hover{opacity:0.85;color:#0a0f0a}
        .roh-btn-lg{padding:14px 32px;font-size:1rem}

        .roh-section{padding:96px 0}
        .roh-section--dark{background:#0e0f0e}
        .roh-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4ade80;margin-bottom:12px}
        .roh-section-h2{font-size:clamp(1.9rem,4vw,3rem);font-weight:900;line-height:1.1;letter-spacing:-0.03em;color:#f0f0ef;margin-bottom:52px}

        /* ── Hero Header ── */
        .impact-hero{position:relative;padding:100px 28px 80px;background:linear-gradient(135deg,#071a0d 0%,#0a2e1a 40%,#0e0f0e 100%);overflow:hidden}
        .impact-hero-scrim{position:absolute;inset:0;background:rgba(14,15,14,0.4)}
        .impact-hero-content{position:relative;z-index:1;max-width:1160px;margin:0 auto}
        .roh-beta-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:6px 16px;font-size:0.72rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:28px}
        .roh-badge-dot{width:7px;height:7px;background:#4ade80;border-radius:50%;flex-shrink:0}
        .impact-h1{font-size:clamp(2.4rem,5vw,4.5rem);font-weight:900;line-height:1.05;letter-spacing:-0.03em;color:#fff;margin-bottom:18px}
        .impact-sub{font-size:clamp(0.9rem,1.4vw,1.1rem);color:rgba(255,255,255,0.5);line-height:1.65;max-width:560px;margin:0}

        /* ── Cards ── */
        .impact-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
        .impact-card{background:#111211;border:1px solid rgba(255,255,255,0.07);border-radius:12px;overflow:hidden;cursor:pointer;transition:transform .3s, border-color .3s, box-shadow .3s}
        .impact-card:hover{transform:translateY(-6px);border-color:rgba(74,222,128,0.25);box-shadow:0 20px 40px rgba(0,0,0,0.4)}
        .impact-card-img-wrap{position:relative;height:220px;overflow:hidden}
        .impact-card-img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
        .impact-card:hover .impact-card-img{transform:scale(1.08)}
        .impact-category-badge{position:absolute;top:14px;left:14px;background:rgba(74,222,128,0.9);color:#0a0f0a;font-size:0.7rem;font-weight:800;padding:4px 12px;border-radius:20px;backdrop-filter:blur(4px)}
        .impact-card-body{padding:20px}
        .impact-card-title{font-size:0.92rem;font-weight:700;color:#f0f0ef;margin-bottom:6px}
        .impact-card-desc{font-size:0.78rem;color:rgba(255,255,255,0.4);line-height:1.6;margin-bottom:14px}
        .impact-card-footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,0.07);padding-top:12px}
        .impact-card-location{font-size:0.7rem;color:rgba(255,255,255,0.35);display:flex;align-items:center;gap:5px;font-weight:600}
        .impact-dot{color:#4ade80;font-size:0.6rem}
        .impact-read-more{font-size:0.72rem;font-weight:700;color:#4ade80}

        /* ── Modal ── */
        .impact-modal-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:2000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);padding:20px}
        .impact-modal{background:#111211;border:1px solid rgba(255,255,255,0.1);border-radius:16px;max-width:860px;width:100%;max-height:90vh;overflow-y:auto;position:relative}
        .impact-modal-img-wrap{position:relative;height:360px;overflow:hidden;border-radius:16px 16px 0 0}
        .impact-modal-img{width:100%;height:100%;object-fit:cover}
        .impact-modal-close{position:absolute;top:16px;right:16px;background:rgba(14,15,14,0.8);border:1px solid rgba(255,255,255,0.15);color:#f0f0ef;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:0.8rem;transition:background .2s;z-index:10}
        .impact-modal-close:hover{background:#dc3545;border-color:#dc3545}
        .impact-modal-body{padding:32px 40px 40px}
        .impact-modal-meta{display:flex;align-items:center;gap:14px;margin-bottom:16px}
        .impact-modal-category{background:rgba(74,222,128,0.12);color:#4ade80;border:1px solid rgba(74,222,128,0.25);font-size:0.72rem;font-weight:700;padding:5px 14px;border-radius:20px;letter-spacing:0.04em}
        .impact-modal-date{font-size:0.78rem;color:rgba(255,255,255,0.35)}
        .impact-modal-title{font-size:clamp(1.4rem,2.5vw,2rem);font-weight:900;color:#f0f0ef;margin-bottom:10px;letter-spacing:-0.02em}
        .impact-modal-location{font-size:0.8rem;font-weight:700;color:#4ade80;margin-bottom:24px}
        .impact-modal-content p{font-size:1rem;color:rgba(255,255,255,0.55);line-height:1.8}
        .impact-modal-action{margin-top:36px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.07);text-align:center}

        /* ── Footer (from landing page) ── */
        .roh-footer{background:#080908;border-top:1px solid rgba(255,255,255,0.05);padding:60px 0 0}
        .roh-footer-grid{display:grid;grid-template-columns:1.8fr 1fr 1.6fr;gap:36px;padding-bottom:44px}
        .roh-footer-tagline{font-size:0.82rem;color:rgba(255,255,255,0.3);line-height:1.6;margin:10px 0 14px;max-width:200px}
        .roh-footer-social{color:rgba(255,255,255,0.3);font-size:1.1rem;text-decoration:none;transition:color .18s}
        .roh-footer-social:hover{color:#4ade80}
        .roh-footer-col-title{font-size:0.7rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.22);margin-bottom:14px}
        .roh-footer-links{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:9px}
        .roh-footer-links a{color:rgba(255,255,255,0.45);text-decoration:none;font-size:0.86rem;transition:color .18s}
        .roh-footer-links a:hover{color:#f0f0ef}
        .roh-footer-contact{gap:10px}
        .roh-footer-contact li{font-size:0.82rem;color:rgba(255,255,255,0.4);display:flex;align-items:flex-start;gap:8px}
        .roh-footer-contact li i{color:#4ade80;font-size:0.82rem;margin-top:2px;flex-shrink:0}
        .roh-footer-bottom{border-top:1px solid rgba(255,255,255,0.05);padding:18px 28px;text-align:center}
        .roh-footer-bottom span{font-size:0.76rem;color:rgba(255,255,255,0.18)}

        @media(max-width:992px){
          .roh-nav-links,.roh-nav-actions{display:none}
          .impact-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
          .roh-footer-grid{grid-template-columns:1fr 1fr}
        }
        @media(max-width:640px){
          .impact-grid{grid-template-columns:1fr}
          .roh-footer-grid{grid-template-columns:1fr}
          .impact-h1{font-size:2.2rem}
          .impact-modal-body{padding:20px 20px 28px}
          .impact-modal-img-wrap{height:240px}
          .roh-section{padding:64px 0}
        }
      `}</style>
    </div>
  );
};

export default Impact;