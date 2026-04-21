import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
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
  const [isEnabled, setIsEnabled] = useState(false);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showAllBlogs, setShowAllBlogs] = useState(false);

  useEffect(() => {
    // PRODUCTEN
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
          (data.items || []).map((item) => ({
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
            publishedOn: item.product.lastPublished || item.product.createdOn,
          })),
        ),
      )
      .catch((error) => console.error("Error fetching products:", error));

    // BLOGS
    fetch(
      "https://api.webflow.com/v2/collections/699ef903c173cedbf2a4b1c3/items",
      {
        headers: {
          Authorization:
            "Bearer cdf45fa235b24be0b5cdb9a2255198c2a8d006bcd762ca7d69e7d55bad3a0396",
        },
      },
    )
      .then((res) => res.json())
      .then((data) =>
        setBlogs(
          (data.items || []).map((item) => ({
            id: item.id,
            title: item.fieldData.name,
            summary: item.fieldData["post-summary"],
            body: item.fieldData["post-body"]
              ?.replace(/<\/p>/g, "\n\n")
              .replace(/<\/h2>/g, "\n\n")
              .replace(/<[^>]*>/g, "")
              .replace(/&nbsp;/g, " "),
            image: {
              uri: item.fieldData["main-image"]?.url,
            },
            category:
              categoryNames[item.fieldData.category] || "Onbekende categorie",
            publishedOn: item.lastPublished || item.createdOn,
          })),
        ),
      )
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

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

  const newestProducts = [...filteredProducts].sort(
    (a, b) => new Date(b.publishedOn) - new Date(a.publishedOn),
  );

  const visibleProducts = showAllProducts
    ? sortedProducts
    : newestProducts.slice(0, 4);

  const filteredBlogs = blogs.filter(
    (blog) =>
      (selectedBlogCategory === "" || blog.category === selectedBlogCategory) &&
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const newestBlogs = [...filteredBlogs].sort(
    (a, b) => new Date(b.publishedOn) - new Date(a.publishedOn),
  );

  const visibleBlogs = showAllBlogs ? newestBlogs : newestBlogs.slice(0, 4);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Welkom</Text>
      <Text style={styles.subText}>
        Dit is mijn overzicht van producten en blogs.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Zoek een product of blog..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.switchContainer}>
        <Text>Dark mode</Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
        />
      </View>

      <Text style={styles.sectionTitle}>Producten</Text>

      <View style={styles.filterBox}>
        <Text style={styles.filterTitle}>Filter producten op categorie</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
          style={styles.picker}
        >
          <Picker.Item label="Alle categorieën" value="" />
          <Picker.Item label="Veiligheid" value="Veiligheid" />
          <Picker.Item label="E-Fietsen" value="E-Fietsen" />
          <Picker.Item label="E-Steps" value="E-Steps" />
        </Picker>

        <Text style={styles.filterTitle}>Sorteer producten</Text>
        <Picker
          selectedValue={sortOption}
          onValueChange={setSortOption}
          style={styles.picker}
        >
          <Picker.Item label="Prijs oplopend" value="price-asc" />
          <Picker.Item label="Prijs aflopend" value="price-desc" />
          <Picker.Item label="Naam A-Z" value="name-asc" />
          <Picker.Item label="Naam Z-A" value="name-desc" />
        </Picker>
      </View>

      {visibleProducts.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
          onPress={() => navigation.navigate("Details", product)}
        />
      ))}

      {filteredProducts.length > 4 && (
        <View style={styles.moreButton}>
          <Button
            title={
              showAllProducts ? "Toon minder producten" : "Zie meer producten"
            }
            onPress={() => setShowAllProducts(!showAllProducts)}
            color="#0bab77"
          />
        </View>
      )}

      <Text style={styles.sectionTitle}>Blogs</Text>

      <View style={styles.filterBox}>
        <Text style={styles.filterTitle}>Filter blogs op categorie</Text>
        <Picker
          selectedValue={selectedBlogCategory}
          onValueChange={setSelectedBlogCategory}
          style={styles.picker}
        >
          <Picker.Item label="Alle categorieën" value="" />
          <Picker.Item label="Blogs E-Fietsen" value="Blogs E-Fietsen" />
          <Picker.Item label="Blogs E-Steps" value="Blogs E-Steps" />
        </Picker>
      </View>

      {visibleBlogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          description={blog.summary}
          image={blog.image}
          onPress={() => navigation.navigate("BlogDetails", blog)}
        />
      ))}

      {filteredBlogs.length > 4 && (
        <View style={styles.moreButton}>
          <Button
            title={showAllBlogs ? "Toon minder blogs" : "Zie meer blogs"}
            onPress={() => setShowAllBlogs(!showAllBlogs)}
            color="#0bab77"
          />
        </View>
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f7fb",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#6b7280",
    lineHeight: 22,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 12,
    marginBottom: 14,
    borderRadius: 12,
  },
  switchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
  },
  filterBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },
  picker: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    alignSelf: "flex-start",
    color: "#111827",
  },
  moreButton: {
    width: "100%",
    marginTop: 4,
    marginBottom: 10,
  },
});

export default HomeScreen;
