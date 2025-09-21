import type React from 'react';
import { View } from 'react-native';
import type ViewShot from 'react-native-view-shot';
import { styles } from '../styles/styles';
import BasePreview from './BasePreview';

interface ColorPreviewProps {
  selectedColor: string;
  viewShotRef: React.RefObject<ViewShot | null>;
  onCopyResolution: () => void;
}

const ColorPreview: React.FC<ColorPreviewProps> = ({
  selectedColor,
  viewShotRef,
  onCopyResolution,
}) => {
  return (
    <BasePreview viewShotRef={viewShotRef} onCopyResolution={onCopyResolution}>
      <View
        style={[styles.wallpaperPreview, { backgroundColor: selectedColor }]}
      />
    </BasePreview>
  );
};

export default ColorPreview;
