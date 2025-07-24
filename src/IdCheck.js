import React, { useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function IdCheck({ onResult }) {
  const [classNum, setClassNum] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = `${classNum}-${rollNum}`;
    const voteRef = doc(db, "votes", id);
    const voteSnap = await getDoc(voteRef);
    setLoading(false);
    onResult({ 
      alreadyVoted: voteSnap.exists(), 
      id, 
      classNum, 
      rollNum 
    });
  };

  return (
    <form onSubmit={handleCheck} style={{ background: "#e3f2fd", margin: "2rem auto", maxWidth: 350, padding: 32, border: "1px solid #90caf9", borderRadius: 16, boxShadow: "0 2px 8px #90caf955" }}>
      <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 24 }}>Enter Your ID</h2>
      <input
        placeholder="Class"
        value={classNum}
        onChange={e => setClassNum(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 8, border: "1px solid #90caf9", background: "#fff" }}
      />
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