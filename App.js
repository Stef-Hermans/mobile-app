// useState gebruiken we hier om dark mode globaal te bewaren
import { useState } from "react";

// Navigatie imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Schermen importeren
import HomeScreen from "./screens/HomeScreen";
import ProductDetail from "./screens/ProductDetail";
import BlogDetail from "./screens/BlogDetail";

// Stack navigator aanmaken
const Stack = createNativeStackNavigator();

export default function App() {
  // Globale dark mode state
  // Deze state wordt doorgestuurd naar alle schermen
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    // NavigationContainer is de hoofdcontainer voor alle navigatie
    <NavigationContainer>
      <Stack.Navigator>
        {/* Home scherm */}
        {/* Hier geven we isEnabled en setIsEnabled door */}
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              isEnabled={isEnabled}
              setIsEnabled={setIsEnabled}
            />
          )}
        </Stack.Screen>

        {/* Product detail scherm */}
        {/* Hier geven we enkel isEnabled door */}
        <Stack.Screen name="Details">
          {(props) => <ProductDetail {...props} isEnabled={isEnabled} />}
        </Stack.Screen>

        {/* Blog detail scherm */}
        <Stack.Screen name="BlogDetails">
          {(props) => <BlogDetail {...props} isEnabled={isEnabled} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
