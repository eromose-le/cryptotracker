import React, { useState } from 'react';
import { Alert, Modal, Text, Pressable, View } from 'react-native';
import styles from './styles';
import { useSelector } from 'react-redux';

const ModalComponent = ({ invokeClearWatchlist, children, ...rest }) => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  const [modalVisible, setModalVisible] = useState(false);

  const onClose = () => {
    setModalVisible(!modalVisible);
    invokeClearWatchlist();
  };

  const onAbort = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ ...styles.centeredView, ...rest }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('closed!');
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              ...styles.modalView,
              backgroundColor: reduxTheme.body,
              shadowColor: reduxTheme.secondary,
              borderColor: reduxTheme.tabBackground
            }}
          >
            <Text style={{ ...styles.modalText, color: reduxTheme.primary }}>
              Are you sure?
            </Text>

            {/* button wrapper */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              {/* clear */}
              <Pressable
                style={[
                  styles.button,
                  {
                    ...styles.buttonClose,
                    backgroundColor: '#ea3943',
                    marginRight: 10
                  }
                ]}
                onPress={() => onClose()}
              >
                <Text
                  style={{ ...styles.textStyle, color: reduxTheme.primary }}
                >
                  Clear
                </Text>
              </Pressable>
              {/* abort */}
              <Pressable
                style={[
                  styles.button,
                  {
                    ...styles.buttonClose,
                    backgroundColor: '#16c784'
                  }
                ]}
                onPress={() => onAbort()}
              >
                <Text
                  style={{ ...styles.textStyle, color: reduxTheme.primary }}
                >
                  Abort
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.deleteContainer}
        onPress={() => setModalVisible(true)}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default ModalComponent;
