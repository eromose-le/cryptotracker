import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3
  },
  text: {
    marginRight: 5
  },
  coinContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 15,
    alignItems: 'center'
  },
  rank: {
    fontWeight: 'bold'
  },
  rankContainer: {
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 5
  }
});

export default styles;
