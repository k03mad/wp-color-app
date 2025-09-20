import type React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
  selectedGradient?: {
    colors: string[];
    start: { x: number; y: number };
    end: { x: number; y: number };
  } | null;
  isGradientMode?: boolean;
}

const ColorPickerComponent: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
  showColorPicker,
  onTogglePicker,
  theme,
  selectedGradient,
  isGradientMode = false,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.colorPickerButton,
          {
            overflow: 'hidden',
          },
        ]}
        onPress={onTogglePicker}
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
              styles.colorPickerButtonText,
              { color: getContrastColor(selectedColor) },
            ]}
          >
            {showColorPicker ? 'Скрыть' : 'Палитра'}
          </Text>
        </LinearGradient>
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
