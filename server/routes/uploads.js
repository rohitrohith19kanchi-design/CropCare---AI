import { randomUUID } from "node:crypto";
import { Router } from "express";
import { uploadContractsByKey } from "../services/uploadContracts.js";

const router = Router();
const maxFileSize = 10 * 1024 * 1024;
const fileExtensionsByType = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

router.post("/upload-url", (request, response) => {
  const { fileName, fileType, fileSize } = request.body ?? {};

  if (typeof fileName !== "string" || !fileName.trim() || fileName.length > 255) {
    response.status(400).json({ error: "fileName is required and must be 255 characters or fewer." });
    return;
  }

  const extension = Object.hasOwn(fileExtensionsByType, fileType)
    ? fileExtensionsByType[fileType]
    : null;
  if (!extension) {
    response.status(400).json({ error: "Unsupported file type. Use JPEG, PNG, or WEBP." });
    return;
  }

  if (!Number.isInteger(fileSize) || fileSize < 1) {
    response.status(400).json({ error: "fileSize must be a positive integer in bytes." });
    return;
  }
  if (fileSize > maxFileSize) {
    response.status(413).json({ error: "File exceeds the 10 MB upload limit." });
    return;
  }

  const uploadId = randomUUID();
  const objectKey = `diagnoses/${randomUUID()}.${extension}`;
  const uploadContract = {
    uploadId,
    objectKey,
    fileType,
    fileSize,
    storage: "s3",
    status: "not_configured",
  };
  uploadContractsByKey.set(objectKey, uploadContract);

  response.status(201).json({
    ...uploadContract,
    uploadUrl: null,
    message: "S3 upload is not configured. No image bytes have been uploaded or stored.",
  });
});

export default router;
