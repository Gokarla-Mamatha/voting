import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function Results() {
  const [tally, setTally] = useState({
    captain: {},
    vicecaptain: {},
    secretary: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVotes = async () => {
      const votesSnapshot = await getDocs(collection(db, "votes"));
      const votes = votesSnapshot.docs.map(doc => doc.data());
      const newTally = { captain: {}, vicecaptain: {}, secretary: {} };
      votes.forEach(vote => {
        ["captain", "vicecaptain", "secretary"].forEach(post => {
          if (vote[post]) {
            newTally[post][vote[post]] = (newTally[post][vote[post]] || 0) + 1;
          }
        });
      });
      setTally(newTally);
      setLoading(false);
    };
    fetchVotes();
  }, []);

  if (loading) return <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>;

  const renderRow = (post, label) => (
    <tr key={post}>
      <th style={{ background: "#1976d2", color: "#fff", padding: 12, borderRadius: 8, fontWeight: 700, fontSize: 18 }}>{label}</th>
      {Object.entries(tally[post]).map(([name, count], idx) => (
        <td key={idx} style={{ background: "#e3f2fd", color: "#0d47a1", padding: 12, borderRadius: 8, fontWeight: 500, fontSize: 16, textAlign: "center", minWidth: 120 }}>
          {name}<br /><span style={{ fontSize: 14, color: "#1976d2" }}>{count} votes</span>
        </td>
      ))}
    </tr>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#e3f2fd", padding: "2rem 0" }}>
      <h1 style={{ color: "#1976d2", textAlign: "center", marginBottom: 32 }}>Election Results</h1>
      <div style={{
        maxWidth: "1400px",
        width: "95vw",
        margin: "0 auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 8px #90caf955",
        padding: 32
      }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
          <tbody>
            {renderRow("captain", "Captain")}
            {renderRow("vicecaptain", "Vice Captain")}
            {renderRow("secretary", "Secretary")}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Results;