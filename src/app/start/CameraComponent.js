import React, { useRef, useEffect } from 'react';

const CameraComponent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const getVideo = async () => {
      const constraints = {
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          aspectRatio: 16/9,
          frameRate: { ideal: 30 },
          facingMode: "user",
          // Fall back to lower resolutions if needed
          advanced: [
            { width: 1920, height: 1080 },
            { width: 1280, height: 720 },
            { width: 640, height: 480 }
          ]
        }
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Apply settings to the video track
          const videoTrack = stream.getVideoTracks()[0];
          await videoTrack.applyConstraints(constraints.video);
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
        // Try fallback to basic constraints
        try {
          const basicStream = await navigator.mediaDevices.getUserMedia({ 
            video: true 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = basicStream;
          }
        } catch (fallbackErr) {
          console.error("Fallback also failed:", fallbackErr);
        }
      }
    };

    getVideo();
    
    return () => {
      // Cleanup
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline
        style={{ 
          width: '45%',
          maxWidth: '1920px',
          height: 'auto'
        }} 
      />
    </div>
  );
};

export default CameraComponent;