import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  upButtonStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 70
  },
  upButtonImageStyle: {
    resizeMode: 'contain',
    width: 30,
    height: 30
  },
  downButtonStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    top: 70
  },
  downButtonImageStyle: {
    resizeMode: 'contain',
    width: 30,
    height: 30
  }
});

export default styles;
