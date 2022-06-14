import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  },
  ticker: {
    fontWeight: '700'
  },
  coinContainer: {
    flexDirection: 'row',
    padding: 15
  },
  quantityContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end'
  }
});

export default styles;
