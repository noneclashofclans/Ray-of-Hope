import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import newLogo from "../assets/newLogo.png";
import vid3 from "../assets/vid3.mp4"; // Reusing the background video

const AdminPanel = () => {
    const [adminUser, setAdminUser] = useState(() => {
        const saved = localStorage.getItem("admin");
        return saved ? JSON.parse(saved) : null;
    });

    const [activeTab, setActiveTab] = useState("members"); 
    const [applications, setApplications] = useState([]);
    const [donors, setDonors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            if (activeTab === "members") {
                const res = await axios.get("https://ray-of-hope-back.onrender.com/api/members/admin/applications");
                setApplications(res.data);
            } else {
                const res = await axios.get("https://ray-of-hope-back.onrender.com/api/blood/admin/donors");
                setDonors(res.data);
            }
        } catch (err) {
            toast.error(`Failed to load ${activeTab} data.`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!adminUser || !adminUser.isAdmin) {
            navigate("/admin-login");
        } else {
            fetchData();
        }
    }, [navigate, activeTab, adminUser]);

    const handleUpdateStatus = async (id, newStatus, type) => {
        const loading = toast.loading(`Updating status...`);
        try {
            const url = type === 'member' 
                ? `https://ray-of-hope-back.onrender.com/api/members/admin/update-status/${id}`
                : `https://ray-of-hope-back.onrender.com/api/blood/admin/update/${id}`;
            
            await axios.put(url, { status: newStatus });
            toast.success(`Request marked as ${newStatus}`, { id: loading });
            fetchData(); 
        } catch (err) {
            toast.error("Status update failed.", { id: loading });
        }
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm("WARNING: This will permanently delete this record from the Bhubaneswar server. Continue?")) return;
        
        const loading = toast.loading("Deleting record...");
        try {
            const url = type === 'member'
                ? `https://ray-of-hope-back.onrender.com/api/members/admin/delete-member/${id}`
                : `https://ray-of-hope-back.onrender.com/api/blood/admin/delete-donor/${id}`;

            await axios.delete(url);
            toast.success("Record deleted successfully", { id: loading });
            fetchData();
        } catch (err) {
            toast.error("Delete failed.", { id: loading });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin"); 
        localStorage.removeItem("adminToken");
        navigate("/admin-login"); 
    };

    if (isLoading && !applications.length && !donors.length) {
        return (
            <div className="admin-root d-flex justify-content-center align-items-center">
                <div className="spinner-border" style={{ color: "#4ade80" }} role="status"></div>
            </div>
        );
    }

    return (
        <div className="admin-root">
            <Toaster position="top-right" />

            {/* VIDEO BACKGROUND */}
            <div className="admin-video-bg">
                <video autoPlay muted loop playsInline className="admin-video">
                    <source src={vid3} type="video/mp4" />
                </video>
                <div className="admin-video-scrim" />
            </div>

            {/* ADMIN NAVBAR */}
            <nav className="roh-nav">
                <div className="roh-nav-inner justify-content-between">
                    <Link className="roh-brand" to="/admin">
                        <img src={newLogo} alt="Logo" width="30" height="30" className="roh-logo-img" />
                        <span>Ray of Hope </span>
                    </Link>
                    <div className="d-flex align-items-center gap-3">
                        <div className="d-none d-md-flex align-items-center gap-2 text-white-50 small me-3">
                            <i className="bi bi-shield-lock-fill text-success"></i> Secure Server
                        </div>
                        <button className="roh-btn-ghost text-danger border-danger" style={{ borderColor: 'rgba(220, 53, 69, 0.4)' }} onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right"></i> Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container py-5" style={{ position: 'relative', zIndex: 1 }}>
                
                {/* HEADER SECTION */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
                    <div>
                        <p className="roh-eyebrow mb-1">Control Panel</p>
                        <h2 className="display-6 fw-900 text-white mb-0">
                            Welcome, <span className="roh-accent">Admin.</span>
                        </h2>
                    </div>
                    
                    {/* CUSTOM TABS */}
                    <div className="admin-tabs">
                        <button 
                            className={`admin-tab ${activeTab === 'members' ? 'active-members' : ''}`}
                            onClick={() => setActiveTab('members')}
                        >
                            Member Requests
                        </button>
                        <button 
                            className={`admin-tab ${activeTab === 'blood' ? 'active-blood' : ''}`}
                            onClick={() => setActiveTab('blood')}
                        >
                            Blood Donors
                        </button>
                    </div>
                </div>

                {/* MAIN CARD */}
                <div className="admin-glass-card">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                        {/* SEARCH */}
                        <div className="admin-search-wrapper w-100" style={{ maxWidth: '400px' }}>
                            <i className="bi bi-search search-icon"></i>
                            <input 
                                type="text" 
                                className="admin-search-input" 
                                placeholder={activeTab === 'members' ? "Search by name or Aadhar..." : "Search by donor name..."} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="admin-stat-badge">
                            Total {activeTab}: <span className="text-white fw-bold">{activeTab === 'members' ? applications.length : donors.length}</span>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="table-responsive">
                        <table className="table admin-table mb-0 text-nowrap align-middle">
                            <thead>
                                {activeTab === 'members' ? (
                                    <tr>
                                        <th className="ps-4">User Details</th>
                                        <th>Aadhar Name</th>
                                        <th>Aadhar Number</th>
                                        <th>Status</th>
                                        <th className="text-center pe-4">Action</th>
                                    </tr>
                                ) : (
                                    <tr>
                                        <th className="ps-4">Donor Name</th>
                                        <th>Vitals (Hb/Wt)</th>
                                        <th>Age/Gender</th>
                                        <th>Status</th>
                                        <th className="text-center pe-4">Action</th>
                                    </tr>
                                )}
                            </thead>
                            <tbody>
                                {activeTab === 'members' ? (
                                    applications
                                        .filter(app => app.memberName?.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((app) => (
                                        <tr key={app._id}>
                                            <td className="ps-4">
                                                <div className="fw-bold text-white">{app.user?.username || "N/A"}</div>
                                                <div className="small text-white-50">{app.user?.email}</div>
                                            </td>
                                            <td style={{color:"white"}}>{app.memberName}</td>
                                            <td><code className="text-white-50 bg-dark px-2 py-1 rounded">{app.aadharNumber}</code></td>
                                            <td>
                                                <span className={`status-badge ${app.status === 'Verified' ? 'badge-success' : app.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="text-center pe-4">
                                                <div className="d-flex justify-content-center gap-2">
                                                    {app.status === 'Pending' && (
                                                        <>
                                                            <button className="admin-action-btn btn-approve" onClick={() => handleUpdateStatus(app._id, 'Verified', 'member')} title="Approve"><i className="bi bi-check-lg"></i></button>
                                                            <button className="admin-action-btn btn-reject" onClick={() => handleUpdateStatus(app._id, 'Rejected', 'member')} title="Reject"><i className="bi bi-x-lg"></i></button>
                                                        </>
                                                    )}
                                                    <button className="admin-action-btn btn-delete" onClick={() => handleDelete(app._id, 'member')} title="Delete Permanently"><i className="bi bi-trash3"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    donors
                                        .filter(donor => donor.username?.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((donor) => (
                                        <tr key={donor._id}>
                                            <td className="ps-4">
                                                <div className="fw-bold text-white">{donor.username}</div>
                                                <div className="small text-white-50">{donor.user?.phone}</div>
                                            </td>
                                            <td>
                                                <span className="info-badge me-2">Hb: {donor.hb}</span>
                                                <span className="info-badge">Wt: {donor.weight}kg</span>
                                            </td>
                                            <td style={{color:"white"}}>{donor.age} yrs / {donor.gender}</td>
                                            <td>
                                                <span className={`status-badge ${donor.status === 'Approved' ? 'badge-success' : donor.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>
                                                    {donor.status}
                                                </span>
                                            </td>
                                            <td className="text-center pe-4">
                                                <div className="d-flex justify-content-center gap-2">
                                                    {donor.status === 'Pending' && (
                                                        <>
                                                            <button className="admin-action-btn btn-approve" onClick={() => handleUpdateStatus(donor._id, 'Approved', 'blood')} title="Approve"><i className="bi bi-check-lg"></i></button>
                                                            <button className="admin-action-btn btn-reject" onClick={() => handleUpdateStatus(donor._id, 'Rejected', 'blood')} title="Reject"><i className="bi bi-x-lg"></i></button>
                                                        </>
                                                    )}
                                                    <button className="admin-action-btn btn-delete" onClick={() => handleDelete(donor._id, 'blood')} title="Delete Permanently"><i className="bi bi-trash3"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                
                                {/* Empty State Fallbacks */}
                                {activeTab === 'members' && applications.length === 0 && !isLoading && (
                                    <tr><td colSpan="5" className="text-center py-5 text-white-50">No member applications found.</td></tr>
                                )}
                                {activeTab === 'blood' && donors.length === 0 && !isLoading && (
                                    <tr><td colSpan="5" className="text-center py-5 text-white-50">No blood donors found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <style>{`
                /* Global Root */
                .admin-root { background: #0e0f0e; color: #f0f0ef; min-height: 100vh; display: flex; flex-direction: column; font-family: -apple-system, sans-serif; }
                .roh-accent { color: #4ade80; }
                .fw-900 { font-weight: 900; }
                .roh-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #4ade80; margin-bottom: 12px; }

                /* Video Background */
                .admin-video-bg { position: fixed; inset: 0; z-index: 0; }
                .admin-video { width: 100%; height: 100%; object-fit: cover; opacity: 0.15; filter: grayscale(50%); }
                .admin-video-scrim { position: absolute; inset: 0; background: radial-gradient(circle at top, rgba(14,15,14,0.7) 0%, #0e0f0e 100%); }

                /* Navbar */
                .roh-nav { position: sticky; top: 0; z-index: 1000; background: rgba(14,15,14,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.05); }
                .roh-nav-inner { max-width: 1400px; margin: 0 auto; height: 70px; padding: 0 24px; display: flex; align-items: center; }
                .roh-brand { font-size: 1.1rem; font-weight: 800; text-decoration: none; color: #fff; display:flex; align-items: center; gap: 10px;}
                .roh-btn-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 8px 20px; border-radius: 10px; font-weight: 600; font-size: 0.85rem; transition: 0.2s; display: inline-flex; align-items: center; gap: 8px; }
                .roh-btn-ghost:hover { background: rgba(255,255,255,0.05); color: #fff; }

                /* Glass Card */
                .admin-glass-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(25px); border-radius: 24px; padding: 32px 0; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
                
                /* Tabs */
                .admin-tabs { display: flex; gap: 8px; background: rgba(255,255,255,0.03); padding: 6px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); }
                .admin-tab { background: transparent; border: none; color: rgba(255,255,255,0.5); font-weight: 700; font-size: 0.85rem; padding: 10px 20px; border-radius: 12px; transition: all 0.3s ease; }
                .admin-tab:hover { color: #fff; }
                .admin-tab.active-members { background: rgba(74,222,128,0.15); color: #4ade80; }
                .admin-tab.active-blood { background: rgba(248,113,113,0.15); color: #f87171; }

                /* Search & Top Bar */
                .admin-search-wrapper { position: relative; margin: 0 32px; }
                .search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.3); }
                .admin-search-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; padding: 12px 16px 12px 42px; font-size: 0.9rem; transition: 0.2s; }
                .admin-search-input:focus { outline: none; border-color: #4ade80; background: rgba(74,222,128,0.03); }
                .admin-stat-badge { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 12px; margin: 0 32px; }

                /* Custom Table */
                .admin-table { color: #f0f0ef; margin-top: 20px; }
                .admin-table th { border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.4); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; padding: 16px 12px; background: transparent; }
                .admin-table td { border-bottom: 1px solid rgba(255,255,255,0.04); padding: 16px 12px; background: transparent; }
                .admin-table tbody tr { transition: background 0.2s; }
                .admin-table tbody tr:hover { background-color: rgba(255,255,255,0.02); }

                /* Badges */
                .status-badge { padding: 6px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px; }
                .badge-success { background: rgba(74,222,128,0.1); color: #4ade80; border: 1px solid rgba(74,222,128,0.2); }
                .badge-warning { background: rgba(250,204,21,0.1); color: #facc15; border: 1px solid rgba(250,204,21,0.2); }
                .badge-danger { background: rgba(248,113,113,0.1); color: #f87171; border: 1px solid rgba(248,113,113,0.2); }
                
                .info-badge { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); font-size: 0.7rem; padding: 4px 8px; border-radius: 6px; }

                /* Action Buttons */
                .admin-action-btn { width: 32px; height: 32px; border-radius: 50%; border: none; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; transition: 0.2s; cursor: pointer; }
                .btn-approve { background: rgba(74,222,128,0.1); color: #4ade80; border: 1px solid rgba(74,222,128,0.2); }
                .btn-approve:hover { background: #4ade80; color: #000; }
                .btn-reject { background: rgba(250,204,21,0.1); color: #facc15; border: 1px solid rgba(250,204,21,0.2); }
                .btn-reject:hover { background: #facc15; color: #000; }
                .btn-delete { background: rgba(248,113,113,0.1); color: #f87171; border: 1px solid rgba(248,113,113,0.2); }
                .btn-delete:hover { background: #f87171; color: #fff; }

                /* Responsive Adjustments */
                @media (max-width: 768px) {
                    .admin-glass-card { padding: 24px 0; }
                    .admin-search-wrapper, .admin-stat-badge { margin: 0 20px; max-width: 100% !important; }
                    .admin-tabs { width: 100%; overflow-x: auto; white-space: nowrap; justify-content: flex-start; }
                    .admin-tab { flex-shrink: 0; }
                }
            `}</style>
        </div>
    );
};

export default AdminPanel;