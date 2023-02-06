import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from "react-native";
import { myBooks } from '../../utils/api/books';
import BookListItem from './BookListItem';

const BookList = ({ books, setBooks }) => {
  const [refreshing, setRefreshing] = useState(false);

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
      {books.map((book) => (
        <BookListItem key={book.id} {...book} />
      ))}
    </ScrollView>
  );
};

export default BookList;
