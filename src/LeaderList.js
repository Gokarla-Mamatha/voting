import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

function LeaderList({ userId }) {
  const [leaders, setLeaders] = useState({});
  const [votes, setVotes] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchLeaders = async () => {
      const querySnapshot = await getDocs(collection(db, "leaders"));
      const grouped = {};
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (!grouped[data.post]) grouped[data.post] = [];
        grouped[data.post].push({ name: data.name, imageUrl: data.imageUrl });
      });
      setLeaders(grouped);
    };
    fetchLeaders();
  }, []);

  const handleSelect = (post, candidateName) => {
    setVotes({ ...votes, [post]: candidateName });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await setDoc(doc(db, "votes", userId), votes);
      setSubmitted(true);
    } catch (e) {
      alert("Error submitting vote. Please try again.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return <div style={{ textAlign: "center", color: "#1976d2", fontWeight: 700, fontSize: 24, marginTop: 40 }}>Thank you for voting!</div>;
  }

  return (
    <div>
      <h1 style={{ color: "#1976d2", textAlign: "center", marginBottom: 16 }}>Candidates</h1>
      {Object.keys(leaders)
        .sort((a, b) => {
          // Custom sorting: secretary first, then vice captain, then captain
          const aLower = a.toLowerCase();
          const bLower = b.toLowerCase();
          
          if (aLower.includes('secretary')) return -1;
          if (bLower.includes('secretary')) return 1;
          if (aLower.includes('vice') || aLower.includes('vicecaptain')) return -1;
          if (bLower.includes('vice') || bLower.includes('vicecaptain')) return 1;
          if (aLower.includes('captain')) return 1;
          if (bLower.includes('captain')) return -1;
          
          return a.localeCompare(b);
        })
        .map(post => {
        let displayName = post;
        if (post.toLowerCase() === "captain") displayName = "Captain";
        else if (post.toLowerCase() === "vicecaptain" || post.toLowerCase() === "vice captain") displayName = "Vice Captain";
        else displayName = post.charAt(0).toUpperCase() + post.slice(1);
        // Split candidates into two rows
        const candidates = leaders[post];
        const row1 = candidates.slice(0, 4);
        const row2 = candidates.slice(4, 8);
        return (
          <div key={post} style={{ marginBottom: 16 }}>
            <h2 style={{ color: "#1565c0", marginBottom: 8, textAlign: "center" }}>{displayName}</h2>
            {/* First row */}
            <div style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", alignItems: "center", marginBottom: 6 }}>
              {row1.map((candidate, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(post, candidate.name)}
                  style={{
                    background: votes[post] === candidate.name ? "#1976d2" : "#bbdefb",
                    padding: 8,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: votes[post] === candidate.name ? "3px solid #1976d2" : "2px solid #1976d2",
                    boxShadow: votes[post] === candidate.name ? "0 0 10px #1976d299" : undefined,
                    position: "relative"
                  }}
                >
                  {candidate.imageUrl && (
                    <img src={candidate.imageUrl} alt={candidate.name} style={{ height: 200, width: 200, objectFit: "contain", background: "#fff" }} />
                  )}
                  {votes[post] === candidate.name && (
                    <span style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "#fff",
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 6px #1976d255",
                      border: "2px solid #388e3c"
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#388e3c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 10.8 17 4 11.2" /></svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Second row */}
            <div style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", alignItems: "center", marginBottom: 6 }}>
              {row2.map((candidate, idx) => (
                <div
                  key={idx + 4}
                  onClick={() => handleSelect(post, candidate.name)}
                  style={{
                    background: votes[post] === candidate.name ? "#1976d2" : "#bbdefb",
                    padding: 8,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: votes[post] === candidate.name ? "3px solid #1976d2" : "2px solid #1976d2",
                    boxShadow: votes[post] === candidate.name ? "0 0 10px #1976d299" : undefined,
                    position: "relative"
                  }}
                >
                  {candidate.imageUrl && (
                    <img src={candidate.imageUrl} alt={candidate.name} style={{ height: 200, width: 200, objectFit: "contain", background: "#fff" }} />
                  )}
                  {votes[post] === candidate.name && (
                    <span style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "#fff",
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 6px #1976d255",
                      border: "2px solid #388e3c"
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#388e3c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 10.8 17 4 11.2" /></svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <button
          onClick={handleSubmit}
          disabled={submitting || Object.keys(leaders).some(post => !votes[post])}
          style={{
            background: "#1976d2",
            color: "#fff",
            padding: "14px 40px",
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 20,
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting || Object.keys(leaders).some(post => !votes[post]) ? 0.6 : 1
          }}
        >
          {submitting ? "Submitting..." : "Submit Vote"}
        </button>
      </div>
    </div>
  );
}

export default LeaderList;