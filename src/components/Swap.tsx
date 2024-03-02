import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

interface SwapQuote {
  price: string;
  toToken: {
    symbol: string;
  };
  fromToken: {
    symbol: string;
  };
}

const Swap: React.FC = () => {
  const [buyToken, setBuyToken] = useState<string>("");
  const [sellToken, setSellToken] = useState<string>("");
  const [sellAmount, setSellAmount] = useState<string>("");
  const [quote, setQuote] = useState<SwapQuote | null>(null);

  const getSwapQuote = async () => {
    try {
      const response = await fetch(
        "https://api.0x.org/swap/v1/quote?sellToken=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&buyToken=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&sellAmount=1000000000000000000",
        // `https://api.0x.org/swap/v1/quote?buyToken=${buyToken}&sellToken=${sellToken}&sellAmount=${sellAmount}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "0x-api-key": "XXXXX-XXXXX-XXXXX-XXXXX",
          },
        }
      );
      const data: SwapQuote = await response.json();
      console.log("swapData", data);
      setQuote(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.flexRow}>
        <TextInput
          style={styles.input}
          placeholder="Sell Token (e.g., ETH)"
          value={sellToken}
          onChangeText={setSellToken}
        />
        <TextInput
          style={styles.quoteInput}
          placeholder="Sell Token (e.g., ETH)"
          value={sellToken}
          onChangeText={setSellToken}
        />
      </View> */}
      {/* <TextInput
        style={styles.input}
        placeholder="Sell Token (e.g., ETH)"
        value={sellToken}
        onChangeText={setSellToken}
      />
      <TextInput
        style={styles.input}
        placeholder="Buy Token (e.g., DAI)"
        value={buyToken}
        onChangeText={setBuyToken}
      />
      <TextInput
        style={styles.input}
        placeholder="Sell Amount (in Wei)"
        value={sellAmount}
        onChangeText={setSellAmount}
        keyboardType="numeric"
      /> */}
      <Button title="Get Quote" onPress={getSwapQuote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    marginVertical: 12,
    marginHorizontal: 6,
    borderWidth: 1,
    padding: 10,
  },
  quoteInput: {
    height: 40,
    width: 200,
    marginVertical: 12,
    marginHorizontal: 6,
    borderWidth: 1,
    padding: 10,
  },
  quoteText: {
    marginTop: 20,
  },
  flexRow: {
    flexDirection: "row",
    display: "flex",
  },
});

export default Swap;
