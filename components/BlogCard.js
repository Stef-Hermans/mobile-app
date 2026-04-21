import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

const BlogCard = ({ title, description, image, onPress }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button title="Bekijk de blogpost" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    marginBottom: 10,
  },
});

export default BlogCard;
