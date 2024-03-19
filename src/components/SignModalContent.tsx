import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";

const halfScreenHeight = Dimensions.get("window").height * 0.65;

interface SignModalContentProps {
  setModalVisible: (modalVisible: boolean) => void;
  modalVisible: boolean;
  // walletClient: any;
}

const SignModalContent = ({
  setModalVisible,
  modalVisible,
}: SignModalContentProps) => {
  const [inputText, setInputText] = useState(""); // Initialize the state with an empty string

  // const signMessage = async () => {
  //   const signature_1 = await walletClient.signMessage({
  //     account,
  //     message: "hell2o world2",
  //   });
  //   console.log("signature_1", signature_1);
  //   return;
  // };

  return (
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Sign Message</Text>

      <Text> Write a message to sign </Text>
      <TextInput
        autoFocus
        style={styles.input}
        value={inputText} // Bind the inputText state to the TextInput value
        onChangeText={setInputText} // Update the inputText state on every change
        placeholder="Hello World!"
      />

      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>Sign </Text>
      </Pressable>
    </View>
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
    backgroundColor: "#3773F5",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SignModalContent;
