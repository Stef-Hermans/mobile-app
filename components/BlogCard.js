import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

const BlogCard = ({ title, description, image, onPress, isEnabled }) => {
  const colors = isEnabled
    ? {
        card: "#1f2937",
        text: "#f9fafb",
        subText: "#d1d5db",
        accent: "#0bab77",
      }
    : {
        card: "#fff",
        text: "#111827",
        subText: "#6b7280",
        accent: "#0bab77",
      };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Image source={image} style={styles.image} />
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.subText }]}>
        {description}
      </Text>

      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Bekijk de blogpost</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    padding: 10,
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
    marginTop: 5,
    marginBottom: 10,
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

export default BlogCard;
