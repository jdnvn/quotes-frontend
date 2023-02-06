import { View } from "react-native";
import { Text } from "react-native-paper";

const Highlight = ({ route }) => {
  const { id, text, page, location, highlightedAt, book } = route.params;

  return (
    <View>
      <Text>{text}</Text>
      <Text>{page}</Text>
      <Text>{location}</Text>
    </View>
  )
};

export default Highlight;
