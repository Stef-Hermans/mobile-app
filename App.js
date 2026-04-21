import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ProductDetail from "./screens/ProductDetail";
import BlogDetail from "./screens/BlogDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              isEnabled={isEnabled}
              setIsEnabled={setIsEnabled}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Details">
          {(props) => <ProductDetail {...props} isEnabled={isEnabled} />}
        </Stack.Screen>

        <Stack.Screen name="BlogDetails">
          {(props) => <BlogDetail {...props} isEnabled={isEnabled} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
