import { useEffect, useState } from 'react';
import { myHighlights } from "../../utils/api/highlights";
import HighlightListItem from "./HighlightListItem";
import { RefreshControl, ScrollView } from "react-native";

const HighlightList = () => {
  const [highlights, setHighlights] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMyHighlights();
  }, []);

  const getMyHighlights = async () => {
    setRefreshing(true);
    try {
      const response = await myHighlights();
      setHighlights(response);
    } catch (error) {
    }
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={{ width: '100%' }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getMyHighlights} />}
    >
      {highlights.map((highlight) => (
        <HighlightListItem
          key={highlight['id']}
          id={highlight['id']}
          text={highlight['text']}
          page={highlight['page']}
          location={highlight['location']}
          highlightedAt={highlight['highlighted_at']}
          bookId={highlight['book_id']}
        />
      ))}
    </ScrollView>
  );
};

export default HighlightList;
