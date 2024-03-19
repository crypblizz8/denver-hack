import { storage, walletClient } from "../utils/storage";
interface sendTransactionProps {
  recipientAddress: string;
}

export const sendTransaction = async ({
  recipientAddress,
}: sendTransactionProps) => {
  const account = storage ? storage.getString("dev.account") : null;
  const accountJSON = JSON.parse(account);

  const hash = await walletClient.sendTransaction({
    accountJSON,
    to: recipientAddress,
    value: 1000000000000000,
  });
  console.log("hash", hash);
};
