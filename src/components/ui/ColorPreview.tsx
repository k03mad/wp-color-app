import type React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { styles } from '../../styles/styles';
import { getContrastColor } from '../../utils/color';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ColorPreviewProps {
  selectedColor: string;
  onPress: () => void;
  viewShotRef: React.RefObject<ViewShot | null>;
}

const ColorPreview: React.FC<ColorPreviewProps> = ({
  selectedColor,
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
          <View
            style={[
              styles.wallpaperPreview,
              { backgroundColor: selectedColor },
            ]}
          />

          <View
            style={[
              styles.gradientOverlay,
              {
                backgroundColor: `${selectedColor}20`,
              },
            ]}
          />

          <View style={styles.previewTextOverlay}>
            <Text
              style={[
                styles.previewText,
                { color: getContrastColor(selectedColor) },
              ]}
            >
              {selectedColor.toUpperCase()}
            </Text>
          </View>
        </View>
      </ViewShot>
    </TouchableOpacity>
  );
};

export default ColorPreview;
