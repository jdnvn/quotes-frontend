import { View } from "react-native";
import { Button } from "react-native-paper";

const DualActionFooter = ({ handleCancel, handleSubmit, cancelText = "Cancel", submitText = "Done" }) => {
  return (
    <View style={{ display: "flex" }}>
      <Button onPress={handleCancel}>
        {cancelText}
      </Button>
      <Button onPress={handleSubmit}>
        {submitText}
      </Button>
    </View>
  );
};

export default DualActionFooter;
