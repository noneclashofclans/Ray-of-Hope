import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/newLogo.png";
import vid3 from "../assets/vid3.mp4";
import axios from "axios";

const DonateBlood = () => {
  const [user, setUser] = useState(null);
  const [medicalData, setMedicalData] = useState({
    gender: "",
    age: "",
    hb: "",
    weight: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicalData({ ...medicalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const age = parseInt(medicalData.age);
    const weight = parseFloat(medicalData.weight);
    const hb = parseFloat(medicalData.hb);
    const gender = medicalData.gender;

    if (age < 18 || age > 65) return toast.error("Age must be between 18 and 65 years.");
    if (weight < 45) return toast.error("Weight must be at least 45kg.");
    if (hb > 20) return toast.error("Haemoglobin levels cannot exceed 20 g/dL.");
    if (gender === "Female" && hb < 12.5) return toast.error("Minimum Hb for women is 12.5 g/dL.");
    if (gender === "Male" && hb < 13.0) return toast.error("Minimum Hb for men is 13.0 g/dL.");

    const loading = toast.loading("Registering as donor...");

    const payload = {
      user: user._id || user.id,
      username: user.username,
      age,
      weight,
      hb,
      gender,
    };

    try {
      const response = await axios.post(
        "https://ray-of-hope-back.onrender.com/api/blood/donate",
        payload
      );
      toast.success(response.data.message || "Registration successful!", { id: loading });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to connect to server.";
      toast.error(errorMsg, { id: loading });
    }
  };

  if (!user) return null;

  return (
    <div className="db-root">
      <Toaster position="top-center" />

      {/* VIDEO BACKGROUND */}
      <div className="db-video-bg">
        <video autoPlay muted loop playsInline className="db-video">
          <source src={vid3} type="video/mp4" />
        </video>
        <div className="db-video-scrim" />
      </div>

      {/* NAV */}
      <nav className="roh-nav">
        <div className="roh-nav-inner">
          <Link className="roh-brand" to="/">
            <img src={logo} alt="Logo" width="30" height="30" className="roh-logo-img" />
            <span>Ray of <span className="roh-accent">Hope</span></span>
          </Link>
          <div style={{ marginLeft: "auto" }}>
            <Link to="/dashboard" className="roh-btn-ghost">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="db-main">
        <div className="db-container">

          {/* Page header */}
          <div className="db-page-header">
            <p className="roh-eyebrow">Blood Donation</p>
            <h1 className="db-page-h1">
              Register as a <span className="roh-accent-red">donor.</span>
            </h1>
            <p className="db-page-sub">
              Your details help us save lives across Odisha. Every drop counts.
            </p>
          </div>

          {/* Form card */}
          <div className="db-card">

            {/* Personal Info */}
            <div className="db-section-header">
              <span className="db-section-dot db-section-dot--green" />
              <span className="db-section-title">Personal Info</span>
            </div>
            <div className="db-form-grid db-form-grid--2 db-form-block">
              <div className="db-form-group">
                <label className="db-label">Full Name</label>
                <input
                  type="text"
                  className="db-input db-input--readonly"
                  value={user.username}
                  readOnly
                />
              </div>
              <div className="db-form-group">
                <label className="db-label">Phone</label>
                <input
                  type="text"
                  className="db-input db-input--readonly"
                  value={user.phone || "—"}
                  readOnly
                />
              </div>
            </div>

            {/* Divider */}
            <div className="db-divider" />

            {/* Medical Vitals */}
            <div className="db-section-header">
              <span className="db-section-dot db-section-dot--red" />
              <span className="db-section-title">Medical Vitals</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="db-form-grid db-form-grid--4 db-form-block">
                <div className="db-form-group">
                  <label className="db-label">Gender</label>
                  <select name="gender" className="db-input db-select" onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="db-form-group">
                  <label className="db-label">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="db-input"
                    placeholder="18 – 65"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="db-form-group">
                  <label className="db-label">Hb (g/dL)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="hb"
                    className="db-input"
                    placeholder="e.g. 13.5"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="db-form-group">
                  <label className="db-label">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    className="db-input"
                    placeholder="Min 45"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Eligibility hints */}
              <div className="db-hints">
                <span className="db-hint"><i className="bi bi-info-circle" /> Age 18–65</span>
                <span className="db-hint"><i className="bi bi-info-circle" /> Weight ≥ 45 kg</span>
                <span className="db-hint"><i className="bi bi-info-circle" /> Hb ≥ 12.5 (F) / 13.0 (M) g/dL</span>
              </div>

              <button type="submit" className="db-submit-btn">
                <i className="bi bi-droplet-fill" /> Submit Registration
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="roh-footer-mini">
        <span>© 2026 Ray of Hope Foundation, Odisha. Serving Cuttack &amp; Bhubaneswar.</span>
      </footer>

      <style>{`
        /* ── ROOT ── */
        .db-root { background: #0e0f0e; color: #f0f0ef; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; overflow-x: hidden; display: flex; flex-direction: column; }

        /* ── VIDEO ── */
        .db-video-bg { position: fixed; inset: 0; z-index: 0; }
        .db-video { width: 100%; height: 100%; object-fit: cover; opacity: 0.18; }
        .db-video-scrim { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(14,15,14,0.55) 0%, rgba(14,15,14,0.88) 100%); }

        /* ── NAV ── */
        .roh-nav { position: sticky; top: 0; z-index: 100; background: rgba(14,15,14,0.9); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .roh-nav-inner { max-width: 1160px; margin: 0 auto; padding: 0 28px; height: 60px; display: flex; align-items: center; gap: 32px; }
        .roh-brand { display: inline-flex; align-items: center; gap: 10px; font-size: 1rem; font-weight: 800; color: #f0f0ef; text-decoration: none; letter-spacing: -0.3px; flex-shrink: 0; }
        .roh-logo-img { border-radius: 50%; }
        .roh-accent { color: #4ade80; }
        .roh-accent-red { color: #f87171; }
        .roh-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #f87171; margin-bottom: 12px; }
        .roh-btn-ghost { background: transparent; color: rgba(255,255,255,0.6); font-size: 0.88rem; font-weight: 600; padding: 9px 18px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.14); cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: border-color .18s, color .18s; }
        .roh-btn-ghost:hover { border-color: rgba(255,255,255,0.4); color: #fff; }

        /* ── MAIN ── */
        .db-main { position: relative; z-index: 1; padding: 60px 0 80px; flex: 1; }
        .db-container { max-width: 760px; margin: 0 auto; padding: 0 28px; }

        /* Page header */
        .db-page-header { margin-bottom: 36px; }
        .db-page-h1 { font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 900; line-height: 1.07; letter-spacing: -0.03em; color: #fff; margin-bottom: 14px; }
        .db-page-sub { font-size: 0.93rem; color: rgba(255,255,255,0.42); line-height: 1.65; max-width: 460px; }

        /* Card */
        .db-card { border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; background: rgba(14,15,14,0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); padding: 44px; }

        /* Section headers */
        .db-section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .db-section-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .db-section-dot--green { background: #4ade80; }
        .db-section-dot--red { background: #f87171; }
        .db-section-title { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.3); }

        .db-divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 32px 0; }
        .db-form-block { margin-bottom: 0; }

        /* Form grid */
        .db-form-grid { display: grid; gap: 16px; }
        .db-form-grid--2 { grid-template-columns: 1fr 1fr; }
        .db-form-grid--4 { grid-template-columns: repeat(4, 1fr); }
        .db-form-group { display: flex; flex-direction: column; gap: 6px; }

        /* Labels & inputs */
        .db-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        .db-input { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #f0f0ef; font-size: 0.88rem; padding: 10px 14px; outline: none; transition: border-color .18s, background .18s; width: 100%; font-family: inherit; }
        .db-input:focus { border-color: #f87171; background: rgba(248,113,113,0.04); }
        .db-input::placeholder { color: rgba(255,255,255,0.18); }
        .db-input--readonly { opacity: 0.45; cursor: default; }
        .db-input--readonly:focus { border-color: rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); }
        .db-select { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.3)' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; cursor: pointer; }
        .db-select option { background: #1a1b1a; color: #f0f0ef; }
        input[type="number"]::-webkit-inner-spin-button { opacity: 0.3; }

        /* Hints */
        .db-hints { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; margin-bottom: 28px; }
        .db-hint { font-size: 0.73rem; color: rgba(255,255,255,0.28); display: flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 5px 12px; }
        .db-hint i { color: #f87171; font-size: 0.7rem; }

        /* Submit */
        .db-submit-btn { width: 100%; background: #f87171; color: #1a0505; font-size: 0.95rem; font-weight: 800; padding: 14px 24px; border-radius: 10px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: opacity .18s, transform .18s; letter-spacing: -0.1px; }
        .db-submit-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        /* Footer */
        .roh-footer-mini { position: relative; z-index: 1; border-top: 1px solid rgba(255,255,255,0.05); padding: 20px 28px; text-align: center; background: #080908; }
        .roh-footer-mini span { font-size: 0.76rem; color: rgba(255,255,255,0.18); }

        /* Responsive */
        @media (max-width: 640px) {
          .db-form-grid--2 { grid-template-columns: 1fr; }
          .db-form-grid--4 { grid-template-columns: 1fr 1fr; }
          .db-card { padding: 28px 20px; }
        }
      `}</style>
    </div>
  );
};

export default DonateBlood;