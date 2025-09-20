import type React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';
import { getContrastColor } from '../../utils/color';

interface GenerateButtonProps {
  selectedColor: string;
  onPress: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  selectedColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.generateButton, { backgroundColor: selectedColor }]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.generateButtonText,
          { color: getContrastColor(selectedColor) },
        ]}
      >
        Сохранить цвет как обои
      </Text>
    </TouchableOpacity>
  );
};

export default GenerateButton;
