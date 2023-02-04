import Home from "../screens/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();

const MainRouter = () => {
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default MainRouter;
