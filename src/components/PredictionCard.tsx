import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonIcon } from '@ionic/react';
import { sparkles, mapOutline, colorWandOutline } from 'ionicons/icons';

interface Prediction {
  type: 'filter' | 'location' | 'action';
  title: string;
  description: string;
  confidence: number;
  actionLabel: string;
  icon: string;
}

const PredictionCard: React.FC = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching prediction from Master Brain
    const fetchPrediction = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on "context"
      setPrediction({
        type: 'filter',
        title: '捕捉此刻情绪',
        description: '检测到阴雨天气，建议使用「昨日落日」风格增强氛围感。',
        confidence: 0.85,
        actionLabel: '应用风格',
        icon: colorWandOutline
      });
      setLoading(false);
    };

    fetchPrediction();
  }, []);

  if (loading) {
    return (
      <IonCard className="animate-pulse">
        <IonCardContent>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </IonCardContent>
      </IonCard>
    );
  }

  if (!prediction) return null;

  return (
    <IonCard className="sanmu-prediction-card border-l-4 border-primary">
      <IonCardHeader>
        <div className="flex justify-between items-center">
          <IonCardSubtitle className="text-primary flex items-center gap-1">
            <IonIcon icon={sparkles} />
            Sanmu 预测
          </IonCardSubtitle>
          <span className="text-xs text-gray-400">置信度 {Math.round(prediction.confidence * 100)}%</span>
        </div>
        <IonCardTitle className="text-lg font-bold mt-1">{prediction.title}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p className="mb-3 text-sm text-gray-600">{prediction.description}</p>
        <IonButton expand="block" size="small" className="sanmu-btn-primary">
          <IonIcon slot="start" icon={prediction.icon} />
          {prediction.actionLabel}
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default PredictionCard;
