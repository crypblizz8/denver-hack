import { View, Pressable, Text, StyleSheet } from "react-native";
import GenericModal from "../modals/GenericModal";
import { useState, useEffect } from "react";
import {
  createPublicClient,
  createWalletClient,
  formatEther,
  http,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { goerli } from "viem/chains";
import { storage } from "../utils/storage";
import BlueButton from "../components/BlueButton";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentModalState, setCurrentModalState] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [txData, setTxData] = useState();
  const [account, setAccount] = useState(null); // New state to hold account information

  const publicClient = createPublicClient({
    chain: goerli,
    transport: http(),
  });

  const walletClient =
    account &&
    createWalletClient({
      account,
      chain: goerli, // Assuming 'goerli' is defined somewhere
      transport: http(), // Assuming this is defined somewhere
    });

  const getBalance = async () => {
    console.log("gettingBalance2");
    const balance = await publicClient.getBalance({
      address: "0x595E8C04fc0DEE37e218b2f7d54d320aa17e6D5f",
    });
    console.log("balance2...", balance);

    const balanceEther = formatEther(balance);
    setBalance(balanceEther);
  };

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

  useEffect(() => {
    if (account) {
      console.log("Account is set, fetching balance...");
      getBalance();
    }
  }, [balance]);

  const currentAddress = storage.getString("dev.address");

  const openModalWithState = (state: string) => {
    setCurrentModalState(state);
    setModalVisible(true);
  };

  const sendTransaction = async () => {
    console.log("Sending transaction...");
    const hash = await walletClient.sendTransaction({
      account,
      to: "0xb4CE8dcf4312dB84f428fD5293d4a0dDe35Ec106",
      value: 1000000000000000,
    });
    console.log("hash", hash);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>WalletKit</Text>
      <Text style={{ marginBottom: 10 }}>{currentAddress}</Text>
      <Text style={{ marginBottom: 20 }}>Balance: {balance} ETH</Text>
      <View style={styles.actionsRow}>
        <BlueButton
          description="Swap"
          onPress={() => openModalWithState("SWAP")}
        />
        <BlueButton
          description="Receive"
          onPress={() => openModalWithState("RECEIVE")}
        />
        <BlueButton description="Send" onPress={() => sendTransaction()} />
      </View>
      <View style={styles.actionsRow}>
        <View style={styles.halfWidth}>
          <BlueButton
            description="Sign"
            onPress={() => openModalWithState("SIGN")}
          />
        </View>
        <View style={styles.halfWidth}>
          <BlueButton
            description="Transactions"
            onPress={() => navigation.navigate("TX")}
          />
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
  actionsRow: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    width: "75%",
    marginVertical: 10,
  },
  halfWidth: {
    width: "50%",
  },
});
