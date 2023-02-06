import { useEffect, useState } from 'react';
import { myHighlights } from "../../utils/api/highlights";
import HighlightListItem from "./HighlightListItem";
import { RefreshControl, ScrollView } from "react-native";

const HighlightList = ({ highlights, setHighlights }) => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!highlights.length) getMyHighlights();
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
      style={{ width: "100%" }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getMyHighlights}
          tintColor={"slateblue"}
          title={"getting yo quotes..."}
          titleColor={"mediumpurple"}
        />
      }
    >
      {highlights.map((highlight) => (
        <HighlightListItem key={highlight.id} {...highlight} />
      ))}
    </ScrollView>
  );
};

export default HighlightList;
