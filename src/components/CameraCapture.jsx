// src/components/CameraCapture.jsx
import React, { useRef, useState, useEffect } from "react";
import api, { setAuthToken } from "../api/axiosClient";

export default function CameraCapture({ sessionId, onUploaded }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // start camera
    async function start() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error("Camera start failed", err);
      }
    }
    start();
    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setPreviewDataUrl(dataUrl);
    setCapturing(true);
  };

  const dataUrlToFile = (dataUrl, fileName = "capture.jpg") => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], fileName, { type: mime });
  };

  const upload = async () => {
    if (!previewDataUrl || !sessionId) return alert("No image or session missing.");
    setUploading(true);
    try {
      const token = localStorage.getItem("accessToken");
      setAuthToken(token); // optional; axios client can already have token
      const file = dataUrlToFile(previewDataUrl, `kyc-${Date.now()}.jpg`);
      const fd = new FormData();
      fd.append("image", file);

      const res = await api.post(`/api/kyc/upload/${sessionId}`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setUploading(false);
      setPreviewDataUrl(null);
      setCapturing(false);
      if (onUploaded) onUploaded(res.data);
    } catch (err) {
      setUploading(false);
      console.error("Upload error", err);
      alert(err?.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-3">
        <video ref={videoRef} autoPlay playsInline muted className="w-full max-w-md rounded shadow" />
      </div>
      <div className="space-x-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={capture}>Capture</button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => { setPreviewDataUrl(null); setCapturing(false); }}>Retake</button>
      </div>

      {capturing && previewDataUrl && (
        <div className="mt-4">
          <img src={previewDataUrl} alt="preview" className="w-full max-w-md border" />
          <div className="mt-2">
            <button onClick={upload} disabled={uploading} className="px-4 py-2 bg-green-600 text-white rounded">
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
