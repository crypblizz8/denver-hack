import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface QRCodeAddressProps {
  address?: string;
  size?: number;
}

const QRCodeAddress = ({ address, size }: QRCodeAddressProps) => {
  return <QRCode value={address ? address : "test"} size={size ? size : 100} />;
};

export default QRCodeAddress;
