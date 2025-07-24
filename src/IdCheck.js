import React, { useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function IdCheck({ onResult }) {
  const [classNum, setClassNum] = useState("");
  const [section, setSection] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [loading, setLoading] = useState(false);

  // Mapping of classes to their sections
  const classSections = {
    "5": ["C1", "C2", "G1"],
    "6": ["C1", "C2", "G1"],
    "7": ["C1", "C2", "G1"],
    "8": ["C1", "C2", "G1", "G2"],
    "9": ["C1", "C2", "C3", "G1", "G2"],
    "10": ["C", "G1", "G2"]
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = `${classNum}-${section}-${rollNum}`;
    const voteRef = doc(db, "votes", id);
    const voteSnap = await getDoc(voteRef);
    setLoading(false);
    onResult({ 
      alreadyVoted: voteSnap.exists(), 
      id, 
      classNum, 
      section,
      rollNum 
    });
  };

  return (
    <form onSubmit={handleCheck} style={{ background: "#e3f2fd", margin: "2rem auto", maxWidth: 350, padding: 32, border: "1px solid #90caf9", borderRadius: 16, boxShadow: "0 2px 8px #90caf955" }}>
      <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 24 }}>Enter Your ID</h2>
      <label style={{ display: "block", marginBottom: 16 }}>
        Class:
        <select
          value={classNum}
          onChange={e => { setClassNum(e.target.value); setSection(""); }}
          required
          style={{ width: "100%", marginTop: 4, marginBottom: 8, padding: 10, borderRadius: 8, border: "1px solid #90caf9", background: "#fff" }}
        >
          <option value="">Select Class</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </label>
      <label style={{ display: "block", marginBottom: 16 }}>
        Section:
        <select
          value={section}
          onChange={e => setSection(e.target.value)}
          required
          disabled={!classNum}
          style={{ width: "100%", marginTop: 4, marginBottom: 8, padding: 10, borderRadius: 8, border: "1px solid #90caf9", background: classNum ? "#fff" : "#f0f0f0" }}
        >
          <option value="">{classNum ? "Select Section" : "Select Class First"}</option>
          {classNum && classSections[classNum].map(sec => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      </label>
      <input
        placeholder="Roll Number"
        value={rollNum}
        onChange={e => setRollNum(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 8, border: "1px solid #90caf9", background: "#fff" }}
      />
      <button type="submit" style={{ width: "100%", background: loading ? "#90caf9" : "#1976d2", color: "#fff", padding: 12, border: "none", borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }} disabled={loading}>
        {loading ? "Checking..." : "Check"}
      </button>
    </form>
  );
}

export default IdCheck;