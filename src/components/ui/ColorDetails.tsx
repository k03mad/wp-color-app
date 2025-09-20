import type React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../constants/theme';
import { styles } from '../../styles/styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ColorDetailsProps {
  colorInfo: {
    rgb: { r: number; g: number; b: number };
    hsl: { h: number; s: number; l: number };
    cmyk: { c: number; m: number; y: number; k: number };
  } | null;
  onCopyRgb: () => void;
  onCopyHsl: () => void;
  onCopyCmyk: () => void;
  onCopyResolution: () => void;
  isGradientMode?: boolean;
}

const ColorDetails: React.FC<ColorDetailsProps> = ({
  colorInfo,
  onCopyRgb,
  onCopyHsl,
  onCopyCmyk,
  onCopyResolution,
  isGradientMode = false,
}) => {
  if (!colorInfo) return null;

  return (
    <View style={styles.section}>
      <View style={styles.colorInfoContainer}>
        <View style={styles.colorInfoHeader} />
        <TouchableOpacity onPress={onCopyRgb} disabled={isGradientMode}>
          <Text style={[styles.colorInfoText, { color: theme.text }]}>
            RGB:{' '}
            {isGradientMode
              ? '-'
              : `${colorInfo.rgb.r}, ${colorInfo.rgb.g}, ${colorInfo.rgb.b}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCopyHsl} disabled={isGradientMode}>
          <Text style={[styles.colorInfoText, { color: theme.text }]}>
            HSL:{' '}
            {isGradientMode
              ? '-'
              : `${colorInfo.hsl.h}°, ${colorInfo.hsl.s}%, ${colorInfo.hsl.l}%`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCopyCmyk} disabled={isGradientMode}>
          <Text style={[styles.colorInfoText, { color: theme.text }]}>
            CMYK:{' '}
            {isGradientMode
              ? '-'
              : `${colorInfo.cmyk.c}%, ${colorInfo.cmyk.m}%, ${colorInfo.cmyk.y}%, ${colorInfo.cmyk.k}%`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCopyResolution}>
          <View style={styles.resolutionInfo}>
            <Text style={[styles.colorInfoText, { color: theme.text }]}>
              PX: {Math.round(screenWidth)} × {Math.round(screenHeight)}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.colorInfoHeader} />
      </View>
    </View>
  );
};

export default ColorDetails;
