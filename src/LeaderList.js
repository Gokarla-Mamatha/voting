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
    <div>
      <h1 style={{ color: "#1976d2", textAlign: "center", marginBottom: 16 }}>Candidates</h1>
      {Object.keys(leaders).map(post => {
        // Map post keys to display names
        let displayName = post;
        if (post.toLowerCase() === "captain") displayName = "Captain";
        else if (post.toLowerCase() === "vicecaptain" || post.toLowerCase() === "vice captain") displayName = "Vice Captains";
        else displayName = post.charAt(0).toUpperCase() + post.slice(1);
        return (
          <div key={post} style={{ marginBottom: 16 }}>
            <h2 style={{ color: "#1565c0", marginBottom: 8, textAlign: "center" }}>{displayName}</h2>
            <div style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", alignItems: "center", marginBottom: 6 }}>
  {leaders[post].map((candidate, idx) => (
    <div key={idx} style={{ background: "#bbdefb", padding: 8, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {candidate.imageUrl && (
        <img src={candidate.imageUrl} alt={candidate.name} style={{ height: 150, width: 150, objectFit: "contain", border: "2px solid #1976d2", background: "#fff" }} />      )}
    </div>
  ))}
</div>
          </div>
        );
      })}
    </div>
  );
}

export default LeaderList;