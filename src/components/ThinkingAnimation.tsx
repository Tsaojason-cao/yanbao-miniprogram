import React from 'react';
import { IonIcon } from '@ionic/react';
import { apertureOutline } from 'ionicons/icons';
import './ThinkingAnimation.css';

interface ThinkingAnimationProps {
  message?: string;
}

const ThinkingAnimation: React.FC<ThinkingAnimationProps> = ({ message = "大师思考中..." }) => {
  return (
    <div className="thinking-container flex flex-col items-center justify-center p-8">
      <div className="relative">
        {/* 呼吸光环 */}
        <div className="absolute inset-0 bg-primary opacity-20 rounded-full animate-ping"></div>
        <div className="absolute inset-0 bg-primary opacity-10 rounded-full animate-pulse delay-75"></div>
        
        {/* 核心图标 */}
        <IonIcon 
          icon={apertureOutline} 
          className="text-6xl text-primary relative z-10 animate-spin-slow" 
          style={{ animationDuration: '3s' }}
        />
      </div>
      
      {/* 文字提示 */}
      <p className="mt-4 text-gray-500 text-sm font-medium tracking-widest animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default ThinkingAnimation;
