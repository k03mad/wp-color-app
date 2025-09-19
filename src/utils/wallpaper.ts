import type React from 'react';
import { Alert } from 'react-native';
import RNFS from 'react-native-fs';
import type ViewShot from 'react-native-view-shot';

export const generateWallpaper = async (
  viewShotRef: React.RefObject<ViewShot>,
  requestStoragePermission: () => Promise<boolean>,
  _selectedColor: string,
) => {
  try {
    if (!viewShotRef.current?.capture) {
      throw new Error('ViewShot reference is not ready');
    }

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

    Alert.alert('Успешно!', `Обои сохранены в галерею!\nПуть: ${destPath}`, [
      { text: 'OK' },
    ]);
  } catch (error) {
    console.error('Ошибка при сохранении:', error);
    Alert.alert(
      'Ошибка',
      `Не удалось сохранить обои: ${
        error instanceof Error ? error.message : 'Неизвестная ошибка'
      }`,
      [{ text: 'OK' }],
    );
  }
};
