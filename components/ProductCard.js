import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

const ProductCard = ({ title, description, price, image, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>

      <Text style={styles.category}>Product</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>€{price.toFixed(2)}</Text>
      <Text style={styles.description}>{description}</Text>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Bekijk details</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    width: "100%",
    height: 220,
    backgroundColor: "#f5f7fb",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 14,
  },
  image: {
    width: "90%",
    height: "90%",
  },
  category: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0bab77",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 14,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#0bab77",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ProductCard;
