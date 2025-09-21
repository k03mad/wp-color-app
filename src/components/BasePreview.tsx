import type React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { styles } from '../styles/styles';

const screenData = Dimensions.get('screen');
const pixelRatio = screenData.scale;
const screenWidth = screenData.width * pixelRatio;
const screenHeight = screenData.height * pixelRatio;

interface BasePreviewProps {
  viewShotRef: React.RefObject<ViewShot | null>;
  children: React.ReactNode;
  onCopyResolution?: () => void;
}

const BasePreview: React.FC<BasePreviewProps> = ({
  viewShotRef,
  children,
  onCopyResolution,
}) => {
  return (
    <View style={styles.previewContainer}>
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
        <View style={styles.wallpaperPreview}>{children}</View>
      </ViewShot>
      {onCopyResolution && (
        <View style={styles.previewOverlay}>
          <TouchableOpacity onPress={onCopyResolution}>
            <View style={styles.previewResolutionContainer}>
              <View style={styles.previewResolutionInfo}>
                <Text style={styles.previewResolutionText}>
                  Screen: {Math.round(screenData.width)} ×{' '}
                  {Math.round(screenData.height)} (scale: {pixelRatio})
                </Text>
                <Text style={styles.previewResolutionText}>
                  Physical: {Math.round(screenWidth)} ×{' '}
                  {Math.round(screenHeight)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default BasePreview;
