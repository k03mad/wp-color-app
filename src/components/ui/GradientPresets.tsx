import type React from 'react';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { GradientPreset } from '../../constants/gradients';
import { theme } from '../../constants/theme';
import { styles } from '../../styles/styles';

interface GradientPresetsProps {
  gradients: GradientPreset[];
  selectedGradient: GradientPreset | null;
  onSelectGradient: (gradient: GradientPreset) => void;
}

const GradientPresets: React.FC<GradientPresetsProps> = ({
  gradients,
  selectedGradient,
  onSelectGradient,
}) => {
  return (
    <View style={styles.presetSection}>
      <View style={styles.presetColorsGrid}>
        {gradients.map((gradient) => (
          <TouchableOpacity
            key={`gradient-${gradient.name}`}
            style={[
              styles.presetColorBox,
              {
                borderColor: theme.border,
                overflow: 'hidden',
              },
              selectedGradient?.name === gradient.name &&
                styles.selectedGradientContainer,
            ]}
            onPress={() => onSelectGradient(gradient)}
          >
            <LinearGradient
              colors={gradient.colors}
              start={gradient.start}
              end={gradient.end}
              style={styles.gradientBox}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default GradientPresets;
