import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();
const jobs = new Map();
const pendingDelayMs = 850;
const processingDelayMs = 1450;

function makeDemoResult(telemetry = {}) {
  const temperature = telemetry.temperature ?? 24;
  const humidity = telemetry.humidity ?? 78;

  return {
    isDemo: true,
    possibleDisease: "Early blight",
    confidence: 87,
    environment: { temperature, humidity },
    nextChecks: [
      "Compare leaf spots with a trusted local crop guide or extension service.",
      "Inspect older leaves and nearby plants for similar patterns.",
      "Check whether recent watering or rain has left foliage damp.",
    ],
    explanation: "Early blight may show as brown, target-like spots on older leaves. This example was not identified from the uploaded photo.",
  };
}

router.post("/", (request, response) => {
  const { imageName, telemetry } = request.body ?? {};
  if (typeof imageName !== "string" || !imageName.trim() || imageName.length > 255) {
    response.status(400).json({ error: "imageName is required and must be 255 characters or fewer." });
    return;
  }

  const safeTelemetry = {};
  if (telemetry !== undefined) {
    if (!telemetry || typeof telemetry !== "object" || Array.isArray(telemetry)) {
      response.status(400).json({ error: "telemetry must be an object." });
      return;
    }
    for (const field of ["temperature", "humidity"]) {
      if (telemetry[field] !== undefined && (typeof telemetry[field] !== "number" || !Number.isFinite(telemetry[field]))) {
        response.status(400).json({ error: `telemetry.${field} must be a finite number.` });
        return;
      }
    }
    if (telemetry.temperature !== undefined) safeTelemetry.temperature = telemetry.temperature;
    if (telemetry.humidity !== undefined) safeTelemetry.humidity = telemetry.humidity;
  }

  const jobId = randomUUID();
  const job = { jobId, imageName: imageName.trim(), status: "pending", result: null };
  jobs.set(jobId, job);

  setTimeout(() => {
    const currentJob = jobs.get(jobId);
    if (!currentJob) return;
    currentJob.status = "processing";

    setTimeout(() => {
      const processingJob = jobs.get(jobId);
      if (!processingJob) return;
      processingJob.status = "completed";
      processingJob.result = makeDemoResult(safeTelemetry);
    }, processingDelayMs);
  }, pendingDelayMs);

  response.status(202).json({ jobId, status: job.status });
});

router.get("/:jobId", (request, response) => {
  const job = jobs.get(request.params.jobId);
  if (!job) {
    response.status(404).json({ error: "Diagnosis job not found." });
    return;
  }

  const payload = { jobId: job.jobId, status: job.status };
  if (job.status === "completed") payload.result = job.result;
  response.json(payload);
});

export default router;
