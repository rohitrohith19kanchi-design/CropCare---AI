const generatedObjectKeyPattern = /^diagnoses\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/i;

async function readResponse(response, fallbackMessage) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || fallbackMessage);
  return body;
}

export async function createDiagnosisJob({
  fileName,
  fileType,
  fileSize,
  telemetry,
  signal,
  onUploadContract,
}, fetcher = fetch) {
  const uploadResponse = await fetcher("/api/v1/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName, fileType, fileSize }),
    signal,
  });
  const uploadContract = await readResponse(uploadResponse, "Could not prepare the image upload.");

  if (
    uploadContract.storage !== "s3" ||
    uploadContract.status !== "not_configured" ||
    uploadContract.uploadUrl !== null ||
    !generatedObjectKeyPattern.test(uploadContract.objectKey || "")
  ) {
    throw new Error("The upload service returned an invalid storage contract.");
  }

  onUploadContract?.(uploadContract);

  const diagnosisResponse = await fetcher("/api/v1/diagnose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ objectKey: uploadContract.objectKey, telemetry }),
    signal,
  });
  const job = await readResponse(diagnosisResponse, "Could not start the diagnosis job.");
  if (job.status !== "pending" || !job.jobId) {
    throw new Error("The diagnosis service returned an invalid job.");
  }

  return { uploadContract, job };
}
