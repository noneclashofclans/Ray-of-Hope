import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import newLogo from "../assets/newLogo.png";
import toast, { Toaster } from "react-hot-toast";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import newBhai from "../assets/newBhai.png";

function useCountUp(target, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return val;
}

function StatPill({ value, suffix = "+", label, active }) {
  const count = useCountUp(value, 1800, active);
  return (
    <div className="roh-stat-pill">
      <span className="roh-stat-num">{count.toLocaleString()}{suffix}</span>
      <span className="roh-stat-label">{label}</span>
    </div>
  );
}

const STATS = [
  { value: 100, suffix: "+", label: "Lives touched" },
  { value: 50, suffix: "+", label: "Blood donors" },
  { value: 40, suffix: "+", label: "Volunteers" },
  { value: 15, suffix: "+", label: "Drives done" },
];

const SERVICES = [
  { icon: "bi-droplet-fill", accent: "#e85d5d", title: "Blood Bank", desc: "Connecting donors with patients across Odisha in real time." },
  { icon: "bi-cup-hot-fill", accent: "#e8a835", title: "Food Security", desc: "Ensuring no family in Odisha sleeps hungry." },
  { icon: "bi-book-fill", accent: "#5b8fe8", title: "Education", desc: "Sponsoring kits and tuition for children in Cuttack." },
  { icon: "bi-shield-check", accent: "#4ade80", title: "Legal Aid", desc: "Free legal counsel for accessible infrastructure." },
];

const TESTIMONIALS = [
  { name: "Ashutosh Dash", role: "Blood Recipient", text: "Ray of Hope arranged O-ve blood for my surgery within an hour. I am forever grateful." },
  { name: "Smriti Patra", role: "Volunteer", text: "The food drive opened my eyes to the immense power of collective kindness." },
  { name: "Kabir Meher", role: "Beneficiary", text: "The support I received helped me complete my 12th standard. It changed my life." },
];

const initials = (n) => n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

