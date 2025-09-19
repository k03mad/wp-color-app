import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import ColorPickerButton from './ui/ColorPickerButton';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { styles } from '../styles/styles';
import {
  PRESET_COLORS,
  PRESET_BLACK_COLORS,
  PRESET_DARK_TINTED_COLORS
} from '../constants/colors';
import { getColorInfo } from '../utils/color';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const isDarkMode = true;
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  const theme = {
    background: '#1C1C1E',
    surface: '#2C2C2E',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#3A3A3C',
    cardBackground: '#3A3A3C',
  };

  const colorInfo = getColorInfo(selectedColor);

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const androidVersion = Platform.Version;
        let permission;

        if (androidVersion >= 33) {
          permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
        } else {
          permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        }

        const granted = await PermissionsAndroid.request(permission, {
          title: 'Разрешение на сохранение файлов',
          message: 'Приложению нужно разрешение для сохранения обоев в галерею',
          buttonNeutral: 'Спросить позже',
          buttonNegative: 'Отмена',
          buttonPositive: 'OK',
        });

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Разрешение отклонено',
            'Для сохранения обоев необходимо разрешение на запись файлов'
          );
          return false;
        }
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const generateWallpaper = async () => {
    try {
      if (viewShotRef.current && viewShotRef.current.capture) {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
          return;
        }

        const uri = await viewShotRef.current.capture();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `wallpaper_${timestamp}.png`;
        const destPath = `${RNFS.ExternalStorageDirectoryPath}/Pictures/${fileName}`;
        const dirPath = `${RNFS.ExternalStorageDirectoryPath}/Pictures`;
        const dirExists = await RNFS.exists(dirPath);
        if (!dirExists) {
          await RNFS.mkdir(dirPath);
        }

        await RNFS.copyFile(uri, destPath);

        Alert.alert(
          'Успешно!',
          `Обои сохранены в галерею!\nПуть: ${destPath}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      Alert.alert(
        'Ошибка',
        `Не удалось сохранить обои: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
        [{ text: 'OK' }]
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
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.previewContainer}>
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
            <View
              style={[
                styles.wallpaperPreview,
                { backgroundColor: selectedColor }
              ]}
            />
          </ViewShot>
        </View>

        <ScrollView style={styles.controlPanel} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Выбранный цвет
            </Text>
            <View style={styles.colorInfoContainer}>
              <TouchableOpacity onPress={() => copyToClipboard(selectedColor.toUpperCase())}>
                <Text style={[styles.colorInfoText, { color: theme.text }]}>
                  HEX: {selectedColor.toUpperCase()}
                </Text>
              </TouchableOpacity>
              {colorInfo && (
                <>
                  <TouchableOpacity onPress={() => copyToClipboard(`${colorInfo.rgb.r}, ${colorInfo.rgb.g}, ${colorInfo.rgb.b}`)}>
                    <Text style={[styles.colorInfoText, { color: theme.text }]}>
                      RGB: {colorInfo.rgb.r}, {colorInfo.rgb.g}, {colorInfo.rgb.b}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => copyToClipboard(`${colorInfo.hsl.h}°, ${colorInfo.hsl.s}%, ${colorInfo.hsl.l}%`)}>
                    <Text style={[styles.colorInfoText, { color: theme.text }]}>
                      HSL: {colorInfo.hsl.h}°, {colorInfo.hsl.s}%, {colorInfo.hsl.l}%
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => copyToClipboard(`${colorInfo.cmyk.c}%, ${colorInfo.cmyk.m}%, ${colorInfo.cmyk.y}%, ${colorInfo.cmyk.k}%`)}>
                    <Text style={[styles.colorInfoText, { color: theme.text }]}>
                      CMYK: {colorInfo.cmyk.c}%, {colorInfo.cmyk.m}%, {colorInfo.cmyk.y}%, {colorInfo.cmyk.k}%
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <ColorPickerButton
              showColorPicker={showColorPicker}
              onPress={() => setShowColorPicker(!showColorPicker)}
              theme={theme}
            />

            {showColorPicker && (
              <View style={[styles.colorPickerContainer, { backgroundColor: theme.cardBackground }]} />
            )}
          </View>

          <TouchableOpacity
            style={[styles.generateButton, { backgroundColor: selectedColor }]}
            onPress={generateWallpaper}
          >
            <Text style={styles.generateButtonText}>
              Сохранить цвет как обои
            </Text>
          </TouchableOpacity>

          <View style={[styles.separator, { backgroundColor: theme.border }]} />

          <View style={styles.presetSection}>
            <View style={styles.presetColorsGrid}>
              {PRESET_COLORS.map((color, index) => (
                <TouchableOpacity
                  key={`color-${index}`}
                  style={[
                    styles.presetColorBox,
                    { backgroundColor: color, borderColor: theme.border },
                    selectedColor === color && styles.selectedPresetColor
                  ]}
                  onPress={() => selectPresetColor(color)}
                />
              ))}
            </View>
          </View>

          <View style={styles.presetSection}>
            <View style={styles.presetColorsGrid}>
              {PRESET_BLACK_COLORS.map((color, index) => (
                <TouchableOpacity
                  key={`black-${index}`}
                  style={[
                    styles.presetColorBox,
                    { backgroundColor: color, borderColor: theme.border },
                    selectedColor === color && styles.selectedPresetColor
                  ]}
                  onPress={() => selectPresetColor(color)}
                />
              ))}
            </View>
          </View>

          <View style={styles.presetSection}>
            <View style={styles.presetColorsGrid}>
              {PRESET_DARK_TINTED_COLORS.map((color, index) => (
                <TouchableOpacity
                  key={`dark-tinted-${index}`}
                  style={[
                    styles.presetColorBox,
                    { backgroundColor: color, borderColor: theme.border },
                    selectedColor === color && styles.selectedPresetColor
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
