import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={require("../images/product.jpg")} style={styles.image} />
      <Text style={styles.title}>Fiets</Text>
      <Text style={styles.price}>100$</Text>
      <Text style={styles.description}>Prachtige fiets!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    color: "#6C63FF",
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default ProductCard;
