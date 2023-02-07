import { useEffect, useState } from "react";
import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, IconButton, Menu, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { myBooks } from "../../utils/api/books";
import { newHighlight, readHighlightFromImage } from "../../utils/api/highlights";
import * as ImagePicker from 'expo-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';
import * as FileSystem from 'expo-file-system';

const NewHighlight = () => {
  const [text, setText] = useState("");
  const [page, setPage] = useState(null);
  const [location, setLocation] = useState(null);
  const [bookMenuVisible, setBookMenuVisible] = useState(false);
  const [imageMenuVisible, setImageMenuVisible] = useState(false);
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const [image, setImage] = useState(null);

  const createHighlight = async () => {
    const params = {
      text: text,
      page: page,
      location: location
    };

    try {
      const response = await newHighlight(params);
    } catch(error) {
      console.log(error);
    }
  };

  const handleCloseBookMenu = () => {
    setBookMenuVisible(false);
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

  const handleOpenBookMenu = () => {
    if (!books.length) fetchBooks();
    setBookMenuVisible(true);
  };

  const handleSetBook = (id) => {
    setBook(books.find((book) => book.value === id ));
  };

  const readTextFromFile = async (uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

    try {
      const ocrResult = await readHighlightFromImage({ bytes: base64 });
      console.log(ocrResult.text)
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

    console.log(result);

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

    console.log(result);

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      readTextFromFile(uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ padding: 15 }}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
        <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <TextInput
            label="Highlight"
            value={text}
            multiline
            onChangeText={text => setText(text)}
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
        <DropDown
          label={book?.label || "Book"}
          visible={bookMenuVisible}
          showDropDown={handleOpenBookMenu}
          onDismiss={handleCloseBookMenu}
          value={book}
          setValue={handleSetBook}
          list={books}
        />
        <TextInput
          label="Page"
          value={page}
          onChangeText={page => setPage(page)}
          keyboardType="phone-pad"
        />
        <TextInput
          label="Location"
          value={location}
          onChangeText={location => setLocation(location)}
          keyboardType="phone-pad"
        />
        <Button onPress={createHighlight}>
          Create
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  )
};

export default NewHighlight;
