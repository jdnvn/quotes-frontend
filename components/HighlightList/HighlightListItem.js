import { Button, Card, Text, useTheme } from 'react-native-paper';
import { deleteHighlight } from '../../utils/api/highlights';
import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { Animated, View } from 'react-native';

const HighlightListItem = (props) => {
  const { id, text, page, location, highlightedAt, book } = props;
  const navigation = useNavigation();
  const theme = useTheme();

  const handleDeleteHighlight = async () => {
    try {
      await deleteHighlight(id);
    } catch (error) {
      console.log(error);
    }
  };

  const editAndDeleteActions = (progress, dragX) => (
    <>
    <RectButton
      style={{
        width: 50,
        backgroundColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}
      onPress={handleDeleteHighlight}
    >
      <Animated.Text style={{ color: "white" }}>
        Delete
      </Animated.Text>
    </RectButton>
      <RectButton
        style={{
          width: 50,
          backgroundColor: theme.colors.inversePrimary,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
        onPress={handleDeleteHighlight}
      >
        <Animated.Text style={{ color: "white" }}>
          Edit
        </Animated.Text>
      </RectButton>
    </>
  );


  return (
    <Swipeable renderRightActions={editAndDeleteActions}>
      <Card
        onPress={() => navigation.navigate("Highlight", props)}
        style={{ padding: 10, marginTop: 2 }}
      >
        <Card.Title title={text} subtitle={book?.title} />
      </Card>
    </Swipeable>
  )
};

export default HighlightListItem;
