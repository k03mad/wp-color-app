import Clipboard from '@react-native-clipboard/clipboard';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import type ViewShot from 'react-native-view-shot';
import { PRESET_BLACK_COLORS, PRESET_COLORS } from '../constants/colors';
import { theme } from '../constants/theme';
import { styles } from '../styles/styles';
import { getColorInfo } from '../utils/color';
import { requestStoragePermission } from '../utils/permissions';
import { generateWallpaper } from '../utils/wallpaper';
import ColorInfo from './ui/ColorInfo';
import ColorPicker from './ui/ColorPicker';
import ColorPreview from './ui/ColorPreview';
import GenerateButton from './ui/GenerateButton';
import PresetColors from './ui/PresetColors';

const App: React.FC = () => {
  const isDarkMode = true;
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  const colorInfo = getColorInfo(selectedColor);

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };

  const handleCopyRgb = () => {
    if (colorInfo) {
      copyToClipboard(
        `${colorInfo.rgb.r}, ${colorInfo.rgb.g}, ${colorInfo.rgb.b}`,
      );
    }
  };

  const handleCopyHsl = () => {
    if (colorInfo) {
      copyToClipboard(
        `${colorInfo.hsl.h}°, ${colorInfo.hsl.s}%, ${colorInfo.hsl.l}%`,
      );
    }
  };

  const handleCopyCmyk = () => {
    if (colorInfo) {
      copyToClipboard(
        `${colorInfo.cmyk.c}%, ${colorInfo.cmyk.m}%, ${colorInfo.cmyk.y}%, ${colorInfo.cmyk.k}%`,
      );
    }
  };

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const handleGenerateWallpaper = async () => {
    if (viewShotRef.current) {
      await generateWallpaper(
        viewShotRef as React.RefObject<ViewShot>,
        requestStoragePermission,
        selectedColor,
      );
    }
  };

  const selectPresetColor = (color: string) => {
    setSelectedColor(color);
    setShowColorPicker(false);
  };

  const handleCopyHex = () => {
    copyToClipboard(selectedColor.toUpperCase());
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <ColorPreview
          selectedColor={selectedColor}
          onPress={handleCopyHex}
          viewShotRef={viewShotRef}
        />

        <ScrollView
          style={styles.controlPanel}
          showsVerticalScrollIndicator={false}
        >
          <ColorInfo
            colorInfo={colorInfo}
            onCopyRgb={handleCopyRgb}
            onCopyHsl={handleCopyHsl}
            onCopyCmyk={handleCopyCmyk}
          />

          <View style={styles.section}>
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              showColorPicker={showColorPicker}
              onTogglePicker={() => setShowColorPicker(!showColorPicker)}
              theme={theme}
            />

            <GenerateButton
              selectedColor={selectedColor}
              onPress={handleGenerateWallpaper}
            />
          </View>

          <PresetColors
            colors={PRESET_COLORS}
            selectedColor={selectedColor}
            onSelectColor={selectPresetColor}
          />

          <PresetColors
            colors={PRESET_BLACK_COLORS}
            selectedColor={selectedColor}
            onSelectColor={selectPresetColor}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
