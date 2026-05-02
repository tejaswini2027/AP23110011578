import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsYXNraG1pdGVqYXN3aW5pX3Rob3RhQHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwMTkxOCwiaWF0IjoxNzc3NzAxMDE4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZGQxMTFmZjItNzAyNy00MzYwLTg0NjEtYzRiZDZlZTI3MDNlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidGhvdGEgbGFrc2htaSB0ZWphc3dpbmkiLCJzdWIiOiI3NGRkYjJlMC0wZDgxLTRkZGUtODRmMy1lMzkzMmEwMWMxMDEifSwiZW1haWwiOiJsYXNraG1pdGVqYXN3aW5pX3Rob3RhQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJ0aG90YSBsYWtzaG1pIHRlamFzd2luaSIsInJvbGxObyI6ImFwMjMxMTAwMTE1NzgiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI3NGRkYjJlMC0wZDgxLTRkZGUtODRmMy1lMzkzMmEwMWMxMDEiLCJjbGllbnRTZWNyZXQiOiJSamRBU01mbm5aQWJlcVlNIn0.KJh0e2mdBEiuiaCukVkJn3Gseg5__mdpkEkUguAh0Ks";

const Log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (err) {
    // ignore errors (no console spam)
  }
};

export default Log;