import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ListRenderItemInfo,
} from "react-native";
import { getTransactions } from "../hooks/getTransctions";

interface Icon {
  url: string;
}

interface FungibleInfo {
  name: string;
  symbol: string;
  icon?: Icon;
}

interface Fee {
  fungible_info?: FungibleInfo;
  quantity: {
    float: number;
    decimals: number;
  };
}

interface NFTInfo {
  name: string;
}

interface Transfer {
  nft_info?: NFTInfo;
}

interface TransactionAttributes {
  operation_type: string;
  mined_at: string;
  sent_from: string;
  sent_to: string;
  fee: Fee;
  transfers: Transfer[];
}

interface Transaction {
  id: string;
  attributes: TransactionAttributes;
}

interface TransactionsData {
  data: Transaction[];
}

// Example data

const TransactionItem = (item) => {
  //   console.log("test TransactionItem ITEM", item);
  //   console.log("TransactionItem item", item.attributes.operation_type);
  //   const { operation_type, mined_at, sent_from, sent_to, transfers, fee } =
  //     item.attributes;
  //   const transactionType =
  //     operation_type.charAt(0).toUpperCase() + operation_type.slice(1);
  //   const date = new Date(mined_at).toLocaleDateString();
  //   const transfer = transfers[0]?.nft_info ? transfers[0].nft_info.name : "N/A";
  //   const feeInfo = fee.fungible_info
  //     ? `${fee.quantity.float.toFixed(3)} ${fee.fungible_info.symbol}`
  //     : "N/A";
  //   console.log("ITEM FROM", sent_from);
  //   return (
  // <View style={styles.itemContainer}>
  //   <Text style={styles.titleText}>Type: {transactionType}</Text>
  //   <Text>Date: {date}</Text>
  //   <Text>From: {sent_from}</Text>
  //   <Text>To: {sent_to}</Text>
  //   <Text>Transfer: {transfer}</Text>
  //   <Text>Fee: {feeInfo}</Text>
  //   {fee.fungible_info?.icon?.url && (
  //     <Image
  //       source={{ uri: fee.fungible_info.icon.url }}
  //       style={styles.icon}
  //     />
  //   )}
  // </View>
  //   );
};

const TransactionList = (currentAddress: any) => {
  //   console.log("currentAddress COMPONENT", currentAddress);

  const [txData, setTxData] = useState();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // console.log("currentAddress1 ", typeof currentAddress);
        const balanceRes = await getTransactions();
        // setBalance(res);
        // console.log("TransactionsRes", balanceRes);
        setTxData(balanceRes);
        // console.log("data TYPE ", typeof balanceRes);
      } catch (error) {
        console.error("Failed to fetch wallet balance:", error);
        // Handle any errors here, such as setting an error state
      }
    };

    if (currentAddress) {
      fetchTransactions();
    }
  }, [currentAddress]);

  //   console.log("TransactionList RENDER data", data?.length);
  const renderItem = ({ item }) => {
    // console.log("item.attributes", item.attributes);
    const { operation_type, mined_at, sent_from, sent_to, transfers, fee } =
      item.attributes;
    const date = new Date(mined_at).toLocaleDateString();
    const transfer = transfers[0]?.nft_info
      ? transfers[0].nft_info.name
      : "N/A";
    const feeInfo = fee.fungible_info
      ? `${fee.quantity.float.toFixed(3)} ${fee.fungible_info.symbol}`
      : "N/A";

    return (
      <View style={styles.itemContainer}>
        {/* <Text style={styles.titleText}>Type: {transactionType}</Text> */}
        <Text>Date: {date}</Text>
        <Text>From: {sent_from}</Text>
        <Text>To: {sent_to}</Text>
        <Text>Description: {transfer}</Text>
        <Text>Fee: {feeInfo}</Text>
        {fee.fungible_info?.icon?.url && (
          <Image
            source={{ uri: fee.fungible_info.icon.url }}
            style={styles.icon}
          />
        )}
      </View>
    );
  };

  if (!txData) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={txData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
});

export default TransactionList;
