import Home from "../screens/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme, IconButton } from "react-native-paper";
import Highlight from "../screens/Highlight";
import { MaterialIcons } from '@expo/vector-icons';
import Book from "../screens/Book";
import { createContext, useState } from "react";

const Stack = createNativeStackNavigator();
export const ListContext = createContext();

const MainRouter = () => {
  const [highlights, setHighlights] = useState([]);
  const [books, setBooks] = useState([]);
  const theme = useTheme();

  const upsertHighlight = (highlight) => {
    const i = highlights.findIndex(_highlight => _highlight.id === highlight.id);

    if (i > -1) setHighlights((highlights) => highlights.map((_highlight, index) => index === i ? highlight : _highlight));
    else setHighlights(highlights => [highlight, ...highlights]);
  };

  const upsertBook = (book) => {
    const i = books.findIndex(_book => _book.id === book.id);

    if (i > -1) setBooks((books) => books.map((_book, index) => index === i ? book : _book));
    else setBooks(books => [book, ...books]);
  };

  const deleteHighlight = (id) => {
    setHighlights((highlights) => highlights.filter(highlight => highlight.id !== id));
  };

  const deleteBook = (id) => {
    setBooks((books) => books.filter(book => book.id !== id));
  };

  const listContextValue = {
    highlights,
    setHighlights,
    upsertHighlight,
    deleteHighlight,
    books,
    setBooks,
    upsertBook,
    deleteBook,
  };

  return (
    <ListContext.Provider value={listContextValue}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: () => <MaterialIcons name="highlight" size={30} color="white" />
            }}
          />
          <Stack.Screen name="Highlight" component={Highlight} />
          <Stack.Screen name="Book" component={Book} />
        </Stack.Navigator>
      </NavigationContainer>
    </ListContext.Provider>
  )
};

export default MainRouter;
