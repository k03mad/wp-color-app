import type React from 'react';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import type ViewShot from 'react-native-view-shot';

export const generateWallpaper = async (
  viewShotRef: React.RefObject<ViewShot>,
  requestStoragePermission: () => Promise<boolean>,
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
    const timestamp = Date.now();
    const fileName = `wallpaper_${timestamp}.png`;
    const destPath = `${RNFS.ExternalStorageDirectoryPath}/Pictures/${fileName}`;
    const dirPath = `${RNFS.ExternalStorageDirectoryPath}/Pictures`;
    const dirExists = await RNFS.exists(dirPath);
    if (!dirExists) {
      await RNFS.mkdir(dirPath);
    }

    await RNFS.copyFile(uri, destPath);

    Toast.show({
      type: 'success',
      text1: '🎉 Готово!',
      text2: `Обои сохранены в галерею:\n📁 Pictures/WPColorApp/\n📄 ${fileName}`,
      visibilityTime: 5000,
    });
  } catch (error) {
    console.error('Ошибка при сохранении:', error);
    Toast.show({
      type: 'error',
      text1: '😔 Упс!',
      text2: 'Не удалось сохранить обои. Попробуйте еще раз.',
      visibilityTime: 4000,
    });
  }
};
