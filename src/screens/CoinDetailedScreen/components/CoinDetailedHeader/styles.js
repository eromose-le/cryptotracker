import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tickerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tickerTitle: {
    fontWeight: 'bold',
    marginHorizontal: 5,
    fontSize: 17
  },
  rankContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5
  }
});

export default styles;
