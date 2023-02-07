import { View } from "react-native";
import { Text } from "react-native-paper";

const Book = ({ route }) => {
  const { id, title, author } = route.params;

  return (
    <View>
      <Text>{title}</Text>
      <Text>{author}</Text>
    </View>
  )
};

export default Book;
