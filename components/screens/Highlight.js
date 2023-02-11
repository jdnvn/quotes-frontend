import { useContext, useEffect, useState } from "react";
import { View, Keyboard, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, IconButton, Menu, Text, TextInput, withTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { myBooks } from "../../utils/api/books";
import { newHighlight, readHighlightFromImage, updateHighlight } from "../../utils/api/highlights";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ListContext } from "../core/MainRouter";
import DualActionFooter from "../shared/DualActionFooter";

const Highlight = ({ route }) => {
  const [text, setText] = useState(route?.params?.text || "");
  const [book, setBook] = useState({ label: route?.params?.book?.title, value: route?.params?.book?.id } || {});
  const [page, setPage] = useState(route?.params?.page);
  const [location, setLocation] = useState(route?.params?.location);
  const [bookDropdownVisible, setBookDropdownVisible] = useState(false);
  const [imageMenuVisible, setImageMenuVisible] = useState(false);
  const [books, setBooks] = useState([]);
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(route?.params?.edit);
  const [creating, setCreating] = useState(route?.params?.new);

  const { upsertHighlight } = useContext(ListContext);

  const createHighlight = async () => {
    const params = { text, page, location, book_id: book?.value };

    try {
      const response = await newHighlight(params);
      setCreating(false);
      upsertHighlight(response);
    } catch(error) {
      console.log(error);
    }
  };

  const editHighlight = async () => {
    const params = { text, page, location, id: route?.params?.id, book_id: book?.value };

    try {
      const response = await updateHighlight({ params });
      setEditing(false);
      upsertHighlight(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseBookDropdown = () => {
    setBookDropdownVisible(false);
  };

  const fetchBooks = async () => {
    try {
      const response = await myBooks();
      const bookList = response?.map((book) => ({ label: book?.title, value: book?.id }));
      setBooks(bookList);
    } catch (error) {
      console.log("Could not fetch books");
    }
  };

  const handleOpenBookDropdown = () => {
    if (!books.length) fetchBooks();
    setBookDropdownVisible(true);
  };

  const handleSetBook = (id) => {
    setBook(books.find((book) => book.value === id ));
  };

  const readTextFromFile = async (uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

    try {
      const ocrResult = await readHighlightFromImage({ bytes: base64 });
      setText(ocrResult.text);
    } catch (error) {
      console.log("could not read text from image");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri
      setImage(uri);
      readTextFromFile(uri);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      readTextFromFile(uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, height: "200%" }} style={{ padding: 15 }}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
        {(creating || editing) ? (
          <View style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 15 }}>
            <View style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center" }}>
              <TextInput
                label="Highlight"
                value={text}
                multiline
                onChangeText={value => setText(value)}
                style={{ width: "90%" }}
              />
              <Menu
                visible={imageMenuVisible}
                onDismiss={() => setImageMenuVisible(false)}
                anchor={<IconButton onPress={() => setImageMenuVisible(true)} icon="camera" size={20} />}
                style={{ alignItems: "center" }}
              >
                <Menu.Item title="Take picture" onPress={openCamera} />
                <Menu.Item title="Select from library" onPress={pickImage} />
              </Menu>
            </View>
            <View style={{ marginTop: 15 }}>
              <DropDown
                label={book?.label || "Book"}
                visible={bookDropdownVisible}
                showDropDown={handleOpenBookDropdown}
                onDismiss={handleCloseBookDropdown}
                value={book}
                setValue={handleSetBook}
                list={books}
              />
            </View>

            <View style={{ marginTop: 15 }}>
              <TextInput
                label="Page"
                value={page}
                onChangeText={value => setPage(value)}
                keyboardType="phone-pad"
              />
            </View>

            <View style={{ marginTop: 15 }}>
              <TextInput
                label="Location"
                value={location}
                onChangeText={value => setLocation(value)}
                keyboardType="phone-pad"
              />
            </View>

            <View style={{ marginTop: 30 }}>
              {editing ? (
                <DualActionFooter
                  handleCancel={() => setEditing(false)}
                  handleSubmit={editHighlight}
                />
              ) : (
                <Button onPress={createHighlight}>
                  Create
                </Button>
              )}
            </View>
          </View>
        ) : (
          <View style={{ padding: 15, marginBottom: 50 }}>
            <Text variant="titleLarge">
              {text}
            </Text>
            <Text>{" "}</Text>
            <Text variant="titleMedium">{route?.params?.book?.title}</Text>
            <Text variant="titleSmall">{route?.params?.book?.author}</Text>
            <Button onPress={() => setEditing(true)}>
              Edit
            </Button>
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  )
};

export default withTheme(Highlight);
