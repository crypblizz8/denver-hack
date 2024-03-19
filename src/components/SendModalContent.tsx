import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { storage } from "../utils/storage";
import { sendTransaction } from "../hooks/sendTransactions";

const halfScreenHeight = Dimensions.get("window").height * 0.7;

interface SendModalContentProps {
  setModalVisible: (modalVisible: boolean) => void;
  modalVisible: boolean;
}
const SendModalContent = ({
  setModalVisible,
  modalVisible,
}: SendModalContentProps) => {
  const [recipientAddress, setRecipientAddress] = useState("");

  const account = storage ? storage.getString("dev.account") : null;
  console.log("account", account);

  return (
    <KeyboardAvoidingView style={styles.modalView}>
      <Text style={styles.modalTitle}>Send</Text>

      <View
        style={{
          marginVertical: 10,
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ textAlign: "center", marginVertical: 10 }}>
          Send ETH to an address
        </Text>
        <TextInput
          autoFocus
          style={styles.input}
          value={recipientAddress}
          onChangeText={(text) => setRecipientAddress(text)}
          placeholder="0x1234..."
          autoCapitalize="none"
        />
      </View>

      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() =>
          sendTransaction(account, "0x618C35bBD039945364E5BfA0BAC78082a2F7568d")
        }
      >
        <Text style={styles.textStyle}>Send</Text>
      </Pressable>

      {/* <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>Close</Text>
      </Pressable> */}
    </KeyboardAvoidingView>
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
    padding: 24,
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
    marginBottom: 10,
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

export default SendModalContent;
