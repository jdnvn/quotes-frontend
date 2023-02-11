import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text, TextInput, Snackbar, Card } from "react-native-paper";
import { newBook, updateBook } from "../../utils/api/books";
import { ListContext } from "../core/MainRouter";
import DualActionFooter from "../shared/DualActionFooter";

const Book = ({ route }) => {
  const [id, setId] = useState(route?.params?.id);
  const [title, setTitle] = useState(route?.params?.title);
  const [author, setAuthor] = useState(route?.params?.author);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [editing, setEditing] = useState(route?.params?.edit);
  const [creating, setCreating] = useState(route?.params?.new);

  const navigation = useNavigation();
  const { upsertBook, highlights } = useContext(ListContext);

  const createBook = async () => {
    const params = {
      title: title,
      author: author,
    };

    try {
      const response = await newBook(params);
      setCreating(false);
      upsertBook(response);
      setId(response.id);
    } catch (error) {
      setShowError(error);
    }
  };

  const editBook = async () => {
    const params = { author, title, id: route?.params?.id };

    try {
      const response = await updateBook(params);
      setEditing(false);
      upsertBook(response);
    } catch (error) {
      console.log(error);
    }
  };

  const goToHighlight = (highlight) => {
    navigation.navigate("Highlight", highlight);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ padding: 15 }}>
      {(creating || editing) ? (
        <View style={{ height: "100%" }}>
          <TextInput
            label="Title"
            value={title}
            onChangeText={title => setTitle(title)}
          />
          <TextInput
            label="Author"
            value={author}
            onChangeText={author => setAuthor(author)}
          />
          {editing ? (
            <DualActionFooter
              handleCancel={() => setEditing(false)}
              handleSubmit={editBook}
            />
          ) : (
            <Button onPress={createBook}>
              Create
            </Button>
          )}

          <Snackbar
            visible={showError}
            onDismiss={() => setShowError(false)}
            style={{ backgroundColor: "crimson" }}
          >
            <Text style={{ fontSize: 20 }}>{error}</Text>
          </Snackbar>
        </View>
      ) : (
        <View style={{ padding: 20, display: "flex" }}>
          <View style={{ alignItems: "center" }}>
            <Text variant="headlineLarge">
              {title}
            </Text>
            <Text variant="headlineSmall">
              {author}
            </Text>
            <Button onPress={() => setEditing(true)}>
              Edit
            </Button>
          </View>
          <ScrollView style={{ marginTop: 30 }}>
            {highlights
              .filter(highlight => highlight.book?.id === id)
              .map((highlight => (
                <Card key={highlight.id} onPress={() => goToHighlight(highlight)}>
                  <Card.Title title={highlight.text} />
                </Card>
              )))
            }
          </ScrollView>
        </View>
      )}
    </ScrollView>
  )
};

export default Book;
