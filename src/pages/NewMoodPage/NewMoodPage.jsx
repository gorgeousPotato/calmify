import { useState } from "react";
import "./NewMoodPage.css";
import {emotions} from "../../emotions"

export default function NewMoodPage() {
  const [mood, setMood] = useState('');
  function handleMoodChange(e) {
    setMood({
      n: e.target.value,
    })
  }
  const emotionsList = emotions.map(em => {
      return (
        <div className="emotion">
        <input type="radio" id={`mood-${em.n}`} name="mood" value={em.n} onChange={handleMoodChange}/>
        <label for={`mood-${em.n}`}>
          <p>{em.emoji}</p>
          <p>{em.title}</p>
          <p>{em.descr}</p>
        </label>
      </div>
      );
  })
  function handleSubmit(e) {
    e.preventDefault();
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