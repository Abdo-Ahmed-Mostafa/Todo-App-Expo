import { View, SafeAreaView, ScrollView } from "react-native";
import TodoScreen from "./screen/TodoScreen";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "react-native-screens";
import "react-native-safe-area-context";
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
