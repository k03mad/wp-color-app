import Clipboard from '@react-native-clipboard/clipboard';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import { styles } from '../styles/styles';
import { hexToRgb, isValidRgb, rgbToHex } from '../utils/color';

interface ColorDetailsProps {
  colorInfo: {
    rgb: { r: number; g: number; b: number };
  } | null;
  selectedColor: string;
  onColorChange: (color: string) => void;
  isFromPreset?: boolean;
}

const ColorDetails: React.FC<ColorDetailsProps> = ({
  colorInfo,
  selectedColor,
  onColorChange,
  isFromPreset = false,
}) => {
  const [hexValue, setHexValue] = useState(
    selectedColor.replace('#', '').toUpperCase(),
  );
  const [rValue, setRValue] = useState('0');
  const [gValue, setGValue] = useState('0');
  const [bValue, setBValue] = useState('0');
  const [hexError, setHexError] = useState(false);
  const [rgbError, setRgbError] = useState(false);

  useEffect(() => {
    if (isFromPreset) {
      const currentHex = selectedColor.replace('#', '').toUpperCase();
      setHexValue(currentHex);

      if (colorInfo) {
        setRValue(colorInfo.rgb.r.toString());
        setGValue(colorInfo.rgb.g.toString());
        setBValue(colorInfo.rgb.b.toString());
      }
    }
  }, [selectedColor, colorInfo, isFromPreset]);

  const handleHexChange = useCallback(
    (value: string) => {
      const cleanValue = value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
      setHexValue(cleanValue);

      if (cleanValue.length === 6) {
        const hexColor = `#${cleanValue}`;
        const rgb = hexToRgb(hexColor);
        if (rgb) {
          setHexError(false);
          setRValue(rgb.r.toString());
          setGValue(rgb.g.toString());
          setBValue(rgb.b.toString());
          onColorChange(hexColor);
        } else {
          setHexError(true);
        }
      } else if (cleanValue.length === 0) {
        setHexError(false);
      } else if (cleanValue.length > 0) {
        setHexError(true);
      }
    },
    [onColorChange],
  );

  const handleRgbChange = useCallback(
    (r: string, g: string, b: string) => {
      const rNum = parseInt(r, 10);
      const gNum = parseInt(g, 10);
      const bNum = parseInt(b, 10);

      if (isValidRgb(rNum, gNum, bNum)) {
        setRgbError(false);

        const hexColor = rgbToHex(rNum, gNum, bNum);
        setHexValue(hexColor.replace('#', ''));
        onColorChange(hexColor);
      } else if (r !== '' || g !== '' || b !== '') {
        setRgbError(true);
      } else {
        setRgbError(false);
      }
    },
    [onColorChange],
  );

  const handleRgbInputChange = useCallback(
    (
      value: string,
      setter: (value: string) => void,
      currentR: string,
      currentG: string,
      currentB: string,
    ) => {
      const numericValue = value.replace(/[^0-9]/g, '');
      setter(numericValue);

      let newR = currentR;
      let newG = currentG;
      let newB = currentB;

      if (setter === setRValue) {
        newR = numericValue;
      } else if (setter === setGValue) {
        newG = numericValue;
      } else if (setter === setBValue) {
        newB = numericValue;
      }

      handleRgbChange(newR, newG, newB);
    },
    [handleRgbChange],
  );

  const handleCopyHex = useCallback(() => {
    const hexString = `#${hexValue}`;
    Clipboard.setString(hexString);
  }, [hexValue]);

  const handleCopyRgb = useCallback(() => {
    const rNum = parseInt(rValue, 10);
    const gNum = parseInt(gValue, 10);
    const bNum = parseInt(bValue, 10);

    if (isValidRgb(rNum, gNum, bNum)) {
      const rgbValue = `rgb(${rNum}, ${gNum}, ${bNum})`;
      Clipboard.setString(rgbValue);
    }
  }, [rValue, gValue, bValue]);

  return (
    <View style={styles.section}>
      <View style={styles.colorInfoContainer}>
        <View style={styles.colorInputRow}>
          <Text style={[styles.colorLabel, { color: theme.text }]}>HEX</Text>
          <TextInput
            style={[
              styles.colorInput,
              {
                color: theme.text,
                borderColor: theme.border,
                backgroundColor: theme.background,
              },
              hexError && { borderColor: '#FF5252' },
            ]}
            value={hexValue}
            onChangeText={handleHexChange}
            placeholder="FFFFFF"
            placeholderTextColor={`${theme.text}80`}
            maxLength={6}
            autoCapitalize="characters"
            caretHidden={true}
          />
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyHex}>
            <Text style={[styles.copyButtonIcon, { color: theme.text }]}>
              📋
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.colorInputRow}>
          <Text style={[styles.colorLabel, { color: theme.text }]}>RGB</Text>
          <View style={styles.rgbInputs}>
            <TextInput
              style={[
                styles.rgbInput,
                {
                  color: theme.text,
                  borderColor: theme.border,
                  backgroundColor: theme.background,
                },
                rgbError && { borderColor: '#FF5252' },
              ]}
              value={rValue}
              onChangeText={(value) =>
                handleRgbInputChange(value, setRValue, rValue, gValue, bValue)
              }
              keyboardType="numeric"
              maxLength={3}
              placeholder="0"
              placeholderTextColor={`${theme.text}80`}
              caretHidden={true}
            />
            <TextInput
              style={[
                styles.rgbInput,
                {
                  color: theme.text,
                  borderColor: theme.border,
                  backgroundColor: theme.background,
                },
                rgbError && { borderColor: '#FF5252' },
              ]}
              value={gValue}
              onChangeText={(value) =>
                handleRgbInputChange(value, setGValue, rValue, gValue, bValue)
              }
              keyboardType="numeric"
              maxLength={3}
              placeholder="0"
              placeholderTextColor={`${theme.text}80`}
              caretHidden={true}
            />
            <TextInput
              style={[
                styles.rgbInput,
                {
                  color: theme.text,
                  borderColor: theme.border,
                  backgroundColor: theme.background,
                },
                rgbError && { borderColor: '#FF5252' },
              ]}
              value={bValue}
              onChangeText={(value) =>
                handleRgbInputChange(value, setBValue, rValue, gValue, bValue)
              }
              keyboardType="numeric"
              maxLength={3}
              placeholder="0"
              placeholderTextColor={`${theme.text}80`}
              caretHidden={true}
            />
          </View>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyRgb}>
            <Text style={[styles.copyButtonIcon, { color: theme.text }]}>
              📋
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ColorDetails;
