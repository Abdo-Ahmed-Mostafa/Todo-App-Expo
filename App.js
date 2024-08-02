import { View, SafeAreaView, ScrollView } from "react-native";
import TodoScreen from "./screen/TodoScreen";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View>
          <TodoScreen />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
