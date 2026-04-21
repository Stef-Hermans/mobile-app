import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Switch,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import { Picker } from "@react-native-picker/picker";

// Hier zetten we categorie-ID's van Webflow om naar leesbare namen
const categoryNames = {
  "": "Alle categorieën",
  "69b08a499857d1dec2558d42": "Veiligheid",
  "69b08a3e458ac35feb1de513": "Alle blogs",
  "69b088968d7e380bf65f1daf": "Blogs E-Fietsen",
  "69b0888dbc01f27c8fecae7a": "Blogs E-Steps",
  "69a8580e7572241bbef23531": "E-Fietsen",
  "699ef99d7cd6ad990044be4f": "E-Steps",
};

const HomeScreen = ({ navigation, isEnabled, setIsEnabled }) => {
  // State voor producten en blogs uit de API
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // State voor product filter en blog filter
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("");

  // Algemene zoekfunctie en sorteermenu voor producten
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

  // State om standaard 4 items te tonen
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showAllBlogs, setShowAllBlogs] = useState(false);

  // Kleuren voor light mode en dark mode
  // Deze kleuren worden in de JSX en styles gebruikt
  const colors = isEnabled
    ? {
        background: "#111827",
        card: "#1f2937",
        text: "#f9fafb",
        subText: "#d1d5db",
        border: "#374151",
        inputBackground: "#1f2937",
        accent: "#0bab77",
      }
    : {
        background: "#f5f7fb",
        card: "#ffffff",
        text: "#111827",
        subText: "#6b7280",
        border: "#d1d5db",
        inputBackground: "#ffffff",
        accent: "#0bab77",
      };

  useEffect(() => {
    // PRODUCTEN OPHALEN UIT WEBFLOW
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

    // BLOGS OPHALEN UIT WEBFLOW
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

            // Korte samenvatting voor op de homepage
            summary: item.fieldData["post-summary"],

            // Volledige tekst voor op het detailscherm
            body: item.fieldData["post-body"]
              ?.replace(/<\/p>/g, "\n\n")
              .replace(/<\/h2>/g, "\n\n")
              .replace(/<[^>]*>/g, "")
              .replace(/&nbsp;/g, " "),

            image: {
              uri: item.fieldData["main-image"]?.url,
            },

            // Huidige categorie-omzetting voor blogs
            category:
              categoryNames[item.fieldData.category] || "Onbekende categorie",

            publishedOn: item.lastPublished || item.createdOn,
          })),
        ),
      )
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  // PRODUCTEN FILTEREN
  // Filter op categorie + zoekterm
  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // PRODUCTEN SORTEREN
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  // NIEUWSTE PRODUCTEN
  const newestProducts = [...filteredProducts].sort(
    (a, b) => new Date(b.publishedOn) - new Date(a.publishedOn),
  );

  // Standaard 4 producten tonen, of alles als showAllProducts true is
  const visibleProducts = showAllProducts
    ? sortedProducts
    : newestProducts.slice(0, 4);

  // BLOGS FILTEREN
  // Filter op blogcategorie + zoekterm
  const filteredBlogs = blogs.filter(
    (blog) =>
      (selectedBlogCategory === "" || blog.category === selectedBlogCategory) &&
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // NIEUWSTE BLOGS
  const newestBlogs = [...filteredBlogs].sort(
    (a, b) => new Date(b.publishedOn) - new Date(a.publishedOn),
  );

  // Standaard 4 blogs tonen, of alles als showAllBlogs true is
  const visibleBlogs = showAllBlogs ? newestBlogs : newestBlogs.slice(0, 4);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Titel en korte intro */}
      <Text style={[styles.heading, { color: colors.text }]}>Welkom</Text>
      <Text style={[styles.subText, { color: colors.subText }]}>
        Dit is mijn overzicht van producten en blogs.
      </Text>

      {/* Algemene zoekfunctie voor producten en blogs */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
        placeholder="Zoek een product of blog..."
        placeholderTextColor={colors.subText}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Dark mode switch */}
      <View style={[styles.switchContainer, { backgroundColor: colors.card }]}>
        <Text style={{ color: colors.text }}>Dark mode</Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
          trackColor={{ false: "#d1d5db", true: "#34d399" }}
          thumbColor={isEnabled ? "#0bab77" : "#f4f3f4"}
        />
      </View>

      {/* PRODUCTEN SECTIE */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Producten
      </Text>

      {/* Productfilter en productsortering */}
      <View style={[styles.filterBox, { backgroundColor: colors.card }]}>
        <Text style={[styles.filterTitle, { color: colors.text }]}>
          Filter producten op categorie
        </Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
          style={[styles.picker, { color: colors.text }]}
        >
          <Picker.Item label="Alle categorieën" value="" />
          <Picker.Item label="Veiligheid" value="Veiligheid" />
          <Picker.Item label="E-Fietsen" value="E-Fietsen" />
          <Picker.Item label="E-Steps" value="E-Steps" />
        </Picker>

        <Text style={[styles.filterTitle, { color: colors.text }]}>
          Sorteer producten
        </Text>
        <Picker
          selectedValue={sortOption}
          onValueChange={setSortOption}
          style={[styles.picker, { color: colors.text }]}
        >
          <Picker.Item label="Prijs oplopend" value="price-asc" />
          <Picker.Item label="Prijs aflopend" value="price-desc" />
          <Picker.Item label="Naam A-Z" value="name-asc" />
          <Picker.Item label="Naam Z-A" value="name-desc" />
        </Picker>
      </View>

      {/* Productcards tonen */}
      {visibleProducts.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
          onPress={() => navigation.navigate("Details", product)}
          isEnabled={isEnabled}
        />
      ))}

      {/* Zie meer knop voor producten */}
      {filteredProducts.length > 4 && (
        <Pressable
          style={[styles.moreButton, { backgroundColor: colors.accent }]}
          onPress={() => setShowAllProducts(!showAllProducts)}
        >
          <Text style={styles.moreButtonText}>
            {showAllProducts ? "Toon minder producten" : "Zie meer producten"}
          </Text>
        </Pressable>
      )}

      {/* BLOGS SECTIE */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Blogs</Text>

      {/* Blogfilter */}
      <View style={[styles.filterBox, { backgroundColor: colors.card }]}>
        <Text style={[styles.filterTitle, { color: colors.text }]}>
          Filter blogs op categorie
        </Text>
        <Picker
          selectedValue={selectedBlogCategory}
          onValueChange={setSelectedBlogCategory}
          style={[styles.picker, { color: colors.text }]}
        >
          <Picker.Item label="Alle categorieën" value="" />
          <Picker.Item label="Blogs E-Fietsen" value="Blogs E-Fietsen" />
          <Picker.Item label="Blogs E-Steps" value="Blogs E-Steps" />
        </Picker>
      </View>

      {/* Blogcards tonen */}
      {visibleBlogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          description={blog.summary}
          image={blog.image}
          onPress={() => navigation.navigate("BlogDetails", blog)}
          isEnabled={isEnabled}
        />
      ))}

      {/* Zie meer knop voor blogs */}
      {filteredBlogs.length > 4 && (
        <Pressable
          style={[styles.moreButton, { backgroundColor: colors.accent }]}
          onPress={() => setShowAllBlogs(!showAllBlogs)}
        >
          <Text style={styles.moreButtonText}>
            {showAllBlogs ? "Toon minder blogs" : "Zie meer blogs"}
          </Text>
        </Pressable>
      )}

      {/* StatusBar mee laten veranderen met dark mode */}
      <StatusBar style={isEnabled ? "light" : "dark"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Algemene container van de pagina
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },

  // Grote titel bovenaan
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  // Korte beschrijving onder de titel
  subText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },

  // Zoekbalk
  input: {
    width: "100%",
    borderWidth: 1,
    padding: 12,
    marginBottom: 14,
    borderRadius: 12,
  },

  // Box van dark mode switch
  switchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    padding: 12,
    borderRadius: 12,
  },

  // Witte/donkere box rond filters
  filterBox: {
    width: "100%",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },

  // Titel boven een filter of sorteerblok
  filterTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },

  // Picker zelf
  picker: {
    width: "100%",
    marginBottom: 10,
  },

  // Sectietitel zoals Producten / Blogs
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    alignSelf: "flex-start",
  },

  // Compacte zie meer knop
  moreButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    marginTop: 4,
    marginBottom: 10,
  },

  // Tekst in de zie meer knop
  moreButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default HomeScreen;
