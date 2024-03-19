import { useCallback, useEffect, useState } from "react";

interface BalanceProps {
  address: string;
}

export const fetchWallet = async (address: BalanceProps) => {
  try {
    const response = await fetch(
      `https://api.zerion.io/v1/wallets/${address}/portfolio?currency=usd`,
      // `https://api.zerion.io/v1/wallets/0x595E8C04fc0DEE37e218b2f7d54d320aa17e6D5f/portfolio?currency=usd`,
      {
        headers: {
          accept: "application/json",
          authorization: `Basic emtfZGV2XzhiYWU1MDE2YjNlZjRhMjViZjE5MDZjNWY5ZmZjYzY4Og==`,
        },
      }
    );
    const responseData = await response.json();
    console.log("responseData", responseData);
    return responseData.data.attributes.positions_distribution_by_type.wallet; // Store the fetched data
  } catch (error) {
    console.error(error);
    return error; // Store any error that occurs
  }
};
