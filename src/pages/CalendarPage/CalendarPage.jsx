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
  
  return (
    <div className="CalendarPage">
      <div>
        <Calendar />
      </div>
      {/* <div>
        <p>Selected Date: {parseISO(selectedDate, 'MMMM dd, yyyy')}</p>
      </div>
      <div>
        <h2>Mood Entries</h2>
        <ul>
          {moodEntries
            .filter((entry) => format(entry.createdAt, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
            .map((entry, index) => (
              <li key={index}>
                {format(entry.createdAt, 'MMMM dd, yyyy')}: {entry.emoji}
              </li>
            ))}
        </ul>
      </div> */}
    </div>
  );
}