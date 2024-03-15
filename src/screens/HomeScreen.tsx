import { View, Pressable, Text, StyleSheet } from "react-native";
import GenericModal from "../modals/GenericModal";
import { MMKV } from "react-native-mmkv";
import { useState, useEffect } from "react";
import { createWalletClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { goerli } from "viem/chains";

export const storage = new MMKV();

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentModalState, setCurrentModalState] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState();
  const [txData, setTxData] = useState();
  const [account, setAccount] = useState(null); // New state to hold account information

  useEffect(() => {
    let privateKey = storage.getString("dev.pkey");
    if (!privateKey) {
      privateKey = generatePrivateKey();
      storage.set("dev.pkey", privateKey);
      console.log("New privateKey generated and cached:", privateKey);
    } else {
      console.log("Using cached privateKey:", privateKey);
    }

    // Convert privateKey to account and set up wallet client here
    const account = privateKeyToAccount(privateKey);
    console.log("Account address:", account.address);
    storage.set("dev.address", account.address);
    setAccount(account);
  }, []);

  const walletClient =
    account &&
    createWalletClient({
      account,
      chain: goerli, // Assuming 'goerli' is defined somewhere
      transport: http(), // Assuming this is defined somewhere
    });

  const currentAddress = storage.getString("dev.address");

  const openModalWithState = (state: string) => {
    setCurrentModalState(state);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>WalletKit</Text>
      <Text style={{ marginBottom: 10 }}>{currentAddress}</Text>
      {/* <Text style={{ marginBottom: 20 }}>Balance: {balance} ETH</Text> */}
      <View style={styles.actionsRow}>
        <View style={styles.flexCenter}>
          <Pressable
            style={styles.roundedBlueButton}
            onPress={() => openModalWithState("SWAP")}
          >
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>
          <Text style={{ color: "black", marginTop: 4 }}>Swap</Text>
        </View>

        <View style={styles.flexCenter}>
          <Pressable
            style={styles.roundedBlueButton}
            onPress={() => openModalWithState("RECEIVE")}
          >
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>
          <Text style={{ color: "black", marginTop: 4 }}>Receive</Text>
        </View>

        <View style={styles.flexCenter}>
          <Pressable
            style={styles.roundedBlueButton}
            // onPress={() => fetchWalletBalanceData()}
          >
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>
          <Text style={{ color: "black", marginTop: 4 }}>Send</Text>
        </View>
      </View>
      <View style={styles.actionsRow}>
        <View style={styles.flexCenter}>
          <Pressable
            style={styles.roundedBlueButton}
            onPress={() => openModalWithState("SIGN")}
          >
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>
          <Text style={{ color: "black", marginTop: 4 }}>Sign</Text>
        </View>
        <View style={styles.flexCenter}>
          <Pressable
            style={styles.roundedBlueButton}
            onPress={() => navigation.navigate("TX")}
          >
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>
          <Text style={{ color: "black", marginTop: 4 }}>Transactions</Text>
        </View>
      </View>

      <GenericModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        currentModalState={currentModalState}
        setCurrentModalState={setCurrentModalState}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  roundedBlueButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3773F5",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderColor: "#4A84F7",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  twoButtonflexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
  },
  actionsRow: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    // borderWidth: 1,
    width: "75%",
  },
  secondActionsRow: {
    marginVertical: 16,
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    // borderWidth: 1,
    width: "75%",
  },
});
