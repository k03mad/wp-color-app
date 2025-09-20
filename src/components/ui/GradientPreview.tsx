import type React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ViewShot from 'react-native-view-shot';
import { styles } from '../../styles/styles';

const screenData = Dimensions.get('screen');
const pixelRatio = screenData.scale;
const screenWidth = screenData.width * pixelRatio;
const screenHeight = screenData.height * pixelRatio;

interface GradientPreviewProps {
  gradient: {
    colors: string[];
    start: { x: number; y: number };
    end: { x: number; y: number };
    name: string;
  };
  onPress: () => void;
  viewShotRef: React.RefObject<ViewShot | null>;
}

const GradientPreview: React.FC<GradientPreviewProps> = ({
  gradient,
  onPress,
  viewShotRef,
}) => {
  return (
    <TouchableOpacity
      style={styles.previewContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ViewShot
        ref={viewShotRef}
        options={{
          format: 'png',
          quality: 1.0,
          width: screenWidth,
          height: screenHeight,
        }}
        style={styles.wallpaperPreview}
      >
        <View style={styles.wallpaperPreview}>
          <LinearGradient
            colors={gradient.colors}
            start={gradient.start}
            end={gradient.end}
            style={styles.wallpaperPreview}
          />
        </View>
      </ViewShot>
    </TouchableOpacity>
  );
};

export default GradientPreview;
