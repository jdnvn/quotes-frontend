import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../shared/ListItem/ListItem';
import { deleteBook } from '../../utils/api/books';
import { useContext } from 'react';
import { ListContext } from '../core/MainRouter';

const BookListItem = (props) => {
  const { id, title, author } = props;
  const navigation = useNavigation();
  const { deleteBook: deleteBookFromList } = useContext(ListContext);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      deleteBookFromList(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBook = () => {
    const routeParams = { edit: true, ...props };
    navigation.navigate("Book", routeParams);
  };

  return (
    <ListItem handleDelete={handleDeleteBook} handleEdit={handleEditBook}>
      <Card
        onPress={() => navigation.navigate("Book", props)}
        style={{ padding: 10, marginTop: 2 }}
      >
        <Card.Title title={title} subtitle={author} />
      </Card>
    </ListItem>
  )
};

export default BookListItem;
