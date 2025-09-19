import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Гармоничная цветовая палитра (от светлого к тёмному в каждой группе)
const PRESET_COLORS = [
  // Красные оттенки (светлый → яркий → насыщенный → тёмный)
  '#FFCDD2', // Светлый красный
  '#FF8A80', // Мягкий красный
  '#FF5252', // Яркий красный
  '#D32F2F', // Тёмный красный

  // Оранжевые оттенки
  '#FFE0B2', // Светлый оранжевый
  '#FFAB91', // Мягкий оранжевый
  '#FF7043', // Яркий оранжевый
  '#E64A19', // Тёмный оранжевый

  // Жёлтые оттенки
  '#FFF9C4', // Светлый жёлтый
  '#FFF176', // Мягкий жёлтый
  '#FFEB3B', // Яркий жёлтый
  '#F57F17', // Тёмный жёлтый

  // Зелёные оттенки
  '#C8E6C9', // Светлый зелёный
  '#81C784', // Мягкий зелёный
  '#4CAF50', // Яркий зелёный
  '#2E7D32', // Тёмный зелёный

  // Бирюзовые оттенки
  '#B2DFDB', // Светлый бирюзовый
  '#80CBC4', // Мягкий бирюзовый
  '#26A69A', // Яркий бирюзовый
  '#00695C', // Тёмный бирюзовый

  // Синие оттенки
  '#BBDEFB', // Светлый синий
  '#64B5F6', // Мягкий синий
  '#2196F3', // Яркий синий
  '#1565C0', // Тёмный синий

  // Индиго оттенки
  '#C5CAE9', // Светлый индиго
  '#7986CB', // Мягкий индиго
  '#3F51B5', // Яркий индиго
  '#283593', // Тёмный индиго

  // Фиолетовые оттенки
  '#E1BEE7', // Светлый фиолетовый
  '#BA68C8', // Мягкий фиолетовый
  '#9C27B0', // Яркий фиолетовый
  '#6A1B9A', // Тёмный фиолетовый

  // Розовые оттенки
  '#F8BBD9', // Светлый розовый
  '#F06292', // Мягкий розовый
  '#E91E63', // Яркий розовый
  '#AD1457', // Тёмный розовый

  // Коричневые оттенки
  '#D7CCC8', // Светлый коричневый
  '#A1887F', // Мягкий коричневый
  '#8D6E63', // Яркий коричневый
  '#5D4037', // Тёмный коричневый
];

// Чёрные цвета разной интенсивности
const PRESET_BLACK_COLORS = [
  '#000000', // Абсолютно чёрный
  '#0D0D0D', // Почти чёрный
  '#1A1A1A', // Очень тёмно-серый
  '#262626', // Тёмно-серый
  '#333333', // Серый тёмный
  '#404040', // Средне-тёмный серый
  '#4D4D4D', // Тёмный серый
  '#595959', // Серый
  '#666666', // Средний серый
  '#737373', // Светло-серый
  '#808080', // Серый 50%
  '#8C8C8C', // Светлый серый
  '#999999', // Очень светлый серый
  '#A6A6A6', // Почти светлый серый
  '#B3B3B3', // Светлый серый
  '#BFBFBF', // Очень светлый серый
];

// Тёмные цвета с цветными оттенками (отсортированы по спектру)
const PRESET_DARK_TINTED_COLORS = [
  // Красные оттенки
  '#2A2626', // Тёмный с красным оттенком
  '#2B2626', // Тёмный с насыщенным красным
  '#292726', // Тёмный с оранжевым оттенком
  '#2A2826', // Тёмный с тёплым оранжевым

  // Жёлтые оттенки
  '#2A2A26', // Тёмный с жёлтым оттенком
  '#2B2B26', // Тёмный с насыщенным жёлтым
  '#292926', // Тёмный с оливковым оттенком
  '#282A26', // Тёмный с лаймовым оттенком

  // Зелёные оттенки
  '#262A26', // Тёмный с зелёным оттенком
  '#262B26', // Тёмный с насыщенным зелёным
  '#272929', // Тёмный с бирюзовым оттенком
  '#262A2A', // Тёмный с циановым оттенком

  // Синие оттенки
  '#26262A', // Тёмный с синим оттенком
  '#26262B', // Тёмный с насыщенным синим
  '#262729', // Тёмный с индиго оттенком
  '#2A262A', // Тёмный с пурпурным оттенком
];

interface AppProps {}

