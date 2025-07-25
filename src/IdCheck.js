import React, { useState } from "react";

function IdCheck({ onResult }) {
  const [classNum, setClassNum] = useState("");

  const handleCheck = async (e) => {
    e.preventDefault();
    const id = `${classNum}`;
    onResult({ id, classNum });
  };

  return (
    <form onSubmit={handleCheck} style={{ background: "#e3f2fd", margin: "2rem auto", maxWidth: 350, padding: 32, border: "1px solid #90caf9", borderRadius: 16, boxShadow: "0 2px 8px #90caf955" }}>
      <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 24 }}>Enter Your ID</h2>
      <label style={{ display: "block", marginBottom: 16 }}>
        Class:
        <select
          value={classNum}
          onChange={e => setClassNum(e.target.value)}
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
      <button type="submit" style={{ width: "100%", background: "#1976d2", color: "#fff", padding: 12, border: "none", borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: "pointer", transition: "background 0.2s" }}>
        Check
      </button>
    </form>
  );
}

export default IdCheck;