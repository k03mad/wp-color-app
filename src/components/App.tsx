import Clipboard from '@react-native-clipboard/clipboard';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import type ViewShot from 'react-native-view-shot';
import { PRESET_BLACK_COLORS, PRESET_COLORS } from '../constants/colors';
import {
  BRIGHT_GRADIENT_PRESETS,
  DARK_GRADIENT_PRESETS,
  type GradientPreset,
} from '../constants/gradients';
import { theme } from '../constants/theme';
import { styles } from '../styles/styles';
import { getColorInfo } from '../utils/color';
import { requestStoragePermission } from '../utils/permissions';
import { generateWallpaper } from '../utils/wallpaper';
import ColorDetails from './ui/ColorDetails';
import ColorPicker from './ui/ColorPicker';
import ColorPreview from './ui/ColorPreview';
import GenerateButton from './ui/GenerateButton';
import GradientPresets from './ui/GradientPresets';
import GradientPreview from './ui/GradientPreview';
import PresetColors from './ui/PresetColors';
import ToastConfig from './ui/ToastConfig';

const App: React.FC = () => {
  const isDarkMode = true;
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [selectedGradient, setSelectedGradient] =
    useState<GradientPreset | null>(null);
  const [isGradientMode, setIsGradientMode] = useState(false);
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

  const handleCopyResolution = () => {
    const screenData = Dimensions.get('screen');
    const pixelRatio = screenData.scale;
    const width = screenData.width * pixelRatio;
    const height = screenData.height * pixelRatio;
    copyToClipboard(`${Math.round(width)} × ${Math.round(height)}`);
  };

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const handleGenerateWallpaper = async () => {
    if (viewShotRef.current) {
      await generateWallpaper(
        viewShotRef as React.RefObject<ViewShot>,
        requestStoragePermission,
      );
    }
  };

  const selectPresetColor = (color: string) => {
    setSelectedColor(color);
    setSelectedGradient(null);
    setIsGradientMode(false);
  };

  const selectGradient = (gradient: GradientPreset) => {
    setSelectedGradient(gradient);
    // Не меняем selectedColor при выборе градиента
    setIsGradientMode(true);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedGradient(null);
    setIsGradientMode(false);
  };

  const handleCopyHex = () => {
    if (isGradientMode && selectedGradient) {
      copyToClipboard(selectedGradient.name);
    } else {
      copyToClipboard(selectedColor.toUpperCase());
    }
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
        {isGradientMode && selectedGradient ? (
          <GradientPreview
            gradient={selectedGradient}
            onPress={handleCopyHex}
            viewShotRef={viewShotRef}
          />
        ) : (
          <ColorPreview
            selectedColor={selectedColor}
            onPress={handleCopyHex}
            viewShotRef={viewShotRef}
          />
        )}

        <ScrollView
          style={styles.controlPanel}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ColorDetails
            colorInfo={colorInfo}
            onCopyRgb={handleCopyRgb}
            onCopyHsl={handleCopyHsl}
            onCopyCmyk={handleCopyCmyk}
            onCopyResolution={handleCopyResolution}
            isGradientMode={isGradientMode}
          />

          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            theme={theme}
          />

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

          <GradientPresets
            gradients={BRIGHT_GRADIENT_PRESETS}
            selectedGradient={selectedGradient}
            onSelectGradient={selectGradient}
          />

          <GradientPresets
            gradients={DARK_GRADIENT_PRESETS}
            selectedGradient={selectedGradient}
            onSelectGradient={selectGradient}
          />
        </ScrollView>

        <View style={styles.stickyButtonContainer}>
          <GenerateButton
            selectedColor={selectedColor}
            onPress={handleGenerateWallpaper}
            selectedGradient={selectedGradient}
            isGradientMode={isGradientMode}
          />
        </View>
      </SafeAreaView>
      <ToastConfig />
    </SafeAreaProvider>
  );
};

export default App;
