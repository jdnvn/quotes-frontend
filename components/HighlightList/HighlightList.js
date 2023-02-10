import { useContext, useEffect, useState } from 'react';
import { myHighlights } from "../../utils/api/highlights";
import HighlightListItem from "./HighlightListItem";
import { RefreshControl, ScrollView } from "react-native";
import { ListContext } from '../core/MainRouter';

const HighlightList = ({ route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { highlights, setHighlights } = useContext(ListContext);

  useEffect(() => {
    if (!highlights.length) getHighlights();
  }, []);

  const getHighlights = async () => {
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
      style={{ width: "100%" }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getHighlights}
          tintColor={"slateblue"}
          title={"getting yo quotes..."}
          titleColor={"mediumpurple"}
        />
      }
    >
      {highlights && (
        highlights.map((highlight) => (
          <HighlightListItem key={highlight.id} getHighlights={getHighlights} {...highlight} />
        ))
      )}
    </ScrollView>
  );
};

export default HighlightList;
