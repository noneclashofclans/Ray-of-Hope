import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import newLogo from "../assets/newLogo.png";
import vid3 from "../assets/vid3.mp4";
import newQR from '../assets/newQR.png';

const DonateMoney = () => {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleFileChange = (e) => setScreenshot(e.target.files[0]);

  const generateInvoice = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    const img = new Image();
    img.src = newLogo;

    img.onload = () => {
      doc.addImage(img, "PNG", 15, 10, 25, 25);
      doc.setFontSize(24); doc.setTextColor(46, 125, 50); doc.setFont(undefined, "bold");
      doc.text("RAY OF HOPE", 45, 22);
      doc.setFontSize(10); doc.setFont(undefined, "normal"); doc.setTextColor(100, 100, 100);
      doc.text("Bhubaneswar, Odisha | Help Line: +91 9425403369", 45, 28);
      doc.setDrawColor(46, 125, 50); doc.setLineWidth(0.8); doc.line(15, 40, 195, 40);
      doc.setFontSize(18); doc.setTextColor(0, 0, 0); doc.text("DONATION RECEIPT", 15, 55);
      doc.setFontSize(11); doc.text(`Date: ${date}`, 15, 65);
      doc.text(`Receipt No: ROH-${Math.floor(1000 + Math.random() * 9000)}`, 150, 65);
      doc.setFillColor(248, 249, 250); doc.rect(15, 75, 180, 45, "F");
      doc.text(`Donor: ${user?.username || "Valued Supporter"}`, 20, 85);
      doc.text(`Email: ${user?.email || "N/A"}`, 20, 95);
      doc.setFont(undefined, "bold"); doc.text(`Amount: INR ${amount}/-`, 20, 105);
      doc.save(`RayOfHope_Receipt_${user?.username || "Donation"}.pdf`);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !screenshot) return toast.error("Please fill all fields.");
    const loading = toast.loading("Processing...");
    setIsGenerating(true);
    setTimeout(() => {
      toast.success("Details Received!", { id: loading });
      setIsGenerating(false);
      if (window.confirm("Download Invoice?")) generateInvoice();
      navigate("/dashboard");
    }, 2500);
  };

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

      <nav className="navbar navbar-expand-lg sticky-top border-bottom" style={{
        background: "rgba(14, 15, 14, 0.88)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(255, 255, 255, 0.06) !important"
      }}>
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center fw-bold text-white m-0" to="/">
            <img
              src={newLogo}
              alt="Logo"
              width="30"
              height="30"
              className="rounded-circle me-2"
            />
            <span style={{ letterSpacing: "-0.3px" }}>
              Ray of <span className="roh-accent" style={{ color: "#4ade80" }}>Hope</span>
            </span>
          </Link>

          <div className="ms-auto">
            <Link
              className="btn btn-outline-light border-1 opacity-75 hover-opacity-100"
              to="/dashboard"
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                borderRadius: "10px",
                borderColor: "rgba(255, 255, 255, 0.14)"
              }}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN DONATION SECTION */}
      <main className="roh-container donate-main-section">
        <div className="donate-flex-box">
          <div className="donate-glass-card">
            <div className="donate-header">
              <div className="roh-beta-badge">
                <span className="roh-badge-dot" /> Secure NGO Portal
              </div>
              <h1 className="donate-h1">Support <span className="roh-accent">Us.</span></h1>
              <p className="gallery-sub">Join our mission to serve Odisha. Scan the UPI QR below to contribute.</p>
            </div>

            <div className="qr-wrapper">
              <div className="qr-card">
                <img src={newQR} alt="UPI QR" className="qr-image" />
                <div className="qr-text">
                  <div className="qr-name">ଆଶା କିରଣ</div>
                  <div className="qr-upi">UPI: rishitmohanty3@pingpay</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="donate-form">
              <div className="roh-input-group">
                <label className="roh-label">Amount Paid (₹)</label>
                <input
                  type="number"
                  className="roh-field"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="roh-input-group">
                <label className="roh-label">Payment Screenshot</label>
                <input
                  type="file"
                  className="roh-field file-field"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <button type="submit" disabled={isGenerating} className="roh-btn-primary donate-btn">
                {isGenerating ? "VERIFYING..." : "SUBMIT DONATION"}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* FULL THEMED FOOTER */}
      <footer className="roh-footer">
        <div className="roh-container roh-footer-grid">
          <div>
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
        </div>
        <div className="roh-footer-bottom">
          <span>© 2026 Ray of Hope Foundation, Cuttack. All rights reserved.</span>
        </div>
      </footer>

      <style>{`
        .roh-root { background: #0e0f0e; color: #f0f0ef; min-height: 100vh; display: flex; flex-direction: column; font-family: -apple-system, sans-serif; overflow-x: hidden; }
        .roh-accent { color: #4ade80; }
        .roh-container { max-width: 1160px; margin: 0 auto; padding: 0 28px; width: 100%; }

        /* VIDEO BG */
        .gallery-video-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
        .gallery-video { width: 100%; height: 100%; object-fit: cover; }
        .gallery-video-scrim { position: absolute; inset: 0; background: rgba(14,15,14,0.85); }

        /* NAV */
        .roh-nav { position: sticky; top: 0; z-index: 100; background: rgba(14,15,14,0.88); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .roh-nav-inner { height: 60px; display: flex; align-items: center; }
        .roh-brand { display: flex; align-items: center; gap: 10px; font-weight: 800; color: #f0f0ef; text-decoration: none; letter-spacing: -0.3px; }
        .roh-logo-img { border-radius: 50%; }

        /* DONATION POSITIONING */
        .donate-main-section { position: relative; z-index: 1; flex: 1; display: flex; align-items: center; justify-content: center; padding: 80px 28px; }
        .donate-flex-box { width: 100%; max-width: 460px; }
        
        .donate-glass-card { 
          background: rgba(255, 255, 255, 0.02); 
          backdrop-filter: blur(25px); 
          border: 1px solid rgba(255,255,255,0.08); 
          border-radius: 32px; 
          padding: 48px 40px; 
          text-align: center;
          box-shadow: 0 40px 100px rgba(0,0,0,0.5);
        }

        .donate-h1 { font-size: 2.5rem; font-weight: 900; color: #fff; margin: 12px 0; letter-spacing: -0.02em; }
        .gallery-sub { font-size: 0.95rem; color: rgba(255,255,255,0.5); line-height: 1.6; max-width: 320px; margin: 0 auto 24px; }

        .roh-beta-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 6px 14px; font-size: 0.65rem; font-weight: 700; color: rgba(255,255,255,0.6); text-transform: uppercase; }
        .roh-badge-dot { width: 6px; height: 6px; background: #4ade80; border-radius: 50%; }

        /* QR SECTION */
        .qr-wrapper { margin-bottom: 32px; }
        .qr-card { background: #fff; padding: 16px; border-radius: 20px; display: inline-block; box-shadow: 0 10px 40px rgba(0,0,0,0.4); }
        .qr-image { width: 160px; height: 160px; border-radius: 8px; margin-bottom: 12px; display: block; }
        .qr-name { color: #0a0f0a; font-weight: 800; font-size: 1.1rem; }
        .qr-upi { color: #666; font-size: 0.7rem; font-weight: 600; }

        /* FORM FIELDS */
        .donate-form { text-align: left; }
        .roh-input-group { margin-bottom: 20px; }
        .roh-label { display: block; font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.05em; }
        .roh-field { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 14px; color: #fff; font-size: 0.95rem; transition: all 0.2s; }
        .roh-field:focus { outline: none; border-color: #4ade80; background: rgba(255,255,255,0.08); }
        .file-field { font-size: 0.8rem; color: rgba(255,255,255,0.5); }

        .donate-btn { width: 100%; padding: 16px; justify-content: center; font-size: 0.95rem; margin-top: 10px; box-shadow: 0 10px 20px rgba(74,222,128,0.15); }
        .roh-btn-primary { background: #4ade80; color: #0a0f0a; font-weight: 800; border-radius: 12px; border: none; cursor: pointer; display: inline-flex; align-items: center; transition: opacity .2s; text-decoration: none; }
        .roh-btn-primary:hover { opacity: 0.9; }

        .roh-btn-ghost { background: transparent; color: rgba(255,255,255,0.6); font-size: 0.85rem; font-weight: 600; padding: 8px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.14); text-decoration: none; transition: all .2s; }
        .roh-btn-ghost:hover { border-color: rgba(255,255,255,0.4); color: #fff; }

        /* FOOTER */
        .roh-footer { background: #080908; border-top: 1px solid rgba(255,255,255,0.05); padding: 60px 0 0; position: relative; z-index: 1; }
        .roh-footer-grid { display: grid; grid-template-columns: 1.8fr 1fr 1.6fr; gap: 36px; padding-bottom: 44px; }
        .roh-footer-tagline { font-size: 0.82rem; color: rgba(255,255,255,0.3); line-height: 1.6; margin: 10px 0 14px; max-width: 200px; }
        .roh-footer-social { color: rgba(255,255,255,0.3); font-size: 1.1rem; text-decoration: none; transition: color .18s; }
        .roh-footer-social:hover { color: #4ade80; }
        .roh-footer-col-title { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.22); margin-bottom: 14px; }
        .roh-footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
        .roh-footer-links a, .roh-footer-links span { color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.86rem; transition: color .18s; }
        .roh-footer-links a:hover { color: #f0f0ef; }
        .roh-footer-contact li { font-size: 0.82rem; color: rgba(255,255,255,0.4); display: flex; align-items: flex-start; gap: 8px; }
        .roh-footer-contact li i { color: #4ade80; font-size: 0.82rem; margin-top: 2px; }
        .roh-footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding: 24px 28px; text-align: center; }
        .roh-footer-bottom span { font-size: 0.75rem; color: rgba(255,255,255,0.18); }

        @media (max-width: 768px) {
          .roh-footer-grid { grid-template-columns: 1fr; gap: 40px; }
          .donate-glass-card { padding: 32px 24px; }
          .donate-h1 { font-size: 2rem; }
        }
      `}</style>
    </div>
  );
};

export default DonateMoney;