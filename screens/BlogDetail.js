import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ScrollView, Image, View } from "react-native";

const BlogDetail = ({ route, isEnabled }) => {
  const { title, body, image } = route.params;

  const colors = isEnabled
    ? {
        background: "#111827",
        card: "#1f2937",
        text: "#f9fafb",
        subText: "#d1d5db",
      }
    : {
        background: "#fff",
        card: "#f5f7fb",
        text: "#111827",
        subText: "#666",
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
      <Text style={[styles.description, { color: colors.subText }]}>
        {body}
      </Text>

      <StatusBar style={isEnabled ? "light" : "dark"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  imageContainer: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    width: "100%",
    lineHeight: 24,
  },
});

export default BlogDetail;
