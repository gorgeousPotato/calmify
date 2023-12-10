import "./NewMoodPage.css";
import {emotions} from "../../emotions"

export default function NewMoodPage() {
  
  const emotionsList = emotions.map(em => {
      return (
        <div className="emotion">
        <input type="radio" id={`mood-${em.n}`} name="mood" value={em.n} />
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
        <button type="submit">Choose</button>
      </form>
    </div>
  );
}