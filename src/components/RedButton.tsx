import { Text, View, Pressable, StyleSheet } from "react-native";

interface BlueButtonProps {
  description: string;
  onPress: () => void;
}
const BlueButton = ({ onPress, description }: BlueButtonProps) => {
  return (
    <View style={styles.flexCenter}>
      <Pressable style={styles.roundedBlueButton} onPress={() => onPress()}>
        <Text style={{ color: "white" }}>+</Text>
      </Pressable>
      <Text style={{ color: "black", marginTop: 4 }}>{description}</Text>
    </View>
  );
};

export default BlueButton;

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
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderColor: "#f74a4a",
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
