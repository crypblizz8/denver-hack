import { useCallback, useEffect, useState } from "react";

interface BalanceProps {
  address: string;
}

export const getTransactions = async (address: BalanceProps) => {
  console.log("fetchTransactions address", address);
//   0xb4CE8dcf4312dB84f428fD5293d4a0dDe35Ec106
  try {
    const response = await fetch(
      `https://api.zerion.io/v1/wallets/${address}/transactions/?currency=usd&page[size]=100&filter[trash]=only_non_trash`,
    //   `https://api.zerion.io/v1/wallets/${address}/transactions/?currency=usd&page[size]=100&filter[trash]=only_non_trash`,
      {
        headers: {
          accept: "application/json",
          authorization: `Basic XXX==`,
        },
      }
    );
    const responseData = await response.json();
    console.log("responseData", responseData);
    // return responseData.data.attributes.positions_distribution_by_type.wallet; // Store the fetched data
  } catch (error) {
    console.error(error);
    return error; // Store any error that occurs
  }
};
