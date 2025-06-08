import React, { useEffect, useState } from "react";
import "./index.css";

export default function AdviceCard() {
  const [advice, setAdvice] = useState("Loading...");
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-cache",
      });
      const data = await res.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      setAdvice("Failed to fetch advice.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="advice-card">
      <div className="advice-header">
        <h1 className="advice-title">💡 Random Advice</h1>
      </div>

      <div className="advice-content">
        <p className="advice-text">
          {loading ? (
            <div className="loading-bar-container">
              <div className="loading-bar"></div>
            </div>
          ) : (
            <strong>{advice}</strong>
          )}
        </p>
      </div>

      <div className="advice-button-container">
        <button className="advice-btn" onClick={fetchAdvice} disabled={loading}>
          {loading ? "Loading..." : "New Advice"}
        </button>
      </div>
    </div>
  );
}
