import type React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { styles } from '../../styles/styles';

const screenData = Dimensions.get('screen');
const pixelRatio = screenData.scale;
const screenWidth = screenData.width * pixelRatio;
const screenHeight = screenData.height * pixelRatio;

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
        </View>
      </ViewShot>
    </TouchableOpacity>
  );
};

export default ColorPreview;
