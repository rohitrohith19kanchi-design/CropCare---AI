# CropCare AI — Project Context

## What is this?
CropCare AI is a hackathon-ready agritech project.

The goal is to let a farmer upload a crop/plant image and receive a preliminary health assessment, possible disease/cause, environmental context, and safe next-step guidance.

This is primarily being built as a portfolio + hackathon project.

## Current stage

Frontend foundation is already built using:

- React
- Vite
- JavaScript
- CSS
- lucide-react

The frontend currently has:

- CropCare AI navbar
- Diagnostic engine status
- Hero section
- Plant image upload
- Image preview
- Replace image
- Remove image
- Analyze Image button
- Responsive polished green visual design

## Current frontend flow

The user currently:

1. Opens CropCare AI
2. Uploads a plant image
3. Sees the image preview
4. Can replace/remove it
5. Can click "Analyze Image"

The next task is to make the Analyze Image button actually trigger a simulated diagnosis pipeline.

## NEXT TASK

Implement this frontend flow:

Upload Image
↓
Analyze Image
↓
Uploading...
↓
Queued
↓
Processing...
↓
Diagnosis Complete
↓
Diagnosis Result

The diagnosis result should be clearly marked as a DEMO/MOCK result because there is no real AI inference yet.

The mock result can contain:

- Possible disease
- Confidence
- Environmental context
- Recommended next checks/actions

DO NOT claim fake accuracy as real scientific performance.

## Important architecture planned later

Final architecture:

React frontend
↓
POST /diagnose
↓
Backend API
↓
Redis/BullMQ queue
↓
Background worker
↓
AI/Vision model
↓
PostgreSQL
↓
Frontend polls GET /diagnose/:jobId

The backend/queue/AI system is NOT the current task.

## Do NOT implement yet

Do not add:

- Authentication
- JWT
- Redis
- PostgreSQL
- AWS S3
- WebSockets
- Custom ML training
- Real pesticide dosage generation
- Complex farm management
- Maps

Those will be introduced in later chunks.

## Development philosophy

Prioritize:

1. Working end-to-end flow
2. Core problem
3. Demonstrable AI
4. UX
5. Reliability
6. Technical sophistication

Avoid unnecessary architecture or dependencies.

## Coding expectations

Before changing anything:

1. Inspect the existing project files.
2. Understand the current implementation.
3. Preserve the existing design.
4. Make the smallest coherent set of changes required for the current task.
5. Run/check the application after changes.
6. Fix errors you introduce.
7. Do not ask the user for screenshots when the files can be inspected directly.

Prefer complete, working implementation over explanations.

## Git

The project is already connected to its GitHub repository.

After a meaningful completed chunk, the user will commit and push the changes.
