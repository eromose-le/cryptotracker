import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -22
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 5
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontWeight: '500'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
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
