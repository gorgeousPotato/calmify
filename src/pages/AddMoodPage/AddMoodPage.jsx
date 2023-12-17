import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "./AddMoodPage.css";
import {emotions} from "../../emotions";
import * as moodsAPI from "../../utilities/moods-api";

export default function NewMoodPage() {
  const [mood, setMood] = useState('');
  const [comment, setComment] = useState('');
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
  function handleComment(e) {
    setComment(e.target.value);
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
    newMood.comment=comment;
    await moodsAPI.addMood(newMood);
    navigate('/moods');
  }

  // const { dateParam } = useParams();
  // const date = new Date(dateParam);
  // const formattedDate = date.toISOString();
  return (
    <div className="NewMoodPage">
      <h1>How do you feel on </h1>
      <form onSubmit={handleSubmit}>
        {emotionsList}
        <textarea value={comment} onChange={handleComment} rows="4" cols="50" placeholder="add a comment"/>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}