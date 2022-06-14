import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  deleteContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center'
  },
  deleteItem: {
    width: '100%',
    paddingVertical: 5,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 15,
    alignSelf: 'center'
  },
  buttonContainer: {},
  button: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginVertical: 5,
    color: 'grey',
    fontSize: 12,
    alignSelf: 'center'
  }
});

export default styles;
