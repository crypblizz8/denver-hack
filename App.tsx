import "fastestsmallesttextencoderdecoder";
import "@walletconnect/react-native-compat";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { createWalletClient, http } from "viem";
import {
  mainnet,
  base,
  goerli,
  baseGoerli,
  xdc,
  xdcTestnet,
} from "viem/chains";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import SwapComponent from "./src/components/Swap";
import Swap from "./src/components/Swap";
import TemplateModal from "./src/modals/TemplateModal";

export default function App() {
  const [address, setAddress] = useState("");
  const privateKey = generatePrivateKey();

  //Modal Actions
  const [modalVisible, setModalVisible] = useState(false);

  // ToDo: Move to mmkv state storage.
  // Generates a new one each state load for demo purposes
  const account = privateKeyToAccount(privateKey);

  // const chainList = mainnet,
  //   goerli,
  //   base,
  //   baseGoerli,
  //   xdc,
  //   xdcTestnet;

  const walletClient = createWalletClient({
    account,
    chain: goerli,
    transport: http(),
  });

  const getAddresses = async () => {
    const [address] = await walletClient.getAddresses();
    console.log("Address", address);
    setAddress(address);
    return;
  };

  const signMessage = async () => {
    const signature_1 = await walletClient.signMessage({
      account,
      message: "hello world",
    });
    console.log("signature_1", signature_1);
    return;
  };

  const fetchHarpie = async () => {
    try {
      const res = await fetch("https://api.harpie.io/v2/validateAddress", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: "74778fa4-88a8-4e35-922a-02bd82005edd",
          address: "0x55456cbd1f11298b80a53c896f4b1dc9bc16c731",
        }),
      });
      const data = await res.json();
      console.log("isMaliciousAddress", data?.isMaliciousAddress);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!address) {
      getAddresses();
    }
  }, [address]);

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>WalletSwap Kit</Text>
      <Text style={{ marginBottom: 20 }}>{address}</Text>
      <View style={styles.actionsRow}>
        <View style={styles.flexCenter}>
          <Pressable style={styles.roundedBlueButton}>
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>
          <Text style={{ color: "black", marginTop: 4 }}>Swap</Text>
        </View>

        <View style={styles.flexCenter}>
          <Pressable style={styles.roundedBlueButton}>
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>
          <Text style={{ color: "black", marginTop: 4 }}>Send</Text>
        </View>
        <View style={styles.flexCenter}>
          <Pressable style={styles.roundedBlueButton}>
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>
          <Text style={{ color: "black", marginTop: 4 }}>Receive</Text>
        </View>
        <View style={styles.flexCenter}>
          <Pressable
            style={styles.roundedBlueButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>
          <Text style={{ color: "black", marginTop: 4 }}>Sign</Text>
        </View>
      </View>

      {/* <Button title="Sign" onPress={() => signMessage()} /> */}
      {/* <Button title="FetchHaripie" onPress={() => fetchHarpie()} /> */}
      {/* <Swap /> */}

      <TemplateModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </View>
  );
}

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
    borderWidth: 1,
    borderColor: "#4A84F7", // A slightly lighter color than the background
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actionsRow: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    // borderWidth: 1,
    width: "75%",
  },
});
