import React from "react";
import { Modal, View, Dimensions, StyleSheet } from "react-native";
import SwapContent from "../components/SwapContent";
import QRModalContent from "../components/QRModalContent";
import SignModalContent from "../components/SignModalContent";
const halfScreenHeight = Dimensions.get("window").height / 2;

interface TemplateModalProps {
  setModalVisible: (modalVisible: boolean) => void;
  modalVisible: boolean;
  currentModalState?: string;
  setCurrentModalState?: (currentModalState: string) => void;
}

const GenericModal = ({
  setModalVisible,
  modalVisible,
  currentModalState,
  setCurrentModalState,
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
      <View style={styles.centeredView}>
        <View>
          {!currentModalState && <View />}
          {currentModalState === "SWAP" && (
            <SwapContent
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
            />
          )}
          {currentModalState === "RECEIVE" && (
            <QRModalContent
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
            />
          )}
          {currentModalState === "SIGN" && (
            <SignModalContent
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    height: halfScreenHeight,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "gray",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: "100%",
  },
  buttonGetQuote: {
    backgroundColor: "#4CAF50",
  },
  buttonClose: {
    backgroundColor: "#F44336",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GenericModal;
