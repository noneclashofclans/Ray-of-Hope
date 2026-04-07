import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import newLogo from "../assets/newLogo.png";
import vid3 from "../assets/vid3.mp4";
import axios from "axios";
import MemberIDCard from "../components/MemberIDCard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState("Not Verified");
  const [fullMemberData, setFullMemberData] = useState(null);
  const [memberData, setMemberData] = useState({
    aadharName: "",
    aadharNumber: "",
    dob: "",
    address: "",
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

  useEffect(() => {
    const fetchMemberStatus = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(
          `https://ray-of-hope-back.onrender.com/api/members/status/${user._id}`
        );
        if (res.data) {
          setMembershipStatus(res.data.status || "Not Verified");
          setFullMemberData(res.data);
        }
      } catch (err) {
        if (err.response?.status === 404) setMembershipStatus("Not Verified");
        else setMembershipStatus("Not Verified");
      }
    };
    fetchMemberStatus();
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out");
    setTimeout(() => navigate("/login"), 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "aadharNumber") {
      const formatted = value.replace(/\D/g, "").slice(0, 12).replace(/(\d{4})/g, '$1 ').trim();
      setMemberData({ ...memberData, aadharNumber: formatted });
    } else {
      setMemberData({ ...memberData, [name]: value });
    }
  };

  const handleMembershipSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Submitting...");
    try {
      await axios.post("https://ray-of-hope-back.onrender.com/api/members/enroll", {
        user: user._id,
        memberName: memberData.aadharName,
        aadharNumber: memberData.aadharNumber.replace(/\s+/g, ""),
        dob: memberData.dob,
        address: memberData.address,
      });
      toast.success("Submitted successfully!", { id: loading });
      setMembershipStatus("Pending");
    } catch (error) {
      toast.error("Failed to submit", { id: loading });
    }
  };

  if (!user) return null;
  const statusAccent = (() => {
    switch (membershipStatus) {
      case "Verified": return { color: "#4ade80", label: "Verified" };
      case "Pending":  return { color: "#facc15", label: "Pending" };
      case "Rejected": return { color: "#f87171", label: "Rejected" };
      default:         return { color: "rgba(255,255,255,0.3)", label: "Unverified" };
    }
  })();

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

      {/* NAVIGATION */}
      <nav className="roh-nav">
        <div className="roh-nav-inner justify-content-between">
          <Link className="roh-brand" to="/">
            <img src={newLogo} alt="Logo" width="30" height="30" className="roh-logo-img" />
            <span>Ray of <span className="roh-accent">Hope</span></span>
          </Link>
          
          <div className="roh-nav-links d-none d-lg-flex">
            {["Home", "About", "Impact", "Gallery"].map(item => (
              <Link key={item} className="roh-navlink" to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>{item}</Link>
            ))}
          </div>

          <div className="roh-nav-actions d-none d-lg-flex">
            <div className="dropdown">
              <button className="roh-btn-ghost dropdown-toggle" data-bs-toggle="dropdown">
                <div className="roh-avatar-sm">{user.username.charAt(0).toUpperCase()}</div>
                {user.username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end roh-dropdown">
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>

          {/* THE FIXED HAMBURGER BUTTON */}
          <button 
            className="navbar-toggler roh-toggler d-lg-none shadow-none border-0 px-2" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#dbMobileNav"
          >
            <i className="bi bi-list" style={{ color: "#ffffff", fontSize: "2.2rem", lineHeight: "1" }}></i>
          </button>
        </div>
        
        {/* MOBILE COLLAPSE MENU */}
        <div className="collapse roh-mobile-nav d-lg-none" id="dbMobileNav">
          {["Home", "About", "Impact", "Gallery"].map(item => (
            <Link key={item} className="roh-mobile-link" to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>{item}</Link>
          ))}
          <div className="mt-3 pt-3 border-top border-secondary border-opacity-25">
            <div className="d-flex align-items-center gap-3 mb-3 text-white fw-bold">
                <div className="roh-avatar-sm">{user.username.charAt(0).toUpperCase()}</div>
                <span>{user.username}</span>
            </div>
            <button className="roh-btn-primary w-100 justify-content-center" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="db-main-content">
        <div className="container py-4 py-lg-5">
          
          {/* HERO SECTION */}
          <div className="db-glass-card mb-4">
            <div className="row align-items-center g-4 text-center text-lg-start">
              <div className="col-lg-8 order-2 order-lg-1">
                <p className="roh-eyebrow">Volunteer Portal</p>
                <h1 className="display-5 fw-900 mb-3 text-white">Welcome, <span className="roh-accent">{user.username}</span></h1>
                <p className="opacity-50 mb-4 mx-auto mx-lg-0" style={{ maxWidth: "400px" }}>Track your verification status and access community tools.</p>
                <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                  <button className="roh-btn-primary" onClick={() => navigate("/donateBlood")}>Donate Blood →</button>
                  <button className="roh-btn-ghost" onClick={() => navigate("/money")}>Fund Mission</button>
                </div>
              </div>
              <div className="col-lg-4 order-1 order-lg-2 d-flex justify-content-center justify-content-lg-end">
                <div className="status-indicator">
                  <small className="status-tag">MEMBERSHIP STATUS</small>
                  <div className="status-value" style={{ color: statusAccent.color }}>{statusAccent.label}</div>
                  <div className="status-dot-pulse" style={{ backgroundColor: statusAccent.color }} />
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC CONTENT AREA */}
          {membershipStatus === "Verified" ? (
            <div className="db-glass-card text-center py-5">
              <p className="roh-eyebrow">Membership</p>
              <h2 className="fw-900 mb-2 text-white">Digital <span className="roh-accent">ID Card</span></h2>
              <p className="opacity-50 mb-4">Your official volunteer identity is active.</p>
              <div className="id-card-viewport">
                 <MemberIDCard memberData={fullMemberData} user={user} />
              </div>
            </div>
          ) : membershipStatus === "Pending" ? (
            <div className="db-glass-card text-center py-5">
              <i className="bi bi-hourglass-split text-warning" style={{ fontSize: "3rem" }}></i>
              <h2 className="fw-900 mt-3 text-white">Verification in <span className="roh-accent">Progress</span></h2>
              <p className="opacity-50">Our team in Cuttack is reviewing your Aadhar details.</p>
            </div>
          ) : (
            <div className="db-glass-card">
              <div className="row g-5">
                {/* Sidebar text */}
                <div className="col-lg-5">
                  <p className="roh-eyebrow">Enrollment</p>
                  <h2 className="fw-900 mb-3 text-white">Become a <span className="roh-accent">Member</span></h2>
                  
                  {membershipStatus === "Rejected" && (
                    <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-white-50 small mb-4">
                      <i className="bi bi-exclamation-triangle-fill text-danger me-2" />
                      Your previous application was rejected. Please review and re-submit.
                    </div>
                  )}

                  <p className="opacity-50 mb-4">Get your official Ray of Hope Volunteer ID by verifying your identity with Aadhar.</p>
                  <ul className="list-unstyled d-flex flex-column gap-2 opacity-75 small">
                    <li><i className="bi bi-check-circle-fill roh-accent me-2" /> Priority Blood Request Access</li>
                    <li><i className="bi bi-check-circle-fill roh-accent me-2" /> Certificate of Volunteering</li>
                    <li><i className="bi bi-check-circle-fill roh-accent me-2" /> Field Operations Access</li>
                  </ul>
                </div>
                
                {/* Form */}
                <div className="col-lg-7">
                  <form onSubmit={handleMembershipSubmit} className="db-form">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="db-form-label">Full Name</label>
                        <input type="text" name="aadharName" className="db-form-input" required onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="db-form-label">Aadhar Number</label>
                        <input type="text" name="aadharNumber" className="db-form-input" value={memberData.aadharNumber} required onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="db-form-label">Date of Birth</label>
                        <input type="date" name="dob" className="db-form-input" required onChange={handleInputChange} />
                      </div>
                      <div className="col-12">
                        <label className="db-form-label">Full Address</label>
                        <textarea name="address" className="db-form-input" rows="3" required onChange={handleInputChange} />
                      </div>
                    </div>
                    <button type="submit" className="roh-btn-primary w-100 mt-4 py-3 justify-content-center">
                      {membershipStatus === "Rejected" ? "Re-submit Application →" : "Submit Application →"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="roh-footer mt-auto">
        <div className="container py-5">
          <div className="row g-4 text-center text-lg-start align-items-center">
            <div className="col-lg-4">
              <Link className="roh-brand mb-2 d-inline-flex" to="/">
                <img src={newLogo} alt="Logo" width="28" height="28" className="roh-logo-img me-2" />
                <span>Ray of <span className="roh-accent">Hope</span></span>
              </Link>
              <p className="small opacity-25 m-0">Serving Odisha since 2022.</p>
            </div>
            <div className="col-lg-8 text-lg-end">
                <p className="small opacity-25 m-0">© 2026 Ray of Hope Foundation, Cuttack. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        /* Global & Reset */
        .db-root { background: #0e0f0e; color: #f0f0ef; min-height: 100vh; display: flex; flex-direction: column; overflow-x: hidden; font-family: -apple-system, sans-serif; }
        .roh-accent { color: #4ade80; }
        .fw-900 { font-weight: 900; }
        .roh-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #4ade80; margin-bottom: 12px; }
        
        /* Video Background */
        .db-video-bg { position: fixed; inset: 0; z-index: 0; }
        .db-video { width: 100%; height: 100%; object-fit: cover; opacity: 0.12; }
        .db-video-scrim { position: absolute; inset: 0; background: radial-gradient(circle, transparent 0%, #0e0f0e 100%); }

        /* Nav */
        .roh-nav { position: sticky; top: 0; z-index: 1000; background: rgba(14,15,14,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .roh-nav-inner { max-width: 1160px; margin: 0 auto; height: 70px; display: flex; align-items: center; }
        .roh-brand { font-size: 1.1rem; font-weight: 800; text-decoration: none; color: #fff; display:flex; align-items: center; }
        .roh-navlink { color: rgba(255,255,255,0.5); text-decoration: none; padding: 8px 16px; font-size: 0.9rem; transition: 0.2s; border-radius: 8px; }
        .roh-navlink:hover { color: #fff; background: rgba(255,255,255,0.05); }
        
        /* Mobile Nav */
        .roh-toggler { background: transparent; cursor: pointer; }
        .roh-mobile-nav { background: #0e0f0e; padding: 0 24px 24px; border-top: 1px solid rgba(255,255,255,0.05); }
        .roh-mobile-link { display: block; color: rgba(255,255,255,0.6); text-decoration: none; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 1rem; }
        
        /* Avatar & Dropdown */
        .roh-avatar-sm { width: 30px; height: 30px; background: #4ade80; color: #0a0f0a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; }
        .roh-dropdown { background: #1a1b1a; border: 1px solid rgba(255,255,255,0.1); }
        .roh-dropdown .dropdown-item { color: rgba(255,255,255,0.65); font-size: 0.88rem; }
        .roh-dropdown .dropdown-item:hover { background: rgba(255,255,255,0.06); color: #fff; }

        /* Glass Cards */
        .db-main-content { position: relative; z-index: 1; flex: 1; }
        .db-glass-card { 
          background: rgba(255,255,255,0.02); 
          border: 1px solid rgba(255,255,255,0.08); 
          backdrop-filter: blur(20px); 
          border-radius: 24px; 
          padding: 40px; 
        }

        /* Status Indicator */
        .status-indicator { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 24px; border-radius: 20px; text-align: center; width: 100%; max-width: 220px; }
        .status-tag { display: block; font-size: 0.65rem; letter-spacing: 1px; opacity: 0.5; margin-bottom: 8px; font-weight: 700; }
        .status-value { font-size: 1.25rem; font-weight: 800; margin-bottom: 12px; }
        .status-dot-pulse { width: 10px; height: 10px; border-radius: 50%; margin: 0 auto; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(0.9); opacity: 1; } 70% { transform: scale(1.5); opacity: 0; } 100% { transform: scale(0.9); opacity: 0; } }

        /* Form Styling */
        .db-form-label { font-size: 0.7rem; font-weight: 700; opacity: 0.5; text-transform: uppercase; margin-bottom: 8px; display: block; letter-spacing: 0.05em; }
        .db-form-input { 
          width: 100%; 
          background: rgba(255,255,255,0.05); 
          border: 1px solid rgba(255,255,255,0.1); 
          border-radius: 12px; 
          padding: 14px 16px; 
          color: #fff; 
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .db-form-input:focus { outline: none; border-color: #4ade80; background: rgba(74,222,128,0.03); }
        .db-form-input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; cursor: pointer; }

        /* Buttons */
        .roh-btn-primary { background: #4ade80; color: #000; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 800; font-size: 0.9rem; transition: 0.2s; text-decoration: none; display: inline-flex; align-items: center; }
        .roh-btn-primary:hover { transform: translateY(-2px); opacity: 0.9; }
        .roh-btn-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 12px 24px; border-radius: 12px; font-weight: 600; font-size: 0.9rem; text-decoration: none; transition: 0.2s; display: inline-flex; align-items: center; gap: 8px; }
        .roh-btn-ghost:hover { border-color: rgba(255,255,255,0.4); }

        .id-card-viewport { overflow-x: auto; padding: 10px 0; display: flex; justify-content: center; }
        .roh-footer { background: #080908; border-top: 1px solid rgba(255,255,255,0.05); position: relative; z-index: 1; }

        /* Mobile specific padding */
        @media (max-width: 768px) {
          .db-glass-card { padding: 32px 20px; }
          .id-card-viewport { justify-content: flex-start; } /* Allows horizontal scroll on phones without cutting off edge */
        }
      `}</style>
    </div>
  );
};

export default Dashboard;