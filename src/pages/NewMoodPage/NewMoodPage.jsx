import "./NewMoodPage.css"

export default function NewMoodPage() {
  const emotions = [
    {
      n: -5,
      emoji: "😭",
      title: "Extremely negative",
      descr: "Overwhelmed by intense feelings of despair, hopelessness, and profound sadness.",
    },
    {
      n: -4,
      emoji: "😞",
      title: "VeryNegative",
      descr: "Feeling deep dissatisfaction and distress, with emotions leaning towards negativity.",
    },
    {
      n: -3,
      emoji: "😔",
      title: "Slightly negative",
      descr: "Experiencing subtle negative emotions and a sense of unease.",
    },
    {
      n: -2,
      emoji: "😕",
      title: "Somewhat negative",
      descr: "Feeling a bit down and not particularly positive.",
    },
    {
      n: -1,
      emoji: "😐",
      title: "Slightly negative",
      descr: "A subtle shift towards negativity, but not significantly affecting.",
    },
    {
      n: 0,
      emoji: "🙂",
      title: "Neutral",
      descr: "Neither positive nor negative. Feeling emotionally stable and balanced.",
    },
    {
      n: 1,
      emoji: "☺️",
      title: "Somewhat positive",
      descr: "A subtle boost in mood, with a hint of positivity.",
    },
    {
      n: 2,
      emoji: "😊",
      title: "Slightly positive",
      descr: "Experiencing mild positive emotions like contentment and satisfaction.",
    },
    {
      n: 3,
      emoji: "😀",
      title: "Positive",
      descr: "Feeling positively calm and content, with a good overall mood.",
    },
    {
      n: 4,
      emoji: "😄",
      title: "Very positive",
      descr: "Experiencing strong positive emotions and a sense of joy.",
    },
    {
      n: 5,
      emoji: "🤩",
      title: "Extremely positive",
      descr: "Overwhelmed by intense feelings of joy, euphoria, and happiness.",
    },
  ]
  const emotionsList = emotions.map(em => {
      <div>
        <p>{em.emoji}</p>
        <p>{em.title}</p>
        <p>{em.descr}</p>
      </div>
  })
  return (
    <div>
      <h1>How do you feel today?</h1>
      {emotionsList}
    </div>
  );
}