import type React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../constants/theme';
import { styles } from '../../styles/styles';

interface ColorInfoProps {
  colorInfo: {
    rgb: { r: number; g: number; b: number };
    hsl: { h: number; s: number; l: number };
    cmyk: { c: number; m: number; y: number; k: number };
  } | null;
  onCopyRgb: () => void;
  onCopyHsl: () => void;
  onCopyCmyk: () => void;
  isGradientMode?: boolean;
}

const ColorInfo: React.FC<ColorInfoProps> = ({
  colorInfo,
  onCopyRgb,
  onCopyHsl,
  onCopyCmyk,
  isGradientMode = false,
}) => {
  if (!colorInfo) return null;

  return (
    <View style={styles.section}>
      <View style={styles.colorInfoContainer}>
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
      </View>
    </View>
  );
};

export default ColorInfo;
