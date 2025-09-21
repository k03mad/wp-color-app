import type React from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { styles } from '../styles/styles';

const ToastConfig: React.FC = () => {
  return (
    <Toast
      config={{
        success: (props) => (
          <View style={[styles.toastContainer, styles.toastSuccessBorder]}>
            <Text style={styles.toastText}>{props.text1}</Text>
          </View>
        ),
        error: (props) => (
          <View style={[styles.toastContainer, styles.toastErrorBorder]}>
            <Text style={styles.toastText}>{props.text1}</Text>
          </View>
        ),
        info: (props) => (
          <View style={[styles.toastContainer, styles.toastInfoBorder]}>
            <Text style={styles.toastText}>{props.text1}</Text>
          </View>
        ),
      }}
    />
  );
};

export default ToastConfig;
