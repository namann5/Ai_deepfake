<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=220&section=header&text=DeepScan&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=AI-Generated%20Media%20Verifier&descAlignY=58&descSize=20&animation=fadeIn" width="100%"/>

<br/>

[![Status](https://img.shields.io/badge/status-active-22c55e?style=flat-square)](.)
[![Node](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](.)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)](.)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](.)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](.)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](.)
[![License](https://img.shields.io/badge/license-academic-8B5CF6?style=flat-square)](.)

<br/>

> **See it. Scan it. Know it.** Upload any image or video — get a verdict in seconds.
> Powered by Xception deep learning + EXIF metadata forensics.

<br/>

**Department of Computer Science & Engineering · Section 2FH · Academic Project**

</div>

---

## ✦ At a Glance

<div align="center">

| 🧠 **Deep Learning** | 🔎 **Metadata Forensics** | ⚡ **2s Latency** |
|:---|:---:|:---:|
| Xception backbone + PyTorch | EXIF camera, GPS, AI-software flags | End-to-end under 3 seconds |

</div>

---

## ✦ Quick Start

```bash
git clone https://github.com/namann5/Ai_deepfake.git
cd Ai_deepfake

# Docker — one command, all services
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

| Service | URL |
|:---|---:|
| Frontend | `http://localhost:3001` |
| Backend API | `http://localhost:5000` |
| ML Inference | `http://localhost:7000` |

---

## ✦ Architecture

```
┌─ Browser ─────────────────────────────┐
│  React 19 · React Router 7 · Axios     │
└────────────────┬───────────────────────┘
                 │  POST /api/analyze
                 ▼
┌─ Node.js (Express 5) ─────────────────┐
│  Multer · Rate Limiter · Helmet · CORS │
├────────────┬───────────────────────────┤
│ Metadata   │  ML Client (axios) ───────┼──► FastAPI · PyTorch · Xception
│ (exifr)    │                           │
└────────────┴───────────────────────────┘
        │              │
        └── Score Aggregator ──► MongoDB
```

### Services

| Container | Role |
|:---|---|
| `deepscan-backend` | Express API — routing, validation, orchestration |
| `deepscan-ml-service` | FastAPI + PyTorch — Xception deepfake inference |
| `deepscan-frontend` | React SPA — upload, results, history |
| `deepscan-mongo` | MongoDB 7 — scan persistence |

---

## ✨ Features

| | |
|---|---|
| 🖼️ **Image & Video Upload** | JPEG/PNG/WEBP + MP4/MOV — drag & drop or click |
| 🤖 **Deep Learning Detection** | Xception backbone → pixel-level forgery analysis |
| 🔎 **EXIF Forensics** | Camera make/model, GPS, timestamps, AI software signatures |
| 📊 **Probability Score** | 0–100% with "Synthetic" / "Real" verdict + confidence band |
| 🗄️ **Scan History** | Every result stored in MongoDB with full breakdown |
| 🐳 **Dockerized** | `docker compose up` — all four containers, one command |

---

## ✦ API

### `POST /api/analyze`

```http
Content-Type: multipart/form-data
Field: image (file) · Optional: description (string)
```

```json
{
  "prediction": "deepfake",
  "score": 72.4,
  "verdict": "SYNTHETIC",
  "confidence": "Medium",
  "breakdown": {
    "model_score": 68.0,
    "metadata_score": 85.0
  },
  "flags": ["No EXIF data found — strong synthetic signal"]
}
```

### `GET /api/results`

```http
?page=1&limit=20
```

### `GET /api/results/:id`

---

## ✦ Project Structure

```
deepscan-backend/
├── server.js                    # Express entry point
├── routes/analyze.js            # Analysis & results endpoints
├── services/
│   ├── mlservice.js             # ML inference client (axios)
│   ├── metadataService.js       # EXIF parsing & scoring
│   └── scoreAggregator.js       # Score fusion
├── middleware/fileValidator.js  # Multer upload validation
├── models/Result.js             # Mongoose schema
└── ml_server/
    ├── image_server.py          # 🔵 Primary — PyTorch + Xception
    └── video_server.py          # 🟡 Secondary — TensorFlow video classifier

deepscan-frontend/
└── src/
    ├── components/              # UploadZone, ResultCard, MetadataPanel, ...
    ├── pages/                   # Checker, History, About, ...
    └── services/api.js          # Axios client
```

---

## ✦ Team

| | Name | Role |
|---|---|---|
| 👤 | **Anurag Singh** | Backend & System Analysis |
| 👤 | **Arpita Raj** | Frontend & UI Design |
| 👤 | **Harshita Nagpal** | Frontend & Documentation |
| 👤 | **Naman Singh** | Backend & Testing |

**Supervisor:** Mr. Abhishek Singh · **Submitted To:** Mr. Sanjay Madaan

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=120&section=footer" width="100%"/>

**Fighting synthetic misinformation, one pixel at a time.** 🔍

*Department of Computer Science & Engineering · Section 2FH*

</div>
