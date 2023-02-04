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

  const createHighlight = () => {
    axios.post(`${baseUrl}/highlights`, { text: "hi", page: 1, location: 2, highlighted_at: 'Fri, 06 Jan 2023 22:44:35.143300000 UTC +00:00' }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  };

  return (
    <ScrollView>
      {highlights.map((highlight) => <HighlightListItem key={highlight['id']} text={highlight['text']} page={highlight['page']} location={highlight['location']} highlightedAt={highlight['highlighted_at']} bookId={highlight['book_id']} />)}
    </ScrollView>
  );
};

export default HighlightList;
