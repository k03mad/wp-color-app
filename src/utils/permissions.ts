import { PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { TOAST_VISIBILITY_TIME } from '../constants/theme';

export const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const androidVersion = Platform.Version;
      let permission:
        | typeof PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        | typeof PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

      if (androidVersion >= 33) {
        permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
      } else {
        permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      }

      const granted = await PermissionsAndroid.request(permission, {
        title: 'File Storage Permission',
        message: 'App needs permission to save wallpapers to gallery',
        buttonNeutral: 'Ask Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Toast.show({
          type: 'info',
          text1:
            '🔒 Permission needed. Please allow gallery access to save wallpapers',
          visibilityTime: TOAST_VISIBILITY_TIME,
        });
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Permission request error:', err);
      Toast.show({
        type: 'error',
        text1: '😕 Something went wrong. Failed to request permission',
        visibilityTime: TOAST_VISIBILITY_TIME,
      });
      return false;
    }
  }
  return true;
};
