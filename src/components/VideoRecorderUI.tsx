import React, { useRef, useState, useEffect } from 'react';
import { IonButton, IonIcon, IonFab, IonFabButton, IonContent, IonPage, IonToast } from '@ionic/react';
import { videocamOutline, stopCircleOutline, cloudUploadOutline, playOutline } from 'ionicons/icons';
import { VideoRecorder } from '../services/VideoRecorder';
import { CloudStorage } from '../services/CloudStorage';
import './VideoRecorderUI.css';

const VideoRecorderUI: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [uploading, setUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  
  const recorder = useRef(new VideoRecorder());

  useEffect(() => {
    startCamera();
    return () => {
      // Cleanup stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setToastMessage("无法访问摄像头，请检查权限");
    }
  };

  const handleToggleRecord = async () => {
    if (isRecording) {
      const blob = await recorder.current.stopRecording();
      setRecordedBlob(blob);
      setIsRecording(false);
      
      // Preview recorded video
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.src = URL.createObjectURL(blob);
        videoRef.current.loop = true;
        videoRef.current.play();
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        recorder.current.startRecording(videoRef.current.srcObject as MediaStream);
        setIsRecording(true);
        setRecordedBlob(null);
      } else {
        // Restart camera if needed
        await startCamera();
        // Small delay to ensure stream is ready
        setTimeout(() => handleToggleRecord(), 500);
      }
    }
  };

  const handleUpload = async () => {
    if (!recordedBlob) return;
    
    setUploading(true);
    try {
      const url = await CloudStorage.uploadFile(recordedBlob, `video-${Date.now()}.webm`);
      setToastMessage(`上传成功！链接: ${url}`);
    } catch (error) {
      setToastMessage("上传失败，请重试");
    } finally {
      setUploading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="video-recorder-container">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted={isRecording} // Mute preview while recording to avoid feedback
          className="video-preview"
        />
        
        <div className="controls-overlay">
          {/* Record Button */}
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton 
              color={isRecording ? "danger" : "light"} 
              onClick={handleToggleRecord}
              className={isRecording ? "recording-pulse" : ""}
            >
              <IonIcon icon={isRecording ? stopCircleOutline : videocamOutline} />
            </IonFabButton>
          </IonFab>

          {/* Upload Button (Visible after recording) */}
          {!isRecording && recordedBlob && (
            <IonFab vertical="bottom" horizontal="end" slot="fixed" className="mb-4 mr-4">
              <IonFabButton color="primary" onClick={handleUpload} disabled={uploading}>
                <IonIcon icon={cloudUploadOutline} />
              </IonFabButton>
            </IonFab>
          )}
          
          {/* Retake Button */}
          {!isRecording && recordedBlob && (
            <IonFab vertical="bottom" horizontal="start" slot="fixed" className="mb-4 ml-4">
              <IonFabButton color="medium" onClick={startCamera}>
                <IonIcon icon={playOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </div>

        <IonToast
          isOpen={!!toastMessage}
          onDidDismiss={() => setToastMessage('')}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default VideoRecorderUI;
