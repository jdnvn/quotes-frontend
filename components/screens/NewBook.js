import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text, TextInput, Snackbar } from "react-native-paper";
import { newBook } from "../../utils/api/books";

const NewBook = () => {
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const createBook = async () => {
    const params = {
      title: title,
      author: author,
    };

    try {
      const response = await newBook(params);
      console.log(response);
    } catch (error) {
      setShowError(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ padding: 15 }}>
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
      <Button onPress={createBook}>Create</Button>

      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
        style={{ backgroundColor: "crimson" }}
      >
        <Text style={{ fontSize: 20 }}>{error}</Text>
      </Snackbar>
    </View>
    </ScrollView>
  )
};

export default NewBook;
