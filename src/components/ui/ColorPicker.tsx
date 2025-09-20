import type React from 'react';
import { View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import type { Theme } from '../../constants/theme';
import { styles } from '../../styles/styles';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  theme: Pick<Theme, 'cardBackground' | 'border' | 'text'>;
}

const ColorPickerComponent: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
  theme,
}) => {
  return (
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
  );
};

export default ColorPickerComponent;
