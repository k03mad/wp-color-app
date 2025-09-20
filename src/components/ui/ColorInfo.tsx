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
}

const ColorInfo: React.FC<ColorInfoProps> = ({
  colorInfo,
  onCopyRgb,
  onCopyHsl,
  onCopyCmyk,
}) => {
  if (!colorInfo) return null;

  return (
    <View style={styles.section}>
      <View style={styles.colorInfoContainer}>
        <TouchableOpacity onPress={onCopyRgb}>
          <Text style={[styles.colorInfoText, { color: theme.text }]}>
            RGB: {colorInfo.rgb.r}, {colorInfo.rgb.g}, {colorInfo.rgb.b}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCopyHsl}>
          <Text style={[styles.colorInfoText, { color: theme.text }]}>
            HSL: {colorInfo.hsl.h}°, {colorInfo.hsl.s}%, {colorInfo.hsl.l}%
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCopyCmyk}>
          <Text style={[styles.colorInfoText, { color: theme.text }]}>
            CMYK: {colorInfo.cmyk.c}%, {colorInfo.cmyk.m}%, {colorInfo.cmyk.y}%,{' '}
            {colorInfo.cmyk.k}%
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ColorInfo;
