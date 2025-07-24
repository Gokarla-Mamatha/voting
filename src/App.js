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
      <h1 style={{ color: "#1976d2", textAlign: "center", padding: "2rem 0 1rem 0", margin: 0, fontWeight: 800, letterSpacing: 1 }}>School Election</h1>
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
          <LeaderList />
          <VoteForm idInfo={idInfo} onVoted={() => setStep("done")} />
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