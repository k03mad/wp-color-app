import type React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import type { Theme } from '../../constants/theme';
import { styles } from '../../styles/styles';
import { getContrastColor } from '../../utils/color';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  showColorPicker: boolean;
  onTogglePicker: () => void;
  theme: Pick<Theme, 'cardBackground' | 'border' | 'text'>;
}

const ColorPickerComponent: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
  showColorPicker,
  onTogglePicker,
  theme,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.colorPickerButton,
          {
            backgroundColor: selectedColor,
          },
        ]}
        onPress={onTogglePicker}
      >
        <Text
          style={[
            styles.colorPickerButtonText,
            { color: getContrastColor(selectedColor) },
          ]}
        >
          {showColorPicker ? 'Скрыть' : 'Палитра'}
        </Text>
      </TouchableOpacity>

      {showColorPicker && (
        <View
          style={[
            styles.colorPickerContainer,
            { backgroundColor: theme.cardBackground },
          ]}
        >
          <View style={styles.colorPicker}>
            <ColorPicker
              color={selectedColor}
              onColorChange={onColorChange}
              thumbSize={30}
              sliderSize={30}
              noSnap={false}
              row={false}
              swatches={false}
              discrete={false}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ColorPickerComponent;
