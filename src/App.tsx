import Clipboard from '@react-native-clipboard/clipboard';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import type ViewShot from 'react-native-view-shot';
import ColorDetails from './components/ColorDetails';
import ColorPicker from './components/ColorPicker';
import ColorPreview from './components/ColorPreview';
import GenerateButton from './components/GenerateButton';
import PresetColors from './components/PresetColors';
import ToastConfig from './components/ToastConfig';
import { PRESET_BLACK_COLORS, PRESET_COLORS } from './constants/colors';
import { theme } from './constants/theme';
import { styles } from './styles/styles';
import { getColorInfo } from './utils/color';
import { requestStoragePermission } from './utils/permissions';
import { generateWallpaper } from './utils/wallpaper';

const App: React.FC = () => {
  const isDarkMode = true;
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [isFromPreset, setIsFromPreset] = useState(false);
  const [colorPickerSelectedColor, setColorPickerSelectedColor] = useState(
    PRESET_COLORS[0],
  );
  const viewShotRef = useRef<ViewShot>(null);

  const colorInfo = getColorInfo(selectedColor);

  const copyToClipboard = useCallback((text: string) => {
    Clipboard.setString(text);
  }, []);

  const handleCopyResolution = useCallback(() => {
    const screenData = Dimensions.get('screen');
    const pixelRatio = screenData.scale;
    const width = screenData.width * pixelRatio;
    const height = screenData.height * pixelRatio;
    copyToClipboard(`${Math.round(width)} × ${Math.round(height)}`);
  }, [copyToClipboard]);

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const handleGenerateWallpaper = useCallback(async () => {
    if (viewShotRef.current) {
      await generateWallpaper(
        viewShotRef as React.RefObject<ViewShot>,
        requestStoragePermission,
      );
    }
  }, []);

  const selectPresetColor = useCallback((color: string) => {
    setIsFromPreset(true);
    setSelectedColor(color);
  }, []);

  const handleColorPickerChange = useCallback((color: string) => {
    setColorPickerSelectedColor(color);
  }, []);

  const handleManualColorChange = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const handleApplyColorPickerColor = useCallback(() => {
    setSelectedColor(colorPickerSelectedColor);
    setIsFromPreset(true);
  }, [colorPickerSelectedColor]);

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
          viewShotRef={viewShotRef}
          onCopyResolution={handleCopyResolution}
        />

        <ScrollView
          style={styles.controlPanel}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ColorDetails
            colorInfo={colorInfo}
            selectedColor={selectedColor}
            onColorChange={handleManualColorChange}
            isFromPreset={isFromPreset}
          />

          <View style={styles.section}>
            <ColorPicker
              selectedColor={colorPickerSelectedColor}
              onColorChange={handleColorPickerChange}
              theme={theme}
              onApplyColorPickerColor={handleApplyColorPickerColor}
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

        <View style={styles.stickyButtonContainer}>
          <GenerateButton
            selectedColor={selectedColor}
            onPress={handleGenerateWallpaper}
          />
        </View>
      </SafeAreaView>
      <ToastConfig />
    </SafeAreaProvider>
  );
};

export default App;
