import { Avatar, Button, Card, Text } from 'react-native-paper';
import { deleteHighlight } from '../../utils/api/highlights';

const HighlightListItem = ({ id, text, page, location, highlightedAt, bookId }) => {
  const handleDeleteHighlight = async () => {
    try {
      await deleteHighlight(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Card.Title title={text} subtitle={bookId} />
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
