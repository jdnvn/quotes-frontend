import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { newHighlight } from "../../utils/api/highlights";

const NewHighlight = () => {
  const [text, setText] = useState("");
  const [page, setPage] = useState(null);
  const [location, setLocation] = useState(null);

  const createHighlight = async () => {
    const params = {
      text: text,
      page: page,
      location: location
    };

    try {
      const response = await newHighlight(params);
      console.log(response);
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput
        label="Highlight"
        value={text}
        onChangeText={text => setText(text)}
      />
      <TextInput
        label="Page"
        value={page}
        onChangeText={page => setPage(page)}
        keyboardType="phone-pad"
      />
      <TextInput
        label="Location"
        value={location}
        onChangeText={location => setLocation(location)}
        keyboardType="phone-pad"
      />
      <Button onPress={createHighlight}>
        Create
      </Button>
    </View>
  )
};

export default NewHighlight;
