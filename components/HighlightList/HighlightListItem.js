import { Button, Card, Text } from 'react-native-paper';
import { deleteHighlight } from '../../utils/api/highlights';
import { useNavigation } from '@react-navigation/native';

const HighlightListItem = (props) => {
  const { id, text, page, location, highlightedAt, book } = props;
  const navigation = useNavigation();

  const handleDeleteHighlight = async () => {
    try {
      await deleteHighlight(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      onPress={() => navigation.navigate("Highlight", props)}
      style={{ padding: 10, marginTop: 2 }}
    >
      <Card.Title title={text} subtitle={book?.title} />
      {/* <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content> */}
      <Card.Actions>
        <Button onPress={handleDeleteHighlight}>Delete</Button>
      </Card.Actions>
    </Card>
  )
};

export default HighlightListItem;
