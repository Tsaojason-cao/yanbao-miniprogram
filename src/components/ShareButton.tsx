import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { shareSocialOutline } from 'ionicons/icons';
import { Share } from '@capacitor/share';
import { useTranslation } from 'react-i18next';

const ShareButton: React.FC = () => {
  const { t } = useTranslation();

  const shareApp = async () => {
    await Share.share({
      title: 'Sanmu AI',
      text: 'Check out my masterpiece created with Sanmu AI!',
      url: 'https://sanmu.ai',
      dialogTitle: 'Share with friends',
    });
  };

  return (
    <IonButton onClick={shareApp}>
      <IonIcon slot="start" icon={shareSocialOutline} />
      {t('share')}
    </IonButton>
  );
};

export default ShareButton;
