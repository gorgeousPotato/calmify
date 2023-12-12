import {useState, useEffect} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { format, parseISO } from 'date-fns';
import * as moodsAPI from "../../utilities/moods-api";
import "./CalendarPage.css";

export default function CalendarPage({user}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodEntries, setMoodEntries] = useState([]);
  useEffect(function() {
    async function getMoods(user) {
      const moods = await moodsAPI.getMoodEntries(user);
      setMoodEntries(moods);
    }
    getMoods(user);
  }, []);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getMoodEmojiForDate = (date) => {
    const matchingEntry = moodEntries.find((entry) => parseISO(entry.createdAt, 'yyyy-MM-dd') === parseISO(date, 'yyyy-MM-dd'));
    return matchingEntry ? matchingEntry.mood : null;
  };
  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const moodEmoji = getMoodEmojiForDate(date);
      return (
        <div style={{ textAlign: 'center', fontSize: '1.2em' }}>
          {moodEmoji && <span role="img" aria-label="Mood Emoji">{moodEmoji}</span>}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="CalendarPage">
      <div>
        <Calendar 
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={renderTileContent}/>
      </div>
      
    </div>
  );
}