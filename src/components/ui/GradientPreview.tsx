import type React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ViewShot from 'react-native-view-shot';
import { styles } from '../../styles/styles';
import { getContrastColor } from '../../utils/color';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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

          <View
            style={[
              styles.gradientOverlay,
              {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            ]}
          />

          <View style={styles.previewTextOverlay}>
            <Text
              style={[
                styles.previewText,
                { color: getContrastColor(gradient.colors[0]) },
              ]}
            >
              {gradient.name}
            </Text>
          </View>
        </View>
      </ViewShot>
    </TouchableOpacity>
  );
};

export default GradientPreview;
