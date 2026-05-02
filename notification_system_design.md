# Notification System Design

## 1. Overview
This system is designed to fetch notifications from an external API and display them based on priority. The frontend is built using React, and a logging middleware is used to track important events.

---

## 2. Components

### a) Frontend (React)
- Fetch notifications
- Process and sort based on priority
- Display top notifications

### b) Logging Middleware
- Logs important actions like API calls and errors
- Helps in debugging and tracking flow

---

## 3. Data Flow

1. React app loads
2. API call is triggered
3. Notifications are received
4. Priority is calculated
5. Notifications are sorted
6. Top 10 are displayed

---

## 4. Priority Logic

Priority is calculated using:
- Type of notification
  - Placement → highest
  - Result → medium
  - Event → low
- Timestamp (latest gets higher priority)

---

## 5. Error Handling

- Try-catch is used for API calls
- Errors are logged using logging middleware

---

## 6. Logging

Logging is done at:
- API request start
- API success
- API failure

---

## 7. Technologies Used

- React (Frontend)
- JavaScript
- Fetch API
- Custom logging middleware

---

## 8. Assumptions

- API returns valid JSON
- Notifications contain id, type, message, timestamp

---

## 9. Conclusion

The system ensures that important notifications are prioritized and displayed efficiently while maintaining proper logging for debugging.