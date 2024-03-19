import { useEffect } from "react";
import { MMKV } from "react-native-mmkv";
import { createWalletClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

export const storage = new MMKV();

export let walletClient;

const ALCHEMY =
  "https://eth-sepolia.g.alchemy.com/v2/wX_GqKH-cM5JzkPOdz3OkKiCMZyFEMsp";

export const createAccount = () => {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  storage.set("dev.pkey", privateKey);
  storage.set("dev.account", JSON.stringify(account));
  storage.set("dev.address", account.address);
  walletClient =
    account &&
    createWalletClient({
      account,
      chain: sepolia,
      transport: http(ALCHEMY),
    });
};

export const getAccount = () => {
  const pKey = storage ? storage.getString("dev.pkey") : null;
  const account = privateKeyToAccount(pKey);
  storage.set("dev.address", account.address);
  storage.set("dev.account", JSON.stringify(account));

  walletClient =
    account &&
    createWalletClient({
      account,
      chain: sepolia,
      transport: http(ALCHEMY),
    });
  storage.set("dev.account", JSON.stringify(account));
};
