import { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from "react-native";
import { myBooks } from '../../utils/api/books';
import { ListContext } from '../core/MainRouter';
import BookListItem from './BookListItem';

const BookList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { books, setBooks } = useContext(ListContext);

  useEffect(() => {
    if (!books.length) getMyBooks();
  }, [books, getMyBooks]);

  const getMyBooks = async () => {
    setRefreshing(true);
    try {
      const response = await myBooks();
      setBooks(response);
    } catch (error) {
    }
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={{ width: "100%" }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getMyBooks}
          tintColor={"slateblue"}
          title={"getting yo books..."}
          titleColor={"mediumpurple"}
        />
      }
    >
      {books ? (
        books.map((book) => (
          <BookListItem key={book.id} {...book} />
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

export default BookList;
