import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";

const halfScreenHeight = Dimensions.get("window").height / 2;

const SwapContent = () => {
  const [tokenFrom, setTokenFrom] = useState("");
  const [tokenTo, setTokenTo] = useState("");

  return (
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Swap Tokens</Text>

      {/* Token From Input */}
      <TextInput
        style={styles.input}
        onChangeText={setTokenFrom}
        value={tokenFrom}
        placeholder="From Token (e.g., ETH)"
      />

      {/* Token To Input */}
      <TextInput
        style={styles.input}
        onChangeText={setTokenTo}
        value={tokenTo}
        placeholder="To Token (e.g., DAI)"
      />

      {/* Get Quote Button */}
      <Pressable
        style={[styles.button, styles.buttonGetQuote]}
        onPress={() => console.log("Fetching quote...")}
      >
        <Text style={styles.textStyle}>Get Quote</Text>
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
    backgroundColor: "#F44336",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SwapContent;
