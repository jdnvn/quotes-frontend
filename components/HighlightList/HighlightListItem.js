import { Card } from 'react-native-paper';
import { deleteHighlight } from '../../utils/api/highlights';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { ListContext } from '../core/MainRouter';
import ListItem from '../shared/ListItem/ListItem';

const HighlightListItem = ({ getHighlights, ...props }) => {
  const navigation = useNavigation();
  const { deleteHighlight: deleteHighlightFromList } = useContext(ListContext);

  const { id, text, book } = props;

  const handleDeleteHighlight = async () => {
    try {
      await deleteHighlight(id);
      deleteHighlightFromList(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditHighlight = () => {
    const routeParams = { edit: true, ...props };
    navigation.navigate("New Highlight", routeParams);
  };

  const handleViewHighlight = () => {
    const routeParams = { view: true, ...props };
    navigation.navigate("New Highlight", routeParams);
  };

  return (
    <ListItem handleDelete={handleDeleteHighlight} handleEdit={handleEditHighlight}>
      <Card
        onPress={handleViewHighlight}
        style={{ padding: 10, marginTop: 2 }}
      >
        <Card.Title title={text} subtitle={book?.title} />
      </Card>
    </ListItem>
  );
};

export default HighlightListItem;
