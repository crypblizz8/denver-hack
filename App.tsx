import "fastestsmallesttextencoderdecoder";
import "react-native-get-random-values";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { createWalletClient, http } from "viem";
import { goerli } from "viem/chains";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import GenericModal from "./src/modals/GenericModal";
import { MMKV } from "react-native-mmkv";
import { fetchWallet } from "./src/hooks/getBalance";
// import { fetchWalletBalanceData } from "./src/hooks/getBalance";

export const storage = new MMKV();

export default function App() {
  //Modal Actions
  const [modalVisible, setModalVisible] = useState(false);
  const [currentModalState, setCurrentModalState] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState();
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

  const signMessage = async () => {
    const signature_1 = await walletClient.signMessage({
      account,
      message: "hell2o world2",
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
    const fetchData = async () => {
      try {
        console.log("currentAddress1 ", typeof currentAddress);
        const balanceRes = await fetchWallet(currentAddress);
        const res = JSON.stringify(balanceRes);
        setBalance(res);
      } catch (error) {
        console.error("Failed to fetch wallet balance:", error);
        // Handle any errors here, such as setting an error state
      }
    };

    if (currentAddress) {
      fetchData();
    }
  }, [currentAddress]);

  const openModalWithState = (state: string) => {
    setCurrentModalState(state);
    setModalVisible(true);
  };

  // Scrollview to refresh state?
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>WalletKit</Text>
      <Text style={{ marginBottom: 10 }}>{currentAddress}</Text>
      <Text style={{ marginBottom: 20 }}>Balance: {balance} ETH</Text>
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

        <View style={styles.flexCenter}>
          <Pressable
            style={styles.roundedBlueButton}
            onPress={() => openModalWithState("SIGN")}
          >
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>
          <Text style={{ color: "black", marginTop: 4 }}>Sign</Text>
        </View>
      </View>
      {/* <View style={styles.secondActionsRow}>
        <View style={styles.flexCenter}>
          <Pressable
            style={styles.roundedBlueButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>
          <Text style={{ color: "black", marginTop: 4 }}>Tx</Text>
        </View>
        <View style={styles.twoButtonflexCenter}>
          <Pressable
            style={styles.roundedBlueButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>
          <Text style={{ color: "black", marginTop: 4 }}>NFT</Text>
        </View>
      </View> */}
      {/* <Button title="Sign" onPress={() => signMessage()} /> */}
      {/* <Button title="FetchHaripie" onPress={() => fetchHarpie()} /> */}
      {/* <SwipeButton /> */}

      <GenericModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        currentModalState={currentModalState}
        setCurrentModalState={setCurrentModalState}
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
