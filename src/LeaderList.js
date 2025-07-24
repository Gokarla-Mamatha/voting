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
        grouped[data.post].push(data.name);
      });
      setLeaders(grouped);
    };
    fetchLeaders();
  }, []);

  return (
    <div style={{ background: "#e3f2fd", margin: "2rem auto 1rem auto", maxWidth: 400, padding: 24, border: "1px solid #90caf9", borderRadius: 16, boxShadow: "0 2px 8px #90caf955" }}>
      <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 16 }}>Candidates</h2>
      {Object.keys(leaders).map(post => (
        <div key={post} style={{ marginBottom: 16 }}>
          <h3 style={{ color: "#1565c0", marginBottom: 8 }}>{post.charAt(0).toUpperCase() + post.slice(1)}</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {leaders[post].map((name, idx) => (
              <li key={idx} style={{ background: "#bbdefb", marginBottom: 6, padding: 8, borderRadius: 8, color: "#0d47a1", fontWeight: 500 }}>{name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default LeaderList;