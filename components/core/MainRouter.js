import Home from "../screens/Home";
import NewHighlight from "../screens/NewHighlight";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme, IconButton } from "react-native-paper";
import Highlight from "../screens/Highlight";
import { MaterialIcons } from '@expo/vector-icons';

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
            ),
            headerTitle: () => <MaterialIcons name="highlight" size={30} color="white" />
          })}
        />
        <Stack.Screen name="New Highlight" component={NewHighlight} />
        <Stack.Screen name="Highlight" component={Highlight} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default MainRouter;
