import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Button,
  Switch,
} from "react-native";
import { useState } from "react";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [text, setText] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const product = {
    name: "Fietshelm",
    price: "$100",
    description: "Een veilige en comfortabele fietshelm.",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Dit is hopelijk een werkende component</Text>

      {/* TextInput */}
      <TextInput
        style={styles.input}
        placeholder="Zoek een product..."
        value={text}
        onChangeText={setText}
      />

      {/* Pressable */}
      <Pressable style={styles.pressable}>
        <Text style={styles.pressableText}>Klik mij</Text>
      </Pressable>

      {/* Button */}
      <Button title="Druk hier" onPress={() => alert("Button geklikt")} />

      {/* Switch */}
      <View style={styles.switchContainer}>
        <Text>Dark mode</Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
        />
      </View>

      {/* ProductCards */}
      <ProductCard product={product} />
      <ProductCard product={product} />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  pressable: {
    backgroundColor: "#6C63FF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  pressableText: {
    color: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
});
