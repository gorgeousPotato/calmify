import {useState, useEffect} from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import Modal from 'react-modal';
import MoodGraph from "../MoodGraph/MoodGraph";
import * as moodsAPI from "../../utilities/moods-api";
import "./CalendarPage.css";
import { useNavigate } from "react-router-dom";

export default function CalendarPage({user}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateForAddingMood, setDateForAddingMood] = useState(null);
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
    const matchingEntry = moodEntries.find((entry) => format(new Date(entry.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
    return matchingEntry ? matchingEntry.emoji : null;
  };
  const getMoodIdForDate = (date) => {
    const matchingEntry = moodEntries.find((entry) => format(new Date(entry.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
    return matchingEntry ? matchingEntry._id : null;
  }
  const openModal = (date) => {
    const matchingEntry = moodEntries.find((entry) => format(new Date(entry.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
    matchingEntry ? setSelectedMood(matchingEntry) : setSelectedMood(null);
    setModalIsOpen(true);
    setDateForAddingMood(date.toISOString());
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
            <div key={weekday} style={{ textAlign: 'center', fontWeight: 'bold' }} >
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
              onClick={() => openModal(date)}
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
  const navigate = useNavigate();
  function handleAddMood(date) {
    navigate(`/moods/${date}/add`)
  }
  return (
    <div>
      <div>{renderCalendar()}</div>
      <div><MoodGraph moods={moodEntries}/></div>
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          },
          content: {
            width: '400px', // Set the width of the modal
            height: '300px', // Set the height of the modal
            margin: 'auto', // Center the modal horizontally
            position: 'absolute',
            top: '50%', // Center the modal vertically
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        {selectedMood ? (
          <div>
            <h2>{selectedMood.title}</h2>
            <p>{selectedMood.description}</p>
            <p>Comment: {selectedMood.comment}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        ) : (
          <div>
            <h2>no entries</h2>
            <button onClick={() => handleAddMood(dateForAddingMood)}>Add mood</button>
          </div>
        )}
      </Modal>
    </div>
  );
};




