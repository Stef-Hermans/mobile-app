import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ScrollView, Image } from "react-native";

// opmaak voor de blogtekst (h2 en p)
const renderFormattedText = (html) => {
  if (!html) return null;

  // splits op h2 en p
  const parts = html.split(/(<h2>|<\/h2>|<p>|<\/p>)/g);

  return parts.map((part, index) => {
    if (part === "<h2>") return null;
    if (part === "</h2>") return null;
    if (part === "<p>") return null;
    if (part === "</p>") return null;

    // check vorige tag
    const prev = parts[index - 1];

    if (prev === "<h2>") {
      return (
        <Text key={index} style={styles.heading}>
          {part}
        </Text>
      );
    }

    if (prev === "<p>") {
      return (
        <Text key={index} style={styles.paragraph}>
          {part}
        </Text>
      );
    }

    return null;
  });
};

const BlogDetail = ({ route }) => {
  const { title, body, image } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Detailscherm</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{body}</Text>
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
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
});

export default BlogDetail;
