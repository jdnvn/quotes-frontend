import Home from "../screens/Home";
import NewHighlight from "../screens/NewHighlight";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme, IconButton } from "react-native-paper";

const Stack = createNativeStackNavigator();

const MainRouter = () => {
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="My Highlights"
          component={Home}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                icon="plus"
                size={20}
                onPress={() => navigation.navigate('New Highlight')}
              />
            )
          })}
        />
        <Stack.Screen name="New Highlight" component={NewHighlight} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default MainRouter;
