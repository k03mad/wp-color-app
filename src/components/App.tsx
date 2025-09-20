import Clipboard from '@react-native-clipboard/clipboard';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import { PRESET_BLACK_COLORS, PRESET_COLORS } from '../constants/colors';
import { theme } from '../constants/theme';
import { styles } from '../styles/styles';
import { getColorInfo, getContrastColor } from '../utils/color';
import { requestStoragePermission } from '../utils/permissions';
import { generateWallpaper } from '../utils/wallpaper';
import ColorPicker from './ui/ColorPicker';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const App: React.FC = () => {
  const isDarkMode = true;
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  const colorInfo = getColorInfo(selectedColor);

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
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

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <TouchableOpacity
          style={styles.previewContainer}
          onPress={() => copyToClipboard(selectedColor.toUpperCase())}
          activeOpacity={0.8}
        >
          <ViewShot
            ref={viewShotRef}
            options={{
              format: 'png',
              quality: 1.0,
              width: screenWidth,
              height: screenHeight,
            }}
            style={styles.wallpaperPreview}
          >
            <View style={styles.wallpaperPreview}>
              <View
                style={[
                  styles.wallpaperPreview,
                  { backgroundColor: selectedColor },
                ]}
              />

              <View
                style={[
                  styles.gradientOverlay,
                  {
                    backgroundColor: `${selectedColor}20`,
                  },
                ]}
              />

              <View style={styles.previewTextOverlay}>
                <Text
                  style={[
                    styles.previewText,
                    { color: getContrastColor(selectedColor) },
                  ]}
                >
                  {selectedColor.toUpperCase()}
                </Text>
              </View>
            </View>
          </ViewShot>
        </TouchableOpacity>

        <ScrollView
          style={styles.controlPanel}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <View style={styles.colorInfoContainer}>
              {colorInfo && (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      copyToClipboard(
                        `${colorInfo.rgb.r}, ${colorInfo.rgb.g}, ${colorInfo.rgb.b}`,
                      )
                    }
                  >
                    <Text style={[styles.colorInfoText, { color: theme.text }]}>
                      RGB: {colorInfo.rgb.r}, {colorInfo.rgb.g},{' '}
                      {colorInfo.rgb.b}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      copyToClipboard(
                        `${colorInfo.hsl.h}°, ${colorInfo.hsl.s}%, ${colorInfo.hsl.l}%`,
                      )
                    }
                  >
                    <Text style={[styles.colorInfoText, { color: theme.text }]}>
                      HSL: {colorInfo.hsl.h}°, {colorInfo.hsl.s}%,{' '}
                      {colorInfo.hsl.l}%
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      copyToClipboard(
                        `${colorInfo.cmyk.c}%, ${colorInfo.cmyk.m}%, ${colorInfo.cmyk.y}%, ${colorInfo.cmyk.k}%`,
                      )
                    }
                  >
                    <Text style={[styles.colorInfoText, { color: theme.text }]}>
                      CMYK: {colorInfo.cmyk.c}%, {colorInfo.cmyk.m}%,{' '}
                      {colorInfo.cmyk.y}%, {colorInfo.cmyk.k}%
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              showColorPicker={showColorPicker}
              onTogglePicker={() => setShowColorPicker(!showColorPicker)}
              theme={theme}
            />

            <TouchableOpacity
              style={[
                styles.generateButton,
                { backgroundColor: selectedColor },
              ]}
              onPress={handleGenerateWallpaper}
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
          </View>

          <View style={styles.presetSection}>
            <View style={styles.presetColorsGrid}>
              {PRESET_COLORS.map((color, _index) => (
                <TouchableOpacity
                  key={`color-${color}`}
                  style={[
                    styles.presetColorBox,
                    {
                      backgroundColor: color,
                      borderColor: theme.border,
                    },
                    selectedColor === color && styles.selectedPresetColor,
                  ]}
                  onPress={() => selectPresetColor(color)}
                />
              ))}
            </View>
          </View>

          <View style={styles.presetSection}>
            <View style={styles.presetColorsGrid}>
              {PRESET_BLACK_COLORS.map((color, _index) => (
                <TouchableOpacity
                  key={`black-${color}`}
                  style={[
                    styles.presetColorBox,
                    {
                      backgroundColor: color,
                      borderColor: theme.border,
                    },
                    selectedColor === color && styles.selectedPresetColor,
                  ]}
                  onPress={() => selectPresetColor(color)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
