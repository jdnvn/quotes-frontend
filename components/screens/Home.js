import { useEffect, useRef, useState, createContext } from 'react';
import { View } from 'react-native';
import HighlightList from '../HighlightList/HighlightList';
import * as Notifications from 'expo-notifications';
import { FAB, SegmentedButtons } from 'react-native-paper';
import BookList from '../BookList/BookList';

const segmentedButtons = [
  {
    value: 'highlight',
    label: 'Highlights',
  },
  {
    value: 'book',
    label: 'Books',
  },
];

const Home = ({ navigation, route }) => {
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [selected, setSelected] = useState("highlight");

  const [menuOpen, setMenuOpen] = useState(false);

  const floatingButtonActions = [
    {
      icon: "book",
      label: "Book",
      onPress: () => navigation.navigate("New Book", { new: true }),
    },
    {
      icon: "marker",
      label: "Highlight",
      onPress: () => navigation.navigate("New Highlight", { new: true }),
    },
  ];

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      navigation.navigate('Highlight', response.notification.request.content.data)
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SegmentedButtons
        value={selected}
        onValueChange={setSelected}
        buttons={segmentedButtons}
        style={{ marginVertical: 10 }}
      />

      {selected === "highlight" ? (
        <HighlightList />
      ) : (
        <BookList />
      )}

      <FAB.Group
        open={menuOpen}
        visible
        icon={menuOpen ? 'close' : 'plus'}
        actions={floatingButtonActions}
        onStateChange={({open}) => setMenuOpen(open)}
        onPress={() => setMenuOpen(!menuOpen)}
      />
    </View>
  )
};

export default Home;
