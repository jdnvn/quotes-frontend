import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import HighlightList from '../HighlightList/HighlightList';
import * as Notifications from 'expo-notifications';
import { SegmentedButtons, useTheme } from 'react-native-paper';
import BookList from '../BookList/BookList';
import { FloatingAction } from "react-native-floating-action";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

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

const Home = ({ navigation }) => {
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [selected, setSelected] = useState("highlight");
  const [highlights, setHighlights] = useState([]);
  const [books, setBooks] = useState([]);
  const theme = useTheme();

  const floatingButtonActions = [
    {
      text: "Book",
      icon: <AntDesign name="book" size={24} color="white" />,
      name: "New Book",
      color: theme.colors.secondary,
      position: 2
    },
    {
      text: "Highlight",
      icon: <FontAwesome5 name="highlighter" size={20} color="white" />,
      name: "New Highlight",
      color: theme.colors.secondary,
      position: 1
    }
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
        <HighlightList highlights={highlights} setHighlights={setHighlights} />
      ) : (
        <BookList books={books} setBooks={setBooks} />
      )}
      <FloatingAction
        actions={floatingButtonActions}
        onPressItem={name => navigation.navigate(name)}
        color={theme.colors.primary}
        shadow={{
          shadowOpacity: 0,
          shadowColor: "#FF4B4B"
        }}
      />
    </View>
  )
};

export default Home;
