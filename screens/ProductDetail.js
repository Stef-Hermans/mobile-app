import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  Button,
} from "react-native";
import { useState } from "react";

const ProductDetail = ({ route }) => {
  const { title, description, price, image } = route.params;

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detailscherm</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>€{price}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.quantityContainer}>
        <Button title="-" onPress={decreaseQuantity} />
        <Text style={styles.quantity}>{quantity}</Text>
        <Button title="+" onPress={increaseQuantity} />
      </View>

      <Text style={styles.totalPrice}>Totaal: €{quantity * price}</Text>
      <StatusBar style="auto" />
    </ScrollView>
  );
};

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
  image: {
    width: 250,
    height: 250,
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default ProductDetail;
