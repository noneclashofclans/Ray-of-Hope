import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import newLogo from "../assets/newLogo.png";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Verifying administrative access...");

    const ADMIN_USER = "rayofhope*&#()";
    const ADMIN_PASS = "rayofhope!@#QWESBI";

    setTimeout(() => {
      if (formData.username === ADMIN_USER && formData.password === ADMIN_PASS) {
        const adminData = {
          username: formData.username,
          isAdmin: true,
          loginTime: new Date().getTime(),
        };
        localStorage.setItem("admin", JSON.stringify(adminData));
        localStorage.setItem("adminToken", "admin-session-active");
        toast.success("Authorization granted. Welcome, Admin.", { id: loadingToast });
        setTimeout(() => navigate("/admin-panel"), 1500);
      } else {
        toast.error("Invalid administrative credentials", { id: loadingToast });
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="lgl-root">
      <Toaster position="top-center" />

      {/* NAV */}
      <nav className="lgl-nav">
        <Link className="lgl-brand" to="/">
          <img src={newLogo} alt="Logo" width="28" height="28" className="lgl-logo-img" />
          <span>Ray of <span className="lgl-accent">Hope</span></span>
        </Link>
        <Link className="lgl-back-link" to="/login">
          ← Back to login
        </Link>
      </nav>

      {/* MAIN */}
      <main className="lgl-main">
        {/* LEFT PANEL */}
        <div className="lgl-left">
          <div className="lgl-left-inner">
            <p className="lgl-eyebrow">Restricted access</p>
            <h1 className="lgl-left-h1">
              Admin<br />portal for<br /><span className="lgl-accent">management.</span>
            </h1>
            <p className="lgl-left-sub">
              Secure gateway for authorized personnel only. Enter your system-level credentials to access the Ray of Hope admin panel.
            </p>
            <div className="lgl-badge-row">
              <div className="lgl-badge">
                <i className="bi bi-shield-lock lgl-badge-icon" />
                <span>Encrypted session</span>
              </div>
              <div className="lgl-badge">
                <i className="bi bi-server lgl-badge-icon" />
                <span>Bhubaneswar server</span>
              </div>
              <div className="lgl-badge">
                <i className="bi bi-person-badge lgl-badge-icon" />
                <span>Authorized only</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — FORM */}
        <div className="lgl-right">
          <div className="lgl-form-card">
           

            <div className="lgl-shield-icon">
              <i className="bi bi-shield-lock" />
            </div>

            <h2 className="lgl-form-title">Admin login</h2>
            <p className="lgl-form-sub">Authorized personnel only.</p>

            <form onSubmit={handleAdminSubmit}>
              <div className="lgl-field">
                <label className="lgl-label">Admin username</label>
                <div className="lgl-input-wrap">
                  <i className="bi bi-person-badge lgl-input-icon" />
                  <input
                    type="text"
                    name="username"
                    className="lgl-input"
                    placeholder="Enter admin ID"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="lgl-field">
                <label className="lgl-label">System password</label>
                <div className="lgl-input-wrap">
                  <i className="bi bi-shield-lock lgl-input-icon" />
                  <input
                    type="password"
                    name="password"
                    className="lgl-input"
                    placeholder="••••••••"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button className="lgl-btn-submit" type="submit" disabled={loading}>
                {loading ? "Verifying…" : "Authorize access →"}
              </button>
            </form>

            <p className="lgl-footer-note">
              © 2026 Ray of Hope Foundation · Bhubaneswar, Odisha
            </p>
          </div>
        </div>
      </main>

      <style>{`
        .lgl-root { background: #0e0f0e; min-height: 100vh; display: flex; flex-direction: column; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .lgl-accent { color: #4ade80; }

        /* NAV */
        .lgl-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 60px; border-bottom: 1px solid rgba(255,255,255,0.06); flex-shrink: 0; }
        .lgl-brand { display: inline-flex; align-items: center; gap: 10px; font-size: 1rem; font-weight: 800; color: #f0f0ef; text-decoration: none; letter-spacing: -0.3px; }
        .lgl-logo-img { border-radius: 50%; }
        .lgl-back-link { font-size: 0.82rem; color: rgba(255,255,255,0.35); text-decoration: none; transition: color .18s; }
        .lgl-back-link:hover { color: rgba(255,255,255,0.7); }

        /* MAIN LAYOUT */
        .lgl-main { flex: 1; display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 61px); }

        /* LEFT */
        .lgl-left { background: #111211; border-right: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; padding: 60px 56px; }
        .lgl-left-inner { max-width: 420px; }
        .lgl-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #4ade80; margin-bottom: 18px; }
        .lgl-left-h1 { font-size: clamp(2.4rem, 4vw, 3.8rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.03em; color: #f0f0ef; margin-bottom: 22px; }
        .lgl-left-sub { font-size: 0.95rem; color: rgba(255,255,255,0.45); line-height: 1.7; margin-bottom: 48px; max-width: 360px; }

        /* BADGE ROW */
        .lgl-badge-row { display: flex; flex-direction: column; gap: 12px; border-top: 1px solid rgba(255,255,255,0.07); padding-top: 32px; }
        .lgl-badge { display: inline-flex; align-items: center; gap: 10px; font-size: 0.82rem; color: rgba(255,255,255,0.4); }
        .lgl-badge-icon { font-size: 0.9rem; color: #4ade80; }

        /* RIGHT */
        .lgl-right { display: flex; align-items: center; justify-content: center; padding: 48px 32px; background: #0e0f0e; }
        .lgl-form-card { width: 100%; max-width: 400px; }
        .lgl-mobile-logo { display: none; align-items: center; gap: 10px; margin-bottom: 32px; }
        .lgl-brand-text { font-size: 1rem; font-weight: 800; color: #f0f0ef; }

        /* SHIELD ICON */
        .lgl-shield-icon { width: 48px; height: 48px; background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; color: #4ade80; margin-bottom: 20px; }

        .lgl-form-title { font-size: 1.9rem; font-weight: 900; color: #f0f0ef; letter-spacing: -0.03em; margin-bottom: 6px; }
        .lgl-form-sub { font-size: 0.88rem; color: rgba(255,255,255,0.38); margin-bottom: 36px; }

        /* FIELDS */
        .lgl-field { margin-bottom: 18px; }
        .lgl-label { display: block; font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.5); letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 8px; }
        .lgl-input-wrap { position: relative; }
        .lgl-input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 0.9rem; color: rgba(255,255,255,0.25); pointer-events: none; }
        .lgl-input { width: 100%; background: #161716; border: 1px solid rgba(255,255,255,0.09); border-radius: 9px; color: #f0f0ef; font-size: 0.93rem; padding: 12px 14px 12px 40px; outline: none; transition: border-color .18s, background .18s; box-sizing: border-box; }
        .lgl-input::placeholder { color: rgba(255,255,255,0.2); }
        .lgl-input:focus { border-color: rgba(74,222,128,0.5); background: #1a1b1a; }

        /* SUBMIT */
        .lgl-btn-submit { width: 100%; background: #4ade80; color: #0a0f0a; font-size: 0.95rem; font-weight: 800; padding: 13px 20px; border-radius: 9px; border: none; cursor: pointer; margin-top: 8px; margin-bottom: 24px; letter-spacing: -0.1px; transition: opacity .18s; }
        .lgl-btn-submit:hover:not(:disabled) { opacity: 0.85; }
        .lgl-btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .lgl-footer-note { font-size: 0.75rem; color: rgba(255,255,255,0.2); text-align: center; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .lgl-main { grid-template-columns: 1fr; }
          .lgl-left { display: none; }
          .lgl-right { padding: 40px 24px; align-items: flex-start; padding-top: 48px; }
          .lgl-mobile-logo { display: flex; }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;