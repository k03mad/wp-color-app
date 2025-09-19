import type React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import type { Theme } from '../../constants/theme';
import { styles } from '../../styles/styles';

interface ColorPickerButtonProps {
  showColorPicker: boolean;
  onPress: () => void;
  theme: Pick<Theme, 'cardBackground' | 'border' | 'text'>;
}

const ColorPickerButton: React.FC<ColorPickerButtonProps> = ({
  showColorPicker,
  onPress,
  theme,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.colorPickerButton,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.colorPickerButtonText}>
        {showColorPicker ? 'Скрыть' : 'Палитра'}
      </Text>
    </TouchableOpacity>
  );
};

export default ColorPickerButton;
