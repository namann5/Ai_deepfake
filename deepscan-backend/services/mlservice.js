const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

// --- Config -----------------------------------------------------------------
const IMAGE_SERVER_URL = process.env.FLASK_ML_URL || 'http://127.0.0.1:7000';

function parseTimeoutMs(value, fallback) {
  const n = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

const IMAGE_PREDICT_TIMEOUT_MS = parseTimeoutMs(process.env.ML_IMAGE_TIMEOUT_MS, 180000);
const VIDEO_PREDICT_TIMEOUT_MS = parseTimeoutMs(process.env.ML_VIDEO_TIMEOUT_MS, 300000);

const IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'];
const VIDEO_MIMES = ['video/mp4', 'video/webm', 'video/avi', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];

const detectMediaType = (filePath, mimeType) => {
  if (mimeType) {
    if (IMAGE_MIMES.includes(mimeType)) return 'image';
    if (VIDEO_MIMES.includes(mimeType)) return 'video';
  }

  const ext = path.extname(filePath).toLowerCase();
  const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'];
  const videoExts = ['.mp4', '.webm', '.avi', '.mov', '.mkv'];

  if (imageExts.includes(ext)) return 'image';
  if (videoExts.includes(ext)) return 'video';
  return 'image';
};

const runImageModel = async (filePath) => {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post(
      `${IMAGE_SERVER_URL}/predict/image`,
      form,
      {
        headers: form.getHeaders(),
        timeout: IMAGE_PREDICT_TIMEOUT_MS,
        maxContentLength: 50 * 1024 * 1024,
        maxBodyLength: 50 * 1024 * 1024,
      }
    );

    const { prediction, confidence, deepfake_probability } = response.data || {};
    const score = Number(deepfake_probability * 100);

    return {
      prediction,
      confidence,
      model_score: score,
      status: 'success',
      media_type: 'image',
    };
  } catch (err) {
    console.error('Image ML Service Error:', err.message);
    if (err.response) {
      console.error('Server response:', err.response.data);
    }
    throw err;
  }
};

const runVideoModel = async (filePath) => {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post(
      `${IMAGE_SERVER_URL}/predict/video-as-image`,
      form,
      {
        headers: form.getHeaders(),
        timeout: VIDEO_PREDICT_TIMEOUT_MS,
        maxContentLength: 50 * 1024 * 1024,
        maxBodyLength: 50 * 1024 * 1024,
      }
    );

    const { prediction, confidence, deepfake_probability } = response.data || {};
    const score = Number(deepfake_probability * 100);

    return {
      model_score: score,
      prediction,
      confidence,
      status: 'success',
      media_type: 'video',
    };
  } catch (err) {
    console.error('Video ML Service Error:', err.message);
    if (err.response) {
      console.error('Server response:', err.response.data);
    }
    throw err;
  }
};

const runMLModel = async (filePath, mimeType) => {
  const mediaType = detectMediaType(filePath, mimeType);
  console.log(`Running ${mediaType} prediction model for: ${path.basename(filePath)}`);

  if (mediaType === 'video') {
    return runVideoModel(filePath);
  }
  return runImageModel(filePath);
};

module.exports = { runMLModel, detectMediaType };
