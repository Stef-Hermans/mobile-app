import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

const BlogCard = ({ title, description, image, onPress, isEnabled }) => {
  // Kleurenset van de blogcard voor light mode / dark mode
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
      {/* Blogafbeelding */}
      <Image source={image} style={styles.image} />

      {/* Titel en samenvatting */}
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.subText }]}>
        {description}
      </Text>

      {/* Knop naar details */}
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Bekijk de blogpost</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  // Hele blogcard
  card: {
    width: 300,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  // Blogafbeelding
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },

  // Blogtitel
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  // Korte beschrijving / samenvatting
  description: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
  },

  // Groene knop
  button: {
    backgroundColor: "#0bab77",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  // Tekst in knop
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default BlogCard;
