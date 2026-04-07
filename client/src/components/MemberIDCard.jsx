import React, { useRef } from "react";
import logo from "../assets/logo.png";

const MemberIDCard = ({ memberData, user }) => {
  const cardRef = useRef();

  if (!memberData || !memberData._id || !memberData.aadharNumber) {
    return <div className="text-muted small">Loading ID Card data...</div>;
  }

  const handlePrint = () => {
    window.print(); 
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div 
        ref={cardRef}
        className="id-card shadow-lg bg-white overflow-hidden mb-3"
        style={{ width: "320px", borderRadius: "15px", border: "1px solid #2e7d32" }}
      >
        <div className="bg-success text-white p-3 text-center" style={{ WebkitPrintColorAdjust: "exact" }}>
          <img src={logo} alt="Logo" width="40" className="rounded-circle bg-white p-1 mb-2" />
          <h6 className="fw-bold mb-0" style={{ fontSize: "14px" }}>RAY OF HOPE FOUNDATION</h6>
          <small style={{ fontSize: "9px", letterSpacing: "1px" }}>BHUBANESWAR, ODISHA</small>
        </div>

        <div className="p-4 text-center">
          <div className="mb-3">
             <i className="bi bi-person-circle text-success" style={{ fontSize: "50px" }}></i>
          </div>
          <h5 className="fw-bold text-dark mb-1">{memberData.memberName}</h5>
          <p className="badge bg-success rounded-pill mb-3" style={{ fontSize: "10px", WebkitPrintColorAdjust: "exact" }}>OFFICIAL VOLUNTEER</p>
          
          <div className="text-start x-small mt-2" style={{ fontSize: "12px" }}>
            <div className="d-flex justify-content-between border-bottom py-2">
              <span className="text-muted">Member ID:</span>
              <span className="fw-bold text-dark">
                ROH-{memberData._id?.slice(-6).toUpperCase()}
              </span>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <span className="text-muted">Aadhar:</span>
              <span className="fw-bold text-dark">
                XXXX XXXX {memberData.aadharNumber?.slice(-4)}
              </span>
            </div>
            <div className="d-flex justify-content-between py-2">
              <span className="text-muted">Issued:</span>
              <span className="fw-bold text-dark">
                {memberData.appliedAt ? new Date(memberData.appliedAt).toLocaleDateString('en-IN') : new Date().toLocaleDateString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-light p-2 text-center border-top">
          <small className="text-muted" style={{ fontSize: "9px" }}>
            Authorized digital identification for Ray of Hope volunteers.
          </small>
        </div>
      </div>

      <button onClick={handlePrint} className="btn btn-success rounded-pill px-4 shadow-sm fw-bold">
        <i className="bi bi-printer me-2"></i>SAVE / PRINT ID
      </button>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .id-card, .id-card * { visibility: visible; }
          .id-card { 
            position: absolute; 
            left: 50%; 
            top: 20%; 
            transform: translateX(-50%);
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MemberIDCard;