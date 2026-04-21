import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  Pressable,
  Button,
  Alert,
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
      <Text style={styles.screenTitle}>Detailscherm</Text>

      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>€{price.toFixed(2)}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.quantityContainer}>
        <Pressable style={styles.button} onPress={decreaseQuantity}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>

        <Text style={styles.quantity}>{quantity}</Text>

        <Pressable style={styles.button} onPress={increaseQuantity}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <Text style={styles.totalText}>Aantal producten: {quantity}</Text>
      <Text style={styles.totalPrice}>
        Totaal: €{(quantity * price).toFixed(2)}
      </Text>

      <View style={styles.buyButtonContainer}>
        <Button
          title="Koop nu"
          onPress={() => Alert.alert("Bedankt!", "Je product werd toegevoegd.")}
          color="#0bab77"
        />
      </View>

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
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: 280,
    backgroundColor: "#f5f7fb",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "90%",
    height: "90%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "#0bab77",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0bab77",
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buyButtonContainer: {
    width: "100%",
    marginTop: 10,
  },
});

export default ProductDetail;