export default function LandingPage() {
  const [user, setUser] = useState(null);
  const [statsOn, setStatsOn] = useState(false);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div className="roh-root">
      <Toaster position="top-center" />

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
            {user ? (
              <div className="dropdown">
                <button className="roh-btn-ghost dropdown-toggle" data-bs-toggle="dropdown">
                  <div className="roh-avatar-sm">{user.username.charAt(0).toUpperCase()}</div>
                  {user.username}
                </button>
                <ul className="dropdown-menu dropdown-menu-end roh-dropdown">
                  <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link className="roh-btn-ghost" to="/login">Sign in</Link>
                <Link className="roh-btn-primary" to="/register">Get started</Link>
              </>
            )}
          </div>

          {/* VISIBLE HAMBURGER ICON */}
          <button
            className="roh-toggler navbar-toggler border-0 shadow-none px-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#rohMobileNav"
            aria-controls="rohMobileNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list" style={{ color: "#fff", fontSize: "2rem", lineHeight: "1" }}></i>
          </button>
        </div>

        {/* MOBILE NAV MENU */}
        <div className="collapse roh-mobile-nav" id="rohMobileNav">
          {["Home", "About", "Impact", "Gallery"].map(item => (
            <Link key={item} className="roh-mobile-link" to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>{item}</Link>
          ))}
          <div className="roh-mobile-actions">
            {user ? (
              <>
                <div className="mobile-user-profile">
                  <div className="roh-avatar-sm">{user.username.charAt(0).toUpperCase()}</div>
                  <span>{user.username}</span>
                </div>
                <Link className="roh-btn-ghost w-100 justify-content-center" to="/dashboard">Dashboard</Link>
                <button className="roh-btn-primary w-100 justify-content-center" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="roh-btn-ghost text-white w-100 justify-content-center" to="/login">Sign in</Link>
                <Link className="roh-btn-primary w-100 justify-content-center" to="/register">Get started</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="roh-hero">
        <div className="roh-slides">
          {[img1, img2, img3].map((img, i) => (
            <div key={i} className={`roh-slide roh-slide-${i + 1}`} style={{ backgroundImage: `url(${img})` }} />
          ))}
          <div className="roh-slide-scrim" />
        </div>

        <div className="roh-hero-content">
          <div className="roh-beta-badge">
            <span className="roh-badge-dot" /> Serving Odisha since 2022
          </div>
          <h1 className="roh-hero-h1">
            The human way<br />to restore <span className="roh-accent">hope.</span>
          </h1>
          <p className="roh-hero-sub">
            Coordinating blood drives, food security, education, and legal aid —
            all in one mission. No bureaucracy, no bloat.
          </p>
          <div className="roh-hero-cta">
            <button className="roh-btn-hero-primary" onClick={() => navigate("/register")}>
              Join us free →
            </button>
            <button className="roh-btn-hero-ghost" onClick={() => navigate("/impact")}>
              See our work
            </button>
          </div>
        </div>

        <div className="roh-hero-stats" ref={statsRef}>
          {STATS.map(s => <StatPill key={s.label} {...s} active={statsOn} />)}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="roh-section roh-section--dark">
        <div className="roh-container">
          <p className="roh-eyebrow">What we do</p>
          <h2 className="roh-section-h2">Four pillars of <span className="roh-accent">action.</span></h2>
          <div className="roh-services-grid">
            {SERVICES.map((svc, i) => (
              <div key={i} className="roh-svc-card">
                <i className={`bi ${svc.icon} roh-svc-icon`} style={{ color: svc.accent }} />
                <h3 className="roh-svc-title">{svc.title}</h3>
                <p className="roh-svc-desc">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECRETARY */}
      <section className="roh-section roh-section--darker">
        <div className="roh-container roh-secretary-row">
          <div className="roh-secretary-img-wrap">
            <img src={newBhai} alt="Rajib Swain, Secretary" className="roh-secretary-img" />
          </div>
          <div className="roh-secretary-copy">
            <p className="roh-eyebrow">From the secretary</p>
            <h2 className="roh-section-h2">A simple<br /><span className="roh-accent">belief.</span></h2>
            <blockquote className="roh-quote">
              "No one in our city should go hungry or lose a loved one due to a shortage of blood."
            </blockquote>
            <p className="roh-body-text">
              From our hub in Cuttack, we coordinate real-time blood support and food drives across Odisha — with volunteers who believe in the mission as deeply as we do.
            </p>
            <div style={{ marginBottom: 8, fontSize: "0.85rem", color: "rgba(255,255,255,0.35)" }}>
              Rajib Swain  ·  Secretary, Ray of Hope
            </div>
            <button className="roh-btn-primary roh-btn-md" onClick={() => navigate("/about")}>
              Read our full story →
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="roh-section roh-section--dark">
        <div className="roh-container">
          <p className="roh-eyebrow">Voices of hope</p>
          <h2 className="roh-section-h2">Real people,<br /><span className="roh-accent">real change.</span></h2>
          <div className="roh-testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="roh-testi-card">
                <div className="roh-testi-stars">★★★★★</div>
                <p className="roh-testi-text">"{t.text}"</p>
                <div className="roh-testi-author">
                  <div className="roh-avatar">{initials(t.name)}</div>
                  <div>
                    <div className="roh-testi-name">{t.name}</div>
                    <div className="roh-testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE STRIP */}
      <section className="roh-donate-strip">
        <div className="roh-container roh-donate-inner">
          <div>
            <h3 className="roh-donate-h3">Your contribution saves lives.</h3>
            <p className="roh-donate-sub">₹500 feeds a family for a week  ·  ₹1,000 funds a blood drive kit</p>
          </div>
          <button className="roh-btn-dark" onClick={() => navigate("/money")}>
            Donate now →
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="roh-section roh-section--darker roh-cta-section">
        <div className="roh-container roh-cta-inner">
          <p className="roh-eyebrow">Get involved</p>
          <h2 className="roh-cta-h2">
            Ready to make<br />a <span className="roh-accent">difference?</span>
          </h2>
          <p className="roh-cta-sub">Join our community of changemakers across Odisha.</p>
          <div className="roh-cta-btns">
            <Link className="roh-btn-primary roh-btn-lg" to="/register">Join us free →</Link>
            <button className="roh-btn-ghost roh-btn-lg" onClick={() => navigate("/money")}>Donate today</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="roh-footer">
        <div className="roh-container roh-footer-grid">
          <div className="roh-footer-brand-col">
            <Link className="roh-brand" to="/" style={{ marginBottom: 12, display: "inline-flex" }}>
              <img src={newLogo} alt="Logo" width="28" height="28" className="roh-logo-img" />
              <span>Ray of <span className="roh-accent">Hope</span></span>
            </Link>
            <p className="roh-footer-tagline">Serving communities across Odisha since 2022.</p>
            <a href="https://www.instagram.com/rayof_hope22" target="_blank" rel="noreferrer" className="roh-footer-social">
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

          <div>
            <p className="roh-footer-col-title">Find us</p>
            {/* FIXED GOOGLE MAPS EMBED */}
            <iframe
              title="Ray of Hope Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119642.7169055811!2d85.79559850654016!3d20.463283254359856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190d7c00e120f5%3A0x95977922d5dc8682!2sCuttack%2C%20Odisha!5e0!3m2!1sen!2sus!4v1714571212876!5m2!1sen!2sus"
              width="100%" height="120"
              style={{ border: 0, display: "block", borderRadius: 8, filter: "grayscale(60%) invert(90%) hue-rotate(180deg)" }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
            <a href="https://maps.google.com/?q=Mahanadi+Vihar,+Cuttack,+Odisha" target="_blank" rel="noopener noreferrer" className="roh-map-link">
              Open in Google Maps ↗
            </a>
          </div>
        </div>

        <div className="roh-footer-bottom">
          <span>© 2026 Ray of Hope Foundation, Cuttack. All rights reserved.</span>
        </div>
      </footer>

      <style>{`
        .roh-root{background:#0e0f0e;color:#f0f0ef;overflow-x:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
        .roh-accent{color:#4ade80}
        .roh-container{max-width:1160px;margin:0 auto;padding:0 28px}

        /* Nav & Hamburger */
        .roh-nav{position:sticky;top:0;z-index:100;background:rgba(14,15,14,0.9);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.06)}
        .roh-nav-inner{max-width:1160px;margin:0 auto;padding:0 28px;height:60px;display:flex;align-items:center;gap:32px}
        .roh-brand{display:inline-flex;align-items:center;gap:10px;font-size:1rem;font-weight:800;color:#f0f0ef;text-decoration:none;letter-spacing:-0.3px;flex-shrink:0}
        .roh-logo-img{border-radius:50%}
        .roh-nav-links{display:flex;gap:2px;margin:0 auto}
        .roh-navlink{color:rgba(255,255,255,0.5);font-size:0.88rem;text-decoration:none;padding:6px 14px;border-radius:8px;transition:color .18s,background .18s}
        .roh-navlink:hover{color:#fff;background:rgba(255,255,255,0.07)}
        .roh-nav-actions{display:flex;align-items:center;gap:10px;flex-shrink:0}
        
        .roh-avatar-sm{width:26px;height:26px;background:#4ade80;color:#0a0f0a;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:800;flex-shrink:0}
        .roh-dropdown{background:#1a1b1a;border:1px solid rgba(255,255,255,0.1)}
        .roh-dropdown .dropdown-item{color:rgba(255,255,255,0.65);font-size:0.88rem}
        .roh-dropdown .dropdown-item:hover{background:rgba(255,255,255,0.06);color:#fff}
        .roh-dropdown hr{border-color:rgba(255,255,255,0.08)}

        /* Buttons */
        .roh-btn-primary{background:#4ade80;color:#0a0f0a;font-size:0.88rem;font-weight:800;padding:9px 20px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;transition:opacity .18s;letter-spacing:-0.1px}
        .roh-btn-primary:hover{opacity:0.85;color:#0a0f0a}
        .roh-btn-ghost{background:transparent;color:rgba(255,255,255,0.6);font-size:0.88rem;font-weight:600;padding:9px 18px;border-radius:8px;border:1px solid rgba(255,255,255,0.14);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:border-color .18s,color .18s}
        .roh-btn-ghost:hover{border-color:rgba(255,255,255,0.4);color:#fff}
        .roh-btn-dark{background:#0a0f0a;color:#f0f0ef;font-size:0.9rem;font-weight:700;padding:12px 28px;border-radius:8px;border:none;cursor:pointer;transition:opacity .18s}
        .roh-btn-dark:hover{opacity:0.8}
        .roh-btn-lg{padding:14px 32px;font-size:1rem}
        .roh-btn-hero-primary{background:#4ade80;color:#0a0f0a;font-size:1rem;font-weight:800;padding:14px 32px;border-radius:8px;border:none;cursor:pointer;transition:opacity .18s;letter-spacing:-0.1px}
        .roh-btn-hero-primary:hover{opacity:0.85}
        .roh-btn-hero-ghost{background:transparent;color:rgba(255,255,255,0.65);font-size:1rem;font-weight:600;padding:14px 32px;border-radius:8px;border:1px solid rgba(255,255,255,0.18);cursor:pointer;transition:border-color .18s,color .18s}
        .roh-btn-hero-ghost:hover{border-color:rgba(255,255,255,0.5);color:#fff}

        /* Sections */
        .roh-hero{position:relative;min-height:92vh;display:flex;flex-direction:column;justify-content:center;overflow:hidden}
        .roh-slides{position:absolute;inset:0;z-index:0}
        .roh-slide{position:absolute;inset:0;background-size:cover;background-position:center;opacity:0;animation:rohFade 24s infinite ease-in-out}
        .roh-slide-1{animation-delay:0s}.roh-slide-2{animation-delay:8s}.roh-slide-3{animation-delay:16s}
        @keyframes rohFade{0%{opacity:0;transform:scale(1)}8%{opacity:1}33%{opacity:1;transform:scale(1.04)}42%{opacity:0;transform:scale(1.04)}100%{opacity:0}}
        .roh-slide-scrim{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(14,15,14,0.68) 0%,rgba(14,15,14,0.82) 55%,rgba(14,15,14,1) 100%)}
        .roh-hero-content{position:relative;z-index:2;max-width:1160px;margin:0 auto;padding:80px 28px 40px}
        .roh-beta-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:6px 16px;font-size:0.72rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:28px}
        .roh-badge-dot{width:7px;height:7px;background:#4ade80;border-radius:50%;flex-shrink:0}
        .roh-hero-h1{font-size:clamp(2.8rem,6vw,5.5rem);font-weight:900;line-height:1.05;letter-spacing:-0.03em;color:#fff;margin-bottom:22px}
        .roh-hero-sub{font-size:clamp(0.95rem,1.6vw,1.15rem);color:rgba(255,255,255,0.52);line-height:1.65;margin-bottom:34px;max-width:520px}
        .roh-hero-cta{display:flex;gap:12px;flex-wrap:wrap}
        .roh-hero-stats{position:relative;z-index:2;display:flex;border-top:1px solid rgba(255,255,255,0.07);margin-top:auto}
        .roh-stat-pill{flex:1;padding:22px 28px;border-right:1px solid rgba(255,255,255,0.07)}
        .roh-stat-pill:last-child{border-right:none}
        .roh-stat-num{display:block;font-size:clamp(1.5rem,2.8vw,2.2rem);font-weight:900;color:#4ade80;letter-spacing:-0.02em}
        .roh-stat-label{display:block;font-size:0.72rem;color:rgba(255,255,255,0.38);margin-top:2px;text-transform:uppercase;letter-spacing:0.06em}

        .roh-section{padding:96px 0}
        .roh-section--dark{background:#0e0f0e}
        .roh-section--darker{background:#111211}
        .roh-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4ade80;margin-bottom:12px}
        .roh-section-h2{font-size:clamp(1.9rem,4vw,3rem);font-weight:900;line-height:1.1;letter-spacing:-0.03em;color:#f0f0ef;margin-bottom:52px}
        .roh-body-text{color:rgba(255,255,255,0.46);font-size:0.93rem;line-height:1.75;margin-bottom:24px;max-width:460px}

        .roh-services-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.06);border-radius:14px;overflow:hidden}
        .roh-svc-card{background:#0e0f0e;padding:32px 26px;transition:background .2s}
        .roh-svc-card:hover{background:#131413}
        .roh-svc-icon{font-size:1.7rem;display:block;margin-bottom:16px}
        .roh-svc-title{font-size:1rem;font-weight:700;color:#f0f0ef;margin-bottom:8px}
        .roh-svc-desc{font-size:0.83rem;color:rgba(255,255,255,0.4);line-height:1.6;margin:0}

        .roh-secretary-row{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
        .roh-secretary-img{width:100%;border-radius:14px;display:block;aspect-ratio:4/5;object-fit:cover}
        .roh-quote{font-size:clamp(1rem,1.6vw,1.2rem);font-style:italic;color:rgba(255,255,255,0.72);border-left:3px solid #4ade80;padding-left:18px;margin:0 0 20px;line-height:1.6}

        .roh-testi-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .roh-testi-card{background:#161716;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:26px}
        .roh-testi-stars{color:#f59e0b;font-size:0.82rem;letter-spacing:2px;margin-bottom:12px}
        .roh-testi-text{font-size:0.88rem;color:rgba(255,255,255,0.55);line-height:1.65;margin-bottom:18px;font-style:italic}
        .roh-testi-author{display:flex;align-items:center;gap:10px}
        .roh-avatar{width:32px;height:32px;border-radius:50%;background:rgba(74,222,128,0.12);color:#4ade80;font-size:0.7rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .roh-testi-name{font-size:0.83rem;font-weight:700;color:#f0f0ef}
        .roh-testi-role{font-size:0.73rem;color:rgba(255,255,255,0.3)}

        .roh-donate-strip{background:#4ade80;padding:40px 0}
        .roh-donate-inner{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
        .roh-donate-h3{font-size:1.35rem;font-weight:900;color:#0a0f0a;margin:0 0 4px;letter-spacing:-0.02em}
        .roh-donate-sub{font-size:0.85rem;color:rgba(10,15,10,0.55);margin:0}

        .roh-cta-section{text-align:center}
        .roh-cta-inner{display:flex;flex-direction:column;align-items:center}
        .roh-cta-h2{font-size:clamp(2.2rem,5vw,4rem);font-weight:900;line-height:1.08;letter-spacing:-0.03em;color:#f0f0ef;margin-bottom:14px}
        .roh-cta-sub{font-size:0.95rem;color:rgba(255,255,255,0.4);margin-bottom:32px}
        .roh-cta-btns{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}

        /* Footer */
        .roh-footer{background:#080908;border-top:1px solid rgba(255,255,255,0.05);padding:60px 0 0}
        .roh-footer-grid{display:grid;grid-template-columns:1.8fr 1fr 1.6fr 1.6fr;gap:36px;padding-bottom:44px}
        .roh-footer-tagline{font-size:0.82rem;color:rgba(255,255,255,0.3);line-height:1.6;margin:10px 0 14px;max-width:200px}
        .roh-footer-social{color:rgba(255,255,255,0.3);font-size:1.1rem;text-decoration:none;transition:color .18s}
        .roh-footer-social:hover{color:#4ade80}
        .roh-footer-col-title{font-size:0.7rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.22);margin-bottom:14px}
        .roh-footer-links{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:9px}
        .roh-footer-links a{color:rgba(255,255,255,0.45);text-decoration:none;font-size:0.86rem;transition:color .18s}
        .roh-footer-links a:hover{color:#f0f0ef}
        .roh-footer-contact li{font-size:0.82rem;color:rgba(255,255,255,0.4);display:flex;align-items:flex-start;gap:8px}
        .roh-footer-contact li i{color:#4ade80;font-size:0.82rem;margin-top:2px;flex-shrink:0}
        .roh-map-link{display:block;font-size:0.75rem;color:rgba(255,255,255,0.25);text-decoration:none;margin-top:8px;transition:color .18s}
        .roh-map-link:hover{color:#4ade80}
        .roh-footer-bottom{border-top:1px solid rgba(255,255,255,0.05);padding:18px 28px;text-align:center}
        .roh-footer-bottom span{font-size:0.76rem;color:rgba(255,255,255,0.18)}

        /* --- MOBILE TOGGLER OVERRIDES --- */
        .roh-toggler { display: none; }
        .roh-mobile-nav { background: rgba(14,15,14,0.98); backdrop-filter: blur(16px); padding: 16px 28px 32px; border-top: 1px solid rgba(255,255,255,0.06); }
        .roh-mobile-link { color: rgba(255,255,255,0.85); font-weight: 500; text-decoration: none; font-size: 1.05rem; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: block; transition: color 0.2s ease; }
        .roh-mobile-link:hover, .roh-mobile-link:active { color: #4ade80; }
        .roh-mobile-actions { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
        .mobile-user-profile { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 8px; }
        .mobile-user-profile span { font-weight: 800; color: #fff; font-size: 1.05rem; }

        @media (max-width: 992px) {
          .roh-nav-links, .roh-nav-actions { display: none !important; }
          .roh-toggler { display: block !important; margin-left: auto; }
          .roh-services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .roh-secretary-row { grid-template-columns: 1fr !important; gap: 36px; }
          .roh-testi-grid { grid-template-columns: 1fr !important; }
          .roh-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }

        @media(max-width:640px){
          .roh-hero-h1{font-size:2.4rem}
          .roh-hero-stats{flex-wrap:wrap}
          .roh-stat-pill{flex:0 0 50%;border-bottom:1px solid rgba(255,255,255,0.07)}
          .roh-services-grid{grid-template-columns:1fr}
          .roh-footer-grid{grid-template-columns:1fr}
          .roh-donate-inner{flex-direction:column;align-items:flex-start}
          .roh-section{padding:64px 0}
          .roh-cta-h2{font-size:2.2rem}
        }
      `}</style>
    </div>
  );
}