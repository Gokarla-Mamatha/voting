import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

function VoteForm({ idInfo, onVoted }) {
  const [candidates, setCandidates] = useState({ captain: [], vicecaptain: [], secretary: [] });
  const [votes, setVotes] = useState({ captain: "", vicecaptain: "", secretary: "" });

  useEffect(() => {
    const fetchLeaders = async () => {
      const querySnapshot = await getDocs(collection(db, "leaders"));
      const grouped = { captain: [], vicecaptain: [], secretary: [] };
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (grouped[data.post]) grouped[data.post].push(data.name);
      });
      setCandidates(grouped);
    };
    fetchLeaders();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "votes", idInfo.id), votes);
    onVoted();
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#e3f2fd", margin: "2rem auto", maxWidth: 400, padding: 32, border: "1px solid #90caf9", borderRadius: 16, boxShadow: "0 2px 8px #90caf955" }}>
      <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 24 }}>Vote for Your Leaders</h2>
      <label style={{ display: "block", marginBottom: 16 }}>
        Captain:
        <select value={votes.captain} onChange={e => setVotes({ ...votes, captain: e.target.value })} required style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #90caf9", background: "#fff", marginTop: 4 }}>
          <option value="">Select</option>
          {candidates.captain.map((name, idx) => (
            <option key={idx} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <label style={{ display: "block", marginBottom: 16 }}>
        Vice Captain:
        <select value={votes.vicecaptain} onChange={e => setVotes({ ...votes, vicecaptain: e.target.value })} required style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #90caf9", background: "#fff", marginTop: 4 }}>
          <option value="">Select</option>
          {candidates.vicecaptain.map((name, idx) => (
            <option key={idx} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <label style={{ display: "block", marginBottom: 16 }}>
        Secretary:
        <select value={votes.secretary} onChange={e => setVotes({ ...votes, secretary: e.target.value })} required style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #90caf9", background: "#fff", marginTop: 4 }}>
          <option value="">Select</option>
          {candidates.secretary.map((name, idx) => (
            <option key={idx} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <button type="submit" style={{ width: "100%", background: "#1976d2", color: "#fff", padding: 12, border: "none", borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: "pointer", transition: "background 0.2s" }}>
        Vote
      </button>
    </form>
  );
}

export default VoteForm;