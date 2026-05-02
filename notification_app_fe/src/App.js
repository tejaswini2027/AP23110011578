import React, { useEffect, useState } from "react";
import Log from "./utils/logger";

function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // simple priority logic
  const getScore = (item) => {
    let score = 0;

    // give weight based on type
    if (item.type === "Placement") {
      score += 3;
    } else if (item.type === "Result") {
      score += 2;
    } else {
      score += 1;
    }

    // add timestamp value
    score += new Date(item.timestamp).getTime();

    return score;
  };

  useEffect(() => {

    const getData = async () => {
      try {

        Log("frontend", "info", "api", "getting notifications");

        const result = {
  notifications: [
    {
      id: "1",
      type: "Result",
      message: "mid-sem",
      timestamp: "2026-04-22 17:51:30"
    },
    {
      id: "2",
      type: "Placement",
      message: "CSX Corporation hiring",
      timestamp: "2026-04-22 17:51:18"
    },
    {
      id: "3",
      type: "Event",
      message: "farewell",
      timestamp: "2026-04-22 17:51:06"
    },
    {
      id: "4",
      type: "Result",
      message: "mid-sem",
      timestamp: "2026-04-22 17:50:54"
    },
    {
      id: "5",
      type: "Result",
      message: "project review",
      timestamp: "2026-04-22 17:50:42"
    },
    {
      id: "6",
      type: "Result",
      message: "external",
      timestamp: "2026-04-22 17:50:30"
    },
    {
      id: "7",
      type: "Result",
      message: "project review",
      timestamp: "2026-04-22 17:50:18"
    },
    {
      id: "8",
      type: "Event",
      message: "tech fest",
      timestamp: "2026-04-22 17:50:06"
    },
    {
      id: "9",
      type: "Result",
      message: "project review",
      timestamp: "2026-04-22 17:49:54"
    },
    {
      id: "10",
      type: "Placement",
      message: "Advanced Micro Devices Inc. hiring",
      timestamp: "2026-04-22 17:49:42"
    }
  ]
};

        Log("frontend", "info", "api", "data received");

        // sort based on priority
        let sortedData = result.notifications.sort((a, b) => {
          return getScore(b) - getScore(a);
        });

        // take top 10
        sortedData = sortedData.slice(0, 10);

        setData(sortedData);
        setLoading(false);

      } catch (e) {

        Log("frontend", "error", "api", "error while fetching");

        setLoading(false);
      }
    };

    getData();

  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notifications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.type} - {item.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;