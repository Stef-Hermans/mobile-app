import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ title, description, price, image, onPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button title="Druk hier voor detail" onPress={onPress} />
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
    width: 250,
    height: 250,
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
