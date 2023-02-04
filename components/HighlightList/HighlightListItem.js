import { Avatar, Button, Card, Text } from 'react-native-paper';

const HighlightListItem = ({ text, page, location, highlightedAt, bookId }) => {
  return (
    <Card>
      <Card.Title title={text} subtitle={bookId} />
      {/* <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content> */}
      {/* <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
    </Card>
  )
};

export default HighlightListItem;
