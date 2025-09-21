import type React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../styles/styles';
import { getContrastColor } from '../utils/color';

interface GenerateButtonProps {
  selectedColor: string;
  onPress: () => void;
  selectedGradient?: {
    colors: string[];
    start: { x: number; y: number };
    end: { x: number; y: number };
  } | null;
  isGradientMode?: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  selectedColor,
  onPress,
  selectedGradient,
  isGradientMode = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.generateButton, styles.hiddenOverflow]}
      onPress={onPress}
    >
      <LinearGradient
        colors={
          isGradientMode && selectedGradient
            ? selectedGradient.colors
            : [selectedColor, `${selectedColor}CC`]
        }
        start={
          isGradientMode && selectedGradient
            ? selectedGradient.start
            : { x: 0, y: 0 }
        }
        end={
          isGradientMode && selectedGradient
            ? selectedGradient.end
            : { x: 1, y: 1 }
        }
        style={styles.gradientButton}
      >
        <Text
          style={[
            styles.generateButtonText,
            {
              color:
                isGradientMode && selectedGradient
                  ? getContrastColor(selectedGradient.colors[0])
                  : getContrastColor(selectedColor),
            },
          ]}
        >
          Save as Wallpaper
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GenerateButton;
