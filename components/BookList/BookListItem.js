import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const BookListItem = (props) => {
  const { id, title, author } = props;
  const navigation = useNavigation();

  // const handleDeleteHighlight = async () => {
  //   try {
  //     await deleteHighlight(id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Card
      onPress={() => navigation.navigate("Book", props)}
      style={{ padding: 10, marginTop: 2 }}
    >
      <Card.Title title={title} subtitle={author} />
      {/* <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content> */}
      {/* <Card.Actions>
        <Button onPress={handleDeleteHighlight}>Delete</Button>
      </Card.Actions> */}
    </Card>
  )
};

export default BookListItem;