const App: React.FC<AppProps> = () => {
  // Принудительно используем тёмную тему
  const isDarkMode = true;
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  const theme = {
    background: '#1C1C1E', // Более мягкий тёмный фон
    surface: '#2C2C2E',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#3A3A3C',
    cardBackground: '#3A3A3C',
  };

  // Функция для конвертации HEX в RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Функция для конвертации RGB в CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    const rPercent = r / 255;
    const gPercent = g / 255;
    const bPercent = b / 255;

    const k = 1 - Math.max(rPercent, gPercent, bPercent);
    const c = k === 1 ? 0 : (1 - rPercent - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - gPercent - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - bPercent - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  // Функция для конвертации RGB в HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const getColorInfo = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return { rgb, cmyk, hsl };
  };

  const colorInfo = getColorInfo(selectedColor);

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        // Для Android 13+ (API 33+) используем READ_MEDIA_IMAGES
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
        // Проверяем разрешения перед сохранением
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
          return;
        }

        const uri = await viewShotRef.current.capture();

        // Создаем имя файла с текущей датой
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `wallpaper_${timestamp}.png`;

        // Используем DCIM/Pictures для лучшей совместимости
        const destPath = `${RNFS.ExternalStorageDirectoryPath}/DCIM/Pictures/${fileName}`;

        // Создаем директорию если её нет
        const dirPath = `${RNFS.ExternalStorageDirectoryPath}/DCIM/Pictures`;
        const dirExists = await RNFS.exists(dirPath);
        if (!dirExists) {
          await RNFS.mkdir(dirPath);
        }

        // Копируем файл
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
        {/* Превью обоев */}
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

        {/* Панель управления */}
        <ScrollView style={styles.controlPanel} showsVerticalScrollIndicator={false}>
          {/* Текущий цвет */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Выбранный цвет
            </Text>
            <View style={styles.colorInfoContainer}>
              <Text style={[styles.colorInfoText, { color: theme.text }]}>
                HEX: {selectedColor.toUpperCase()}
              </Text>
              {colorInfo && (
                <>
                  <Text style={[styles.colorInfoText, { color: theme.text }]}>
                    RGB: {colorInfo.rgb.r}, {colorInfo.rgb.g}, {colorInfo.rgb.b}
                  </Text>
                  <Text style={[styles.colorInfoText, { color: theme.text }]}>
                    HSL: {colorInfo.hsl.h}°, {colorInfo.hsl.s}%, {colorInfo.hsl.l}%
                  </Text>
                  <Text style={[styles.colorInfoText, { color: theme.text }]}>
                    CMYK: {colorInfo.cmyk.c}%, {colorInfo.cmyk.m}%, {colorInfo.cmyk.y}%, {colorInfo.cmyk.k}%
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* Color Picker */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[
                styles.colorPickerButton,
                { backgroundColor: theme.cardBackground, borderColor: theme.border }
              ]}
              onPress={() => setShowColorPicker(!showColorPicker)}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>
                {showColorPicker ? 'Скрыть палитру' : 'Открыть палитру цветов'}
              </Text>
            </TouchableOpacity>

            {showColorPicker && (
              <View style={[styles.colorPickerContainer, { backgroundColor: theme.cardBackground }]} />
            )}
          </View>

          {/* Кнопка генерации */}
          <TouchableOpacity
            style={[styles.generateButton, { backgroundColor: selectedColor }]}
            onPress={generateWallpaper}
          >
            <Text style={styles.generateButtonText}>
              Сохранить обои
            </Text>
          </TouchableOpacity>

          {/* Разделитель */}
          <View style={[styles.separator, { backgroundColor: theme.border }]} />

          {/* Заголовок пресетов */}
          <Text style={[styles.presetsTitle, { color: theme.text }]}>
            Готовые цвета
          </Text>

          {/* Цветовая палитра */}
          <View style={styles.presetSection}>
            <Text style={[styles.presetSectionTitle, { color: theme.text }]}>
              Цветовая палитра
            </Text>
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

          {/* Чёрные цвета */}
          <View style={styles.presetSection}>
            <Text style={[styles.presetSectionTitle, { color: theme.text }]}>
              Чёрные и серые
            </Text>
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

          {/* Тёмные цвета с оттенками */}
          <View style={styles.presetSection}>
            <Text style={[styles.presetSectionTitle, { color: theme.text }]}>
              Тёмные с оттенками
            </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewContainer: {
    height: 200,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  wallpaperPreview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  previewLabel: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 12,
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  controlPanel: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  colorInfoContainer: {
    paddingVertical: 8,
  },
  colorInfoText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  presetColorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  presetColorBox: {
    width: (screenWidth - 32 - 44) / 4, // 4 колонки с отступами
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 8,
  },
  selectedPresetColor: {
    borderWidth: 3,
    borderColor: '#000',
  },
  colorPickerButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  colorPickerContainer: {
    marginTop: 16,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  colorPicker: {
    flex: 1,
  },
  generateButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    marginVertical: 24,
    marginHorizontal: 16,
  },
  presetsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  presetSection: {
    marginBottom: 20,
  },
  presetSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  colorPickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  hexInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  hexPrefix: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 4,
  },
  hexInput: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 120,
  },
  hexInputText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  colorPickerHint: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default App;
