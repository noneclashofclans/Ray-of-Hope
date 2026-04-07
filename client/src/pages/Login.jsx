import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import newLogo from "../assets/newLogo.png";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Verifying credentials...");
    try {
      const response = await axios.post(
        "https://ray-of-hope-back.onrender.com/api/auth/login",
        { email: formData.email, password: formData.password }
      );
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(`Welcome back, ${user.username}!`, { id: loadingToast });
        setTimeout(() => navigate("/dashboard"), 1800);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", { id: loadingToast });
      setLoading(false);
    }
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
        <Link className="lgl-back-link" to="/">
          ← Back to home
        </Link>
      </nav>

      {/* MAIN */}
      <main className="lgl-main">
        {/* LEFT PANEL */}
        <div className="lgl-left">
          <div className="lgl-left-inner">
            <p className="lgl-eyebrow">Welcome back</p>
            <h1 className="lgl-left-h1">
              Back to<br />making a<br /><span className="lgl-accent">difference.</span>
            </h1>
            <p className="lgl-left-sub">
              Access your dashboard, track projects, and continue your work with Ray of Hope across Odisha.
            </p>
            <div className="lgl-trust-row">
              {[["100+", "Lives touched"], ["50+", "Blood donors"], ["40+", "Volunteers"]].map(([n, l]) => (
                <div key={l} className="lgl-trust-stat">
                  <span className="lgl-trust-num">{n}</span>
                  <span className="lgl-trust-label">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — FORM */}
        <div className="lgl-right">
          <div className="lgl-form-card">      

            <h2 className="lgl-form-title">Sign in</h2>
            <p className="lgl-form-sub">Enter your credentials to continue.</p>

            <form onSubmit={handleSubmit}>
              <div className="lgl-field">
                <label className="lgl-label">Email address</label>
                <div className="lgl-input-wrap">
                  <i className="bi bi-envelope lgl-input-icon" />
                  <input
                    type="email"
                    name="email"
                    className="lgl-input"
                    placeholder="name@example.com"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="lgl-field">
                <label className="lgl-label">Password</label>
                <div className="lgl-input-wrap">
                  <i className="bi bi-lock lgl-input-icon" />
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
                {loading ? "Signing in…" : "Sign in →"}
              </button>
            </form>

            <p className="lgl-register-link">
              No account?{" "}
              <Link to="/register" className="lgl-link">Create one free</Link>
            </p>

            <div className="lgl-divider">
              <span className="lgl-divider-line" />
              <span className="lgl-divider-text">Management only</span>
              <span className="lgl-divider-line" />
            </div>

            <button className="lgl-btn-admin" onClick={() => navigate("/admin-login")}>
              <i className="bi bi-shield-lock lgl-admin-icon" />
              Admin login
            </button>
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
        .lgl-trust-row { display: flex; gap: 0; border-top: 1px solid rgba(255,255,255,0.07); padding-top: 32px; }
        .lgl-trust-stat { flex: 1; padding-right: 24px; }
        .lgl-trust-stat:not(:last-child) { border-right: 1px solid rgba(255,255,255,0.07); margin-right: 24px; }
        .lgl-trust-num { display: block; font-size: 1.6rem; font-weight: 900; color: #4ade80; letter-spacing: -0.02em; }
        .lgl-trust-label { display: block; font-size: 0.72rem; color: rgba(255,255,255,0.35); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.05em; }

        /* RIGHT */
        .lgl-right { display: flex; align-items: center; justify-content: center; padding: 48px 32px; background: #0e0f0e; }
        .lgl-form-card { width: 100%; max-width: 400px; }
        .lgl-mobile-logo { display: none; align-items: center; gap: 10px; margin-bottom: 32px; }
        .lgl-brand-text { font-size: 1rem; font-weight: 800; color: #f0f0ef; }
        .lgl-form-title { font-size: 1.9rem; font-weight: 900; color: #f0f0ef; letter-spacing: -0.03em; margin-bottom: 6px; }
        .lgl-form-sub { font-size: 0.88rem; color: rgba(255,255,255,0.38); margin-bottom: 36px; }

        /* FIELDS */
        .lgl-field { margin-bottom: 18px; }
        .lgl-label { display: block; font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.5); letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 8px; }
        .lgl-input-wrap { position: relative; }
        .lgl-input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 0.9rem; color: rgba(255,255,255,0.25); pointer-events: none; }
        .lgl-input { width: 100%; background: #161716; border: 1px solid rgba(255,255,255,0.09); border-radius: 9px; color: #f0f0ef; font-size: 0.93rem; padding: 12px 14px 12px 40px; outline: none; transition: border-color .18s, background .18s; }
        .lgl-input::placeholder { color: rgba(255,255,255,0.2); }
        .lgl-input:focus { border-color: rgba(74,222,128,0.5); background: #1a1b1a; }

        /* SUBMIT */
        .lgl-btn-submit { width: 100%; background: #4ade80; color: #0a0f0a; font-size: 0.95rem; font-weight: 800; padding: 13px 20px; border-radius: 9px; border: none; cursor: pointer; margin-top: 8px; margin-bottom: 20px; letter-spacing: -0.1px; transition: opacity .18s; }
        .lgl-btn-submit:hover:not(:disabled) { opacity: 0.85; }
        .lgl-btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .lgl-register-link { font-size: 0.85rem; color: rgba(255,255,255,0.35); text-align: center; margin-bottom: 28px; }
        .lgl-link { color: #4ade80; text-decoration: none; font-weight: 700; }
        .lgl-link:hover { text-decoration: underline; }

        /* DIVIDER */
        .lgl-divider { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
        .lgl-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .lgl-divider-text { font-size: 0.72rem; color: rgba(255,255,255,0.25); white-space: nowrap; text-transform: uppercase; letter-spacing: 0.06em; }

        /* ADMIN BTN */
        .lgl-btn-admin { width: 100%; background: transparent; color: rgba(255,255,255,0.5); font-size: 0.85rem; font-weight: 600; padding: 11px 20px; border-radius: 9px; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: border-color .18s, color .18s; }
        .lgl-btn-admin:hover { border-color: rgba(255,255,255,0.3); color: #f0f0ef; }
        .lgl-admin-icon { font-size: 0.85rem; }

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

export default Login;