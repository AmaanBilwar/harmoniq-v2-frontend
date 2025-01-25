"use client";
import React, { useRef, useState, useEffect } from 'react';

const CameraComponent = () => {
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam', error);
      }
    };

    enableVideoStream();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [mediaStream]);

  const captureImages = async () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const images = [];

    for (let i = 0; i < 5; i++) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      images.push(imageData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second between captures
    }

    // Send images to server
    fetch('/api/save-images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ images }),
    });
  };

  return (
    <div>
      <video ref={videoRef} autoPlay className="border border-gray-300 shadow-lg" />
      <button onClick={captureImages} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Capture Images
      </button>
    </div>
  );
};

export default CameraComponent;
