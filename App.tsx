import "fastestsmallesttextencoderdecoder";
import "react-native-get-random-values";
import { MMKV } from "react-native-mmkv";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import TXScreen from "./src/screens/TXScreen";

export const storage = new MMKV();

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TX" component={TXScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
