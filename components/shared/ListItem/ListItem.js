import { useTheme } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { useRef } from 'react';
import { Animated } from 'react-native';

const ListItem = ({ handleDelete, handleEdit, children }) => {
  const swipeableRef = useRef(null);
  const theme = useTheme();

  const closeSwipieThing = () => {
    swipeableRef.current.close();
  };

  const handleDeleteItem = () => {
    closeSwipieThing();
    handleDelete();
  };

  const handleEditItem = () => {
    closeSwipieThing();
    handleEdit();
  };

  const editAndDeleteActions = (_progress, _dragX) => (
    <>
      <RectButton
        style={{
          width: 50,
          backgroundColor: 'tomato',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
        onPress={handleDeleteItem}
      >
        <Animated.Text style={{ color: "white" }}>
          Delete
        </Animated.Text>
      </RectButton>
      <RectButton
        style={{
          width: 50,
          backgroundColor: theme.colors.inversePrimary,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
        onPress={handleEditItem}
      >
        <Animated.Text style={{ color: "white" }}>
          Edit
        </Animated.Text>
      </RectButton>
    </>
  );

  return (
    <Swipeable ref={swipeableRef} renderRightActions={editAndDeleteActions}>
      {children}
    </Swipeable>
  )
};

export default ListItem;
