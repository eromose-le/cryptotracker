import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
  currentPrice: {
    fontSize: 30,
    fontWeight: '600',
    letterSpacing: 1
  },
  name: {
    fontSize: 15
  },
  priceContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceChange: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500'
  },
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,

    padding: 10,
    fontSize: 16
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10
  },
  candleStickText: {
    fontWeight: '700'
  },
  candleStickDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20
  },
  candleStickTextLabel: {
    fontSize: 13
  }
});

export default styles;
