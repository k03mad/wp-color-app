import type React from 'react';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import type ViewShot from 'react-native-view-shot';
import { TOAST_VISIBILITY_TIME } from '../constants/theme';

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
    const dirPath = `${RNFS.PicturesDirectoryPath}/wp-color-app`;
    const destPath = `${dirPath}/${fileName}`;
    const dirExists = await RNFS.exists(dirPath);
    if (!dirExists) {
      await RNFS.mkdir(dirPath);
    }

    await RNFS.copyFile(uri, destPath);

    Toast.show({
      type: 'success',
      text1: `Wallpaper saved to gallery:\n📁 Pictures/wp-color-app/\n📄 ${fileName}`,
      visibilityTime: TOAST_VISIBILITY_TIME,
    });
  } catch (error) {
    console.error('Error saving wallpaper:', error);
    Toast.show({
      type: 'error',
      text1: '😔 Oops! Failed to save wallpaper. Please try again.',
      visibilityTime: TOAST_VISIBILITY_TIME,
    });
  }
};
