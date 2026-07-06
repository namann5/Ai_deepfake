<div align="center">

# DeepScan

**AI-Generated Media Verifier**

Detect deepfakes with a three-layer pipeline — deep learning, metadata forensics, and score aggregation.

<br/>

[![Status](https://img.shields.io/badge/Status-Active-22c55e?style=flat-square)](.)
[![Node](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](.)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)](.)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](.)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](.)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](.)
[![License](https://img.shields.io/badge/License-Academic-8B5CF6?style=flat-square)](.)

<br/>

**Department of Computer Science & Engineering (CSED) · Section 2FH**

</div>

---

## Quick Start

```bash
git clone https://github.com/namann5/Ai_deepfake.git
cd Ai_deepfake

# Start everything (Docker required)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

| Service | URL |
|---|---|
| Frontend | `http://localhost:3001` |
| Backend API | `http://localhost:5000` |
| ML Service | `http://localhost:7000` |

---

## What It Does

Upload an image or video → get a verdict in seconds.

| Layer | What it detects |
|---|---|
| **Deep Learning** | Xception backbone analyzes pixel-level forgery artifacts |
| **Metadata Forensics** | EXIF parsing flags missing camera data, AI software signatures |
| **Score Aggregation** | Fuses both signals into a 0–100% probability score |

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 · Axios · React Router 7 |
| Backend | Node.js · Express 5 · Mongoose |
| ML Engine | PyTorch · Xception (pytorchcv) · FastAPI |
| Video Processing | OpenCV · Haar Cascade face detection |
| Database | MongoDB 7 |
| Infrastructure | Docker · Docker Compose · Render · Vercel |

---

## API

### `POST /api/analyze`
Upload an image/video for analysis. `multipart/form-data` with field `image`.

```json
{
  "prediction": "deepfake",
  "score": 72.4,
  "verdict": "SYNTHETIC",
  "confidence": "Medium",
  "breakdown": {
    "model_score": 68.0,
    "metadata_score": 85.0
  }
}
```

### `GET /api/results`
Paginated scan history. Query params: `page`, `limit` (max 100).

---

## Project Structure

```
deepscan-backend/          # Node.js API server
├── server.js              # Entry point
├── routes/analyze.js      # Analysis & results endpoints
├── services/              # ML client, metadata, score aggregation
├── middleware/             # File validation (multer)
├── models/Result.js       # Mongoose schema
└── ml_server/             # Python ML service
    ├── image_server.py    # PyTorch + Xception inference (primary)
    └── video_server.py    # TensorFlow video classifier (secondary)

deepscan-frontend/         # React app
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Route pages
│   └── services/api.js    # API client
```

---

## Team

| Name | Role |
|---|---|
| **Anurag Singh** | Backend & System Analysis |
| **Arpita Raj** | Frontend & UI Design |
| **Harshita Nagpal** | Frontend & Documentation |
| **Naman Singh** | Backend & Testing |

**Supervisor:** Mr. Abhishek Singh · **Submitted To:** Mr. Sanjay Madaan

---

<div align="center">

*Department of Computer Science & Engineering (CSED) · Section 2FH · Academic Project*

</div>
