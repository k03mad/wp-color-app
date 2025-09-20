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
        title: 'Разрешение на сохранение файлов',
        message: 'Приложению нужно разрешение для сохранения обоев в галерею',
        buttonNeutral: 'Спросить позже',
        buttonNegative: 'Отмена',
        buttonPositive: 'OK',
      });

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Toast.show({
          type: 'info',
          text1:
            '🔒 Нужно разрешение. Разрешите доступ к галерее для сохранения обоев',
          visibilityTime: TOAST_VISIBILITY_TIME,
        });
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Permission request error:', err);
      Toast.show({
        type: 'error',
        text1: '😕 Что-то пошло не так. Не удалось запросить разрешение',
        visibilityTime: TOAST_VISIBILITY_TIME,
      });
      return false;
    }
  }
  return true;
};
