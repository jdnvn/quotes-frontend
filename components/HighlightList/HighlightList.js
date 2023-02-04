import axios from "axios";
import { useEffect, useState } from 'react';
import { myHighlights } from "../../utils/api/highlights";
import { baseUrl } from "../../utils/constants";
import HighlightListItem from "./HighlightListItem";
import { ScrollView } from "react-native";

const HighlightList = () => {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const getMyHighlights = async () => {
      try {
        const response = await myHighlights();
        setHighlights(response);
      } catch (error) {
      }
    };
    getMyHighlights();
  }, []);

  return (
    <ScrollView style={{ width: '100%' }}>
      {highlights.map((highlight) => <HighlightListItem key={highlight['id']} text={highlight['text']} page={highlight['page']} location={highlight['location']} highlightedAt={highlight['highlighted_at']} bookId={highlight['book_id']} />)}
    </ScrollView>
  );
};

export default HighlightList;
