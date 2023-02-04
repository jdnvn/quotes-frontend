import { View } from 'react-native';
import HighlightList from '../HighlightList/HighlightList';

const Home = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <HighlightList />
    </View>
  )
};

export default Home;
