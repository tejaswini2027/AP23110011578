# Campus Notifications System

## 📌 Project Overview
This project is a Campus Notification System built as part of the Affordmed evaluation.

It displays notifications related to:
- Placements
- Results
- Events

The system prioritizes important notifications and provides filtering options.

---

## 🚀 Features

### ✅ Stage 1
- Logging middleware integration
- Priority-based notification sorting
- Top notifications display

### ✅ Stage 2
- Responsive UI using React
- Filter notifications by type (Placement, Result, Event)
- Highlight priority notifications
- Mark notifications as viewed
- Fallback data handling (if API fails)

---

## ⚙️ Tech Stack
- React.js
- JavaScript
- CSS (inline styling)
- Fetch API
- Axios (for logging middleware)

---

## 📊 Priority Logic
Notifications are sorted based on:
- Type weight:
  - Placement > Result > Event
- Timestamp (latest first)

---

## 🔗 API Used

> Note: API requires Bearer Token authentication. Fallback data is used if API fails.

---

## 🖥️ How to Run

```bash
cd notification_app_fe
npm install
npm start



affordmed-frontend/
│
├── logging_middleware/
│   └── logger.js
│
├── notification_app_fe/
│   ├── src/
│   │   ├── App.js
│   │   └── utils/logger.js
│
├── README.md