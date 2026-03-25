import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Button,
  Switch,
} from "react-native";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import { Picker } from "@react-native-picker/picker";

const categoryNames = {
  "": "Alle categorieën",
  "69b08a499857d1dec2558d42": "Veiligheid",
  "69b08a3e458ac35feb1de513": "Alle blogs",
  "69b088968d7e380bf65f1daf": "Blogs E-Fietsen",
  "69b0888dbc01f27c8fecae7a": "Blogs E-Steps",
  "69a8580e7572241bbef23531": "E-Fietsen",
  "699ef99d7cd6ad990044be4f": "E-Steps",
};

const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/sites/698c7fd2232508e34c8c906c/products",
      {
        headers: {
          Authorization:
            "Bearer 3890a6ecf52ce46bf303b7ea3ba601f6e6dffb13e35b25fc164602516ee1a8fe",
        },
      },
    )
      .then((res) => res.json())
      .then((data) =>
        setProducts(
          data.items.map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            description: item.product.fieldData.description,
            price: (item.skus[0]?.fieldData.price?.value || 0) / 100,
            image: {
              uri: item.skus[0]?.fieldData["main-image"]?.url,
            },
            category:
              categoryNames[item.product.fieldData.category] ||
              "Onbekende categorie",
          })),
        ),
      )
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const product = {
    name: "Fietshelm",
    price: "$100",
    description: "Een veilige en comfortabele fietshelm.",
  };

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Dit is hopelijk een werkende component</Text>

      {/* TextInput */}
      <TextInput
        style={styles.input}
        placeholder="Zoek een product..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Pressable */}
      <Pressable style={styles.pressable}>
        <Text style={styles.pressableText}>Klik mij</Text>
      </Pressable>

      {/* Button */}
      <Button title="Druk hier" onPress={() => alert("Button geklikt")} />

      {/* Switch */}
      <View style={styles.switchContainer}>
        <Text>Dark mode</Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
        />
      </View>

      <Picker
        selectedValue={selectedCategory}
        onValueChange={setSelectedCategory}
        style={{ width: 200, marginBottom: 20 }}
      >
        <Picker.Item label="Alle categorieën" value="" />
        <Picker.Item label="Veiligheid" value="Veiligheid" />
        <Picker.Item label="E-Fietsen" value="E-Fietsen" />
        <Picker.Item label="E-Steps" value="E-Steps" />
      </Picker>

      <Picker
        selectedValue={sortOption}
        onValueChange={setSortOption}
        style={{ width: 200, marginBottom: 20 }}
      >
        <Picker.Item label="Prijs oplopend" value="price-asc" />
        <Picker.Item label="Prijs aflopend" value="price-desc" />
        <Picker.Item label="Naam A-Z" value="name-asc" />
        <Picker.Item label="Naam Z-A" value="name-desc" />
      </Picker>

      {sortedProducts.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
          onPress={() => navigation.navigate("Details", product)}
        />
      ))}

      {/* BlogCards */}
      <BlogCard
        title="Een prachtige dag om te fietsen"
        description="Vandaag is het een prachtige dag om te fietsen! De zon schijnt, de vogels fluiten, en de lucht is fris. Het perfecte weer om eropuit te gaan en te genieten van de natuur op twee wielen."
        image={require("../images/product.jpg")}
        onPress={() =>
          navigation.navigate("BlogDetails", {
            title: "Een prachtige dag om te fietsen",
            description:
              "Vandaag is het een prachtige dag om te fietsen! De zon schijnt, de vogels fluiten, en de lucht is fris. Het perfecte weer om eropuit te gaan en te genieten van de natuur op twee wielen.",
            image: require("../images/product.jpg"),
          })
        }
      />

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
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  pressable: {
    backgroundColor: "#6C63FF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  pressableText: {
    color: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
});

export default HomeScreen;
