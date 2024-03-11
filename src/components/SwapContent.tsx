import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";

const halfScreenHeight = Dimensions.get("window").height * 0.75;
interface SwapModalContentProps {
  setModalVisible: (modalVisible: boolean) => void;
  modalVisible: boolean;
}

const SwapContent = ({
  setModalVisible,
  modalVisible,
}: SwapModalContentProps) => {
  const [tokenFrom, setTokenFrom] = useState("");
  const [tokenTo, setTokenTo] = useState("");

  return (
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Swap Tokens</Text>

      {/* Token From Input */}
      <View
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: "grey",
            borderRadius: 15,
            marginRight: 10,
          }}
        />
        <TextInput
          autoFocus
          // keyboardType="numeric"
          style={styles.input}
          onChangeText={setTokenFrom}
          value={tokenFrom}
          placeholder="From Token (e.g., ETH)"
        />
      </View>

      <View
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: "grey",
            borderRadius: 15,
            marginRight: 10,
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={setTokenTo}
          value={tokenTo}
          placeholder="To Token (e.g., DAI)"
        />
      </View>

      {/* Get Quote Button */}
      <Pressable
        style={[styles.button, styles.buttonGetQuote]}
        onPress={() => console.log("Fetching quote...")}
      >
        <Text style={styles.textStyle}>Get Quote</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>Close</Text>
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
    width: "85%",
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
