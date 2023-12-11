import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

const videoWidth  = 500;
const videoHeight = 500;
const videoFrameRate = 5;

const constraints: MediaStreamConstraints = {
  audio: false,
  video: {
    width:  { min: 1280, ideal: 1920, max: 2560 },
    height: { min: 720 , ideal: 1080, max: 1440 } ,
    frameRate: {
      max: videoFrameRate,
    }//,
    // facingMode: {
    //   exact: 'environment',
    // },
  },
};
  
const QRCodeScanner = () => {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number>();
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const [isContinue, setIsContinue] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string[]>([]);

  useEffect(() => {
    const openCamera = async () => {
      const video = videoRef.current;
      if (video) {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;

        navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
          devices.forEach(function(device) {
              if(device.kind === "videoinput"){
                  console.log(device.kind + ": " + device.label + ":" + device.deviceId);
                  // ここでdeviceのリストを作って利用するなど
              }
          });
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        });
      }
    };
    openCamera();
  }, [])

  return (
    <div className="App">
      <p>QR Code Scanner</p>
      <div style={{ display: 'grid' }}>
        <div>
          <video autoPlay playsInline={true} ref={videoRef} style={{ width: '100%' }}>
            <canvas width={videoWidth} height={videoHeight} ref={canvasRef} />
          </video>
        </div>
        <div>
          <p>{qrCodeData.join('\n')}</p>
        </div>
        <div>
          {/* <button onClick={handleStart}>Start Scan</button>
          <button onClick={handleStop}>Stop Scan</button> */}
        </div>
      </div>
      hello QRCodeScanner
    </div>
  );
}

export default QRCodeScanner;
