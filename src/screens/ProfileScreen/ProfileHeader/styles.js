import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profileContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 100
  },
  profileTitle: {
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default styles;
