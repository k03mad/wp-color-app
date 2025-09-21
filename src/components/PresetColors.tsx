import type React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import { styles } from '../styles/styles';

interface PresetColorsProps {
  colors: string[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const PresetColors: React.FC<PresetColorsProps> = ({
  colors,
  selectedColor,
  onSelectColor,
}) => {
  return (
    <View style={styles.presetSection}>
      <View style={styles.presetColorsGrid}>
        {colors.map((color) => (
          <TouchableOpacity
            key={`color-${color}`}
            style={[
              styles.presetColorBox,
              {
                backgroundColor: color,
                borderColor: theme.border,
              },
              selectedColor === color && styles.selectedPresetColor,
            ]}
            onPress={() => onSelectColor(color)}
          />
        ))}
      </View>
    </View>
  );
};

export default PresetColors;
