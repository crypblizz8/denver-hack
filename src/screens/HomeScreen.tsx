import { View, Pressable, Text, StyleSheet } from "react-native";
import GenericModal from "../modals/GenericModal";
import { useState, useEffect } from "react";
import { createPublicClient, formatEther, http } from "viem";
import { sepolia, mainnet } from "viem/chains";
import {
  createAccount,
  getAccount,
  storage,
  walletClient,
} from "../utils/storage";
import BlueButton from "../components/BlueButton";
import RedButton from "../components/RedButton";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentModalState, setCurrentModalState] = useState("");
  const [balance, setBalance] = useState("");
  const [storageLoading, setStorageLoading] = useState(false);

  useEffect(() => {
    let privateKey = storage ? storage.getString("dev.pkey") : null;

    if (!privateKey) {
      createAccount();
    } else {
      getAccount();
    }

    getBalance();
  }, []);

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(
      "https://eth-sepolia.g.alchemy.com/v2/wX_GqKH-cM5JzkPOdz3OkKiCMZyFEMsp"
    ),
  });

  const currentAddress = storage ? storage.getString("dev.address") : null;

  const getBalance = async () => {
    if (!currentAddress) return 0;
    // console.log("gettingBalance2");
    // const block = await publicClient.getBlock();
    // console.log("block...", block);
    try {
      const balance = await publicClient.getBalance({
        address: currentAddress,
      });
      // console.log("balance2...", balance);

      const balanceEther = formatEther(balance);
      setBalance(balanceEther);
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  const openModalWithState = (state: string) => {
    setCurrentModalState(state);
    setModalVisible(true);
  };

  const clearStorage = () => {
    storage.clearAll();
    setStorageLoading(true);
  };

  // useEffect(() => {
  //   if (storageLoading) {
  //     setStorageLoading(false);
  //   }
  // }, [storageLoading]);

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
        <BlueButton
          description="Send"
          onPress={() => openModalWithState("SEND")}
        />
      </View>
      <View style={styles.actionsRow}>
        <BlueButton
          description="Sign"
          onPress={() => openModalWithState("SIGN")}
        />
        <BlueButton
          description="Transactions"
          onPress={() => navigation.navigate("TX")}
        />
        <RedButton description="Clear" onPress={() => clearStorage()} />
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
