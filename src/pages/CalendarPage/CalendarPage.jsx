import {useState, useEffect} from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import Modal from 'react-modal';
import * as moodsAPI from "../../utilities/moods-api";
import "./CalendarPage.css";

export default function CalendarPage({user}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodEntries, setMoodEntries] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  useEffect(function() {
    async function getMoods(user) {
      const moods = await moodsAPI.getMoodEntries(user);
      setMoodEntries(moods);
    }
    getMoods(user);
  }, []);
  const getMoodEmojiForDate = (date) => {
    const matchingEntry = moodEntries.find((entry) => format(new Date(entry.createdAt), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
    return matchingEntry ? matchingEntry.emoji : null;
  };
  const openModal = (mood) => {
    setSelectedMood(mood);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMood(null);
    setModalIsOpen(false);
  };
  const renderCalendar = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div>
        <div>
          <span>{format(monthStart, 'MMMM yyyy')}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {weekdays.map((weekday) => (
            <div key={weekday} style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {weekday}
            </div>
          ))}
          {daysInMonth.map((date) => (
            <div
              key={date.toISOString()}
              style={{
                padding: '8px',
                textAlign: 'center',
                background: date.getMonth() !== selectedDate.getMonth() ? '#eee' : '#fff',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() => openModal(getMoodEmojiForDate(date))}
            >
              <div>{format(date, 'd')}</div>
              <span role="img" aria-label="Mood Emoji">
                {getMoodEmojiForDate(date)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>{renderCalendar()}</div>
    </div>
  );
};




