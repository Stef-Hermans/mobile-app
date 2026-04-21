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

const ProductDetail = ({ route, isEnabled }) => {
  const { title, description, price, image } = route.params;

  const [quantity, setQuantity] = useState(1);

  const colors = isEnabled
    ? {
        background: "#111827",
        card: "#1f2937",
        text: "#f9fafb",
        subText: "#d1d5db",
        accent: "#0bab77",
      }
    : {
        background: "#fff",
        card: "#f5f7fb",
        text: "#111827",
        subText: "#666",
        accent: "#0bab77",
      };

  const increaseQuantity = () => setQuantity(quantity + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.screenTitle, { color: colors.text }]}>
        Detailscherm
      </Text>

      <View style={[styles.imageContainer, { backgroundColor: colors.card }]}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.price, { color: colors.accent }]}>
        €{price.toFixed(2)}
      </Text>
      <Text style={[styles.description, { color: colors.subText }]}>
        {description}
      </Text>

      <View style={styles.quantityContainer}>
        <Pressable style={styles.button} onPress={decreaseQuantity}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>

        <Text style={[styles.quantity, { color: colors.text }]}>
          {quantity}
        </Text>

        <Pressable style={styles.button} onPress={increaseQuantity}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <Text style={[styles.totalText, { color: colors.text }]}>
        Aantal producten: {quantity}
      </Text>
      <Text style={[styles.totalPrice, { color: colors.text }]}>
        Totaal: €{(quantity * price).toFixed(2)}
      </Text>

      <View style={styles.buyButtonContainer}>
        <Button
          title="Koop nu"
          onPress={() => Alert.alert("Bedankt!", "Je product werd toegevoegd.")}
          color="#0bab77"
        />
      </View>

      <StatusBar style={isEnabled ? "light" : "dark"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
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
