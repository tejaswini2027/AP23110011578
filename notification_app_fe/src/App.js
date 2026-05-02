import React, { useEffect, useState } from "react";
import Log from "./utils/logger";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [viewed, setViewed] = useState({});

  
  const getScore = (item) => {
    let score = 0;

    if (item.type === "Placement") score += 3;
    else if (item.type === "Result") score += 2;
    else score += 1;

    score += new Date(item.timestamp).getTime();

    return score;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        Log("frontend", "info", "api", "getting notifications");

        const response = await fetch(
          "http://20.207.122.201/evaluation-service/notifications",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsYXNraG1pdGVqYXN3aW5pX3Rob3RhQHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwMTkxOCwiaWF0IjoxNzc3NzAxMDE4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZGQxMTFmZjItNzAyNy00MzYwLTg0NjEtYzRiZDZlZTI3MDNlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidGhvdGEgbGFrc2htaSB0ZWphc3dpbmkiLCJzdWIiOiI3NGRkYjJlMC0wZDgxLTRkZGUtODRmMy1lMzkzMmEwMWMxMDEifSwiZW1haWwiOiJsYXNraG1pdGVqYXN3aW5pX3Rob3RhQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJ0aG90YSBsYWtzaG1pIHRlamFzd2luaSIsInJvbGxObyI6ImFwMjMxMTAwMTE1NzgiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI3NGRkYjJlMC0wZDgxLTRkZGUtODRmMy1lMzkzMmEwMWMxMDEiLCJjbGllbnRTZWNyZXQiOiJSamRBU01mbm5aQWJlcVlNIn0.KJh0e2mdBEiuiaCukVkJn3Gseg5__mdpkEkUguAh0Ks`
            }
          }
        );

        const result = await response.json();

        let sorted = result.notifications.sort(
          (a, b) => getScore(b) - getScore(a)
        );

        setData(sorted);
        setLoading(false);

        Log("frontend", "info", "api", "data received");

      } catch (e) {
        console.log("API failed → using fallback data");

        
        const fallback = {
  notifications: [
    { id: "1", type: "Result", message: "Mid-sem results released", timestamp: "2026-04-22 17:51:30" },
    { id: "2", type: "Placement", message: "CSX Corporation hiring", timestamp: "2026-04-22 17:51:18" },
    { id: "3", type: "Event", message: "Farewell party", timestamp: "2026-04-22 17:51:06" },
    { id: "4", type: "Result", message: "Project review results", timestamp: "2026-04-22 17:50:54" },
    { id: "5", type: "Placement", message: "AMD hiring drive", timestamp: "2026-04-22 17:49:42" },
    { id: "6", type: "Event", message: "Tech Fest 2026", timestamp: "2026-04-22 17:49:10" },
    { id: "7", type: "Result", message: "Lab exam results", timestamp: "2026-04-22 17:48:30" },
    { id: "8", type: "Placement", message: "TCS off-campus drive", timestamp: "2026-04-22 17:48:00" },
    { id: "9", type: "Event", message: "Hackathon registrations open", timestamp: "2026-04-22 17:47:40" },
    { id: "10", type: "Result", message: "Internal assessment marks", timestamp: "2026-04-22 17:47:10" },
    { id: "11", type: "Placement", message: "Infosys hiring", timestamp: "2026-04-22 17:46:30" },
    { id: "12", type: "Event", message: "Workshop on AI/ML", timestamp: "2026-04-22 17:45:50" }
  ]
};

        setData(fallback.notifications);
        setLoading(false);
      }
    };

    getData();
  }, []);

  
  const filteredData =
    filter === "All" ? data : data.filter((item) => item.type === filter);

  
  const topNotifications = data.slice(0, 3);

  
  const handleClick = (id) => {
    setViewed({ ...viewed, [id]: true });
  };

  return (

    
  <div style={styles.container}>
    <div style={styles.mainCard}>
    <h1 style={styles.heading}> Campus Notifications</h1>

    {/* FILTER BUTTONS */}
    <div style={styles.filterContainer}>
      {["All", "Placement", "Result", "Event"].map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          style={{
            ...styles.filterBtn,
            background: filter === type ? "#4f46e5" : "#e5e7eb",
            color: filter === type ? "#fff" : "#111"
          }}
        >
          {type}
        </button>
      ))}
    </div>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <>
        {/* ⭐ PRIORITY */}
        <h2 style={styles.sectionTitle}> Priority Notifications</h2>
        <div style={styles.grid}>
          {topNotifications.map((item) => (
            <div style={styles.priorityCard} key={item.id}>
              <span style={styles.badge(item.type)}>{item.type}</span>
              <p style={styles.message}>{item.message}</p>
            </div>
          ))}
        </div>

        {/* 📄 ALL */}
        <h2 style={styles.sectionTitle}>📄 All Notifications</h2>
        <div style={styles.list}>
          {filteredData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              style={{
                ...styles.card,
                background: viewed[item.id] ? "#f3f4f6" : "#ffffff"
              }}
            >
              <div style={styles.row}>
                <span style={styles.badge(item.type)}>{item.type}</span>
                <span style={styles.time}>{item.timestamp}</span>

              </div>

              <p style={styles.message}>{item.message}</p>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
  </div>
);
}

const styles = {
  container: {
  minHeight: "100vh",
  padding: "40px 20px",
  fontFamily: "Segoe UI, sans-serif",
  background: "linear-gradient(135deg, #aab6de, #f4bada)"
},

  heading: {
    fontSize: "28px",
    marginBottom: "20px"
  },

  filterContainer: {
    marginBottom: "20px"
  },

  filterBtn: {
    marginRight: "10px",
    padding: "8px 14px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "500"
  },

  sectionTitle: {
    marginTop: "25px",
    marginBottom: "10px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  mainCard: {
  maxWidth: "900px",
  margin: "auto",
  padding: "30px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
},

  card: {
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    cursor: "pointer",
    transition: "0.2s"
  },

  priorityCard: {
    padding: "15px",
    borderRadius: "10px",
    background: "#fef3c7",
    border: "1px solid #fde68a"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  message: {
    marginTop: "8px",
    fontSize: "16px"
  },

  time: {
    fontSize: "12px",
    color: "#6b7280"
  },

  badge: (type) => ({
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#fff",
    background:
      type === "Placement"
        ? "#2563eb"
        : type === "Result"
        ? "#16a34a"
        : "#f97316"
  })

  
};

export default App;