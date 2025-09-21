import type React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import type ViewShot from 'react-native-view-shot';
import { styles } from '../styles/styles';
import BasePreview from './BasePreview';

interface GradientPreviewProps {
  gradient: {
    colors: string[];
    start: { x: number; y: number };
    end: { x: number; y: number };
  };
  viewShotRef: React.RefObject<ViewShot | null>;
  onCopyResolution?: () => void;
}

const GradientPreview: React.FC<GradientPreviewProps> = ({
  gradient,
  viewShotRef,
  onCopyResolution,
}) => {
  return (
    <BasePreview viewShotRef={viewShotRef} onCopyResolution={onCopyResolution}>
      <LinearGradient
        colors={gradient.colors}
        start={gradient.start}
        end={gradient.end}
        style={styles.wallpaperPreview}
      />
    </BasePreview>
  );
};

export default GradientPreview;
