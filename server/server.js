import cors from "cors";
import express from "express";
import process from "node:process";
import diagnosisRouter from "./routes/diagnosis.js";

const app = express();
const port = Number(process.env.PORT) || 3001;
app.use(cors({
  origin(origin, callback) {
    if (!origin || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Origin not allowed by CORS"));
  },
}));
app.use(express.json({ limit: "16kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/v1/diagnose", diagnosisRouter);

app.use((_request, response) => {
  response.status(404).json({ error: "Endpoint not found." });
});

app.use((error, _request, response, _next) => {
  void _next;
  if (error instanceof SyntaxError && "body" in error) {
    response.status(400).json({ error: "Request body must be valid JSON." });
    return;
  }
  if (error.type === "entity.too.large") {
    response.status(413).json({ error: "Request body is too large." });
    return;
  }
  if (error.message === "Origin not allowed by CORS") {
    response.status(403).json({ error: "This origin is not allowed." });
    return;
  }
  console.error("API request failed:", error.message);
  response.status(500).json({ error: "An unexpected server error occurred." });
});

app.listen(port, () => {
  console.log(`CropCare API listening on http://localhost:${port}`);
});
