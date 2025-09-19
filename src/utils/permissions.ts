import { Alert, PermissionsAndroid, Platform } from 'react-native';

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
        Alert.alert(
          'Разрешение отклонено',
          'Для сохранения обоев необходимо разрешение на запись файлов',
        );
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Permission request error:', err);
      Alert.alert(
        'Ошибка разрешения',
        'Не удалось запросить разрешение на сохранение файлов',
      );
      return false;
    }
  }
  return true;
};
