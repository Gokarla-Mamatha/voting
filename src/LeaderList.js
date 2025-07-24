import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function LeaderList() {
  const [leaders, setLeaders] = useState({});

  useEffect(() => {
    const fetchLeaders = async () => {
      const querySnapshot = await getDocs(collection(db, "leaders"));
      const grouped = {};
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (!grouped[data.post]) grouped[data.post] = [];
        // Push the whole candidate object (name, imageUrl, etc.)
        grouped[data.post].push({imageUrl: data.imageUrl });
      });
      setLeaders(grouped);
    };
    fetchLeaders();
  }, []);

  return (
    <div style={{ background: "#e3f2fd", margin: "2rem auto 1rem auto", maxWidth: 400, padding: 24, border: "1px solid #90caf9", borderRadius: 16, boxShadow: "0 2px 8px #90caf955" }}>
      <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 16 }}>Candidates</h2>
      {Object.keys(leaders).map(post => {
        // Map post keys to display names
        let displayName = post;
        if (post.toLowerCase() === "captain") displayName = "Captain";
        else if (post.toLowerCase() === "vicecaptain" || post.toLowerCase() === "vice captain") displayName = "Vice Captain";
        else displayName = post.charAt(0).toUpperCase() + post.slice(1);
        return (
          <div key={post} style={{ marginBottom: 16 }}>
            <h3 style={{ color: "#1565c0", marginBottom: 8 }}>{displayName}</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {leaders[post].map((candidate, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#bbdefb", marginBottom: 6, padding: 8, borderRadius: 8 }}>
                  {candidate.imageUrl && (
                    <img src={candidate.imageUrl} alt={candidate.name} style={{ height: 60, width: 60, borderRadius: "50%", objectFit: "cover", border: "2px solid #1976d2" }} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default LeaderList;