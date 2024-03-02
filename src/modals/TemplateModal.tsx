import React from "react";
import {
  Modal,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
} from "react-native";

const halfScreenHeight = Dimensions.get("window").height / 2;

interface TemplateModalProps {
  setModalVisible: (modalVisible: boolean) => void;
  modalVisible: boolean;
  modalType: "sign" | "send" | "receive" | "swap";
}

const TemplateModal = ({
  setModalVisible,
  modalVisible,
}: TemplateModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Hello World!</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textStyle}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    position: "absolute", // Position modal absolutely within its parent
    bottom: 0, // Align to the bottom of the screen
    width: "100%", // Ensure it covers the full width
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: halfScreenHeight, // Set the height to cover half the screen
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#3773F5",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TemplateModal;
