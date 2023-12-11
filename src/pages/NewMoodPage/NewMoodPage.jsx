import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewMoodPage.css";
import {emotions} from "../../emotions";
import * as moodsAPI from "../../utilities/moods-api";

export default function NewMoodPage() {
  const [mood, setMood] = useState('');
  const navigate = useNavigate();
  function handleMoodChange(e) {
    const currEmotion = emotions.find((em) => (em.title === e.target.value));
    setMood({
      mood: currEmotion.n,
      emoji: currEmotion.emoji,
      title: currEmotion.title,
      description: currEmotion.descr,
    })
  }
  const emotionsList = emotions.map(em => {
      return (
        <div className="emotion">
        <input type="radio" id={`mood-${em.n}`} name="mood" value={em.title} onChange={(e) => handleMoodChange(e)}/>
        <label for={`mood-${em.n}`}>
          <p>{em.emoji}</p>
          <p>{em.title}</p>
          <p>{em.descr}</p>
        </label>
      </div>
      );
  })
  async function handleSubmit(e) {
    e.preventDefault();
    const newMood = mood;
    await moodsAPI.addMood(data);
    // navigate('/calendar')
  }
  return (
    <div className="NewMoodPage">
      <h1>How do you feel today?</h1>
      <form onSubmit={handleSubmit}>
        {emotionsList}
        <button type="submit">Next</button>
      </form>
    </div>
  );
}