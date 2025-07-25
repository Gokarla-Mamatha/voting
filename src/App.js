import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IdCheck from "./IdCheck";
import VoteForm from "./VoteForm";
import LeaderList from "./LeaderList";
import Results from "./Results";

function MainElection() {
  const [step, setStep] = useState("idcheck");
  const [idInfo, setIdInfo] = useState(null);

  const handleIdResult = (result) => {
    setIdInfo(result);
    setStep(result.alreadyVoted ? "already" : "vote");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e3f2fd", padding: 0, margin: 0 }}>
      {/* Navbar */}
      <nav style={{
        width: "100vw",
        background: "#fff",
        borderBottom: "2px solid #1976d2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem 2rem 0.2rem 2rem",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: "0 2px 8px #1976d222",
        minHeight: 150,
        margin: 0,
        borderRadius: 0
      }}>
        <img src="/pollocks.jpg" alt="Pollocks Logo" style={{ height: 120, marginRight: 24 }} />
        <span style={{ color: "#1976d2", fontWeight: 800, fontSize: 32, letterSpacing: 1, textAlign: "center" }}>Pollocks School</span>
      </nav>
      {/* End Navbar */}
      <h1 style={{ color: "#1976d2", textAlign: "center", padding: "2rem 0 0 0", margin: 0, fontWeight: 800, letterSpacing: 1 }}>School Elections 2025-2026</h1>
      <h3 style={{ color: "#000", textAlign: "center",fontWeight: 800, letterSpacing: 1 }}>P1 Branch</h3>
      {step === "idcheck" && <IdCheck onResult={handleIdResult} />}
      {step === "already" && (
        <div style={{ margin: "2rem auto", maxWidth: 350, padding: 32, border: "1px solid #f44336", borderRadius: 16, background: "#fff3e0", color: "#d32f2f", textAlign: "center", boxShadow: "0 2px 8px #f4433622" }}>
          <h2>Already Voted</h2>
          <button onClick={() => setStep("idcheck")}
            style={{ marginTop: 16, background: "#1976d2", color: "#fff", padding: 10, border: "none", borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
            Back
          </button>
        </div>
      )}
      {step === "vote" && (
        <div>
          <LeaderList userId={idInfo && idInfo.id} />
        </div>
      )}
      {step === "done" && (
        <div style={{ margin: "2rem auto", maxWidth: 350, padding: 32, border: "1px solid #388e3c", borderRadius: 16, background: "#e8f5e9", color: "#388e3c", textAlign: "center", boxShadow: "0 2px 8px #388e3c22" }}>
          <h2>Thank you for voting!</h2>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainElection />} />
        <Route path="/result" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;