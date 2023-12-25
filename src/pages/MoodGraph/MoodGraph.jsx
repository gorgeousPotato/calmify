import {Line} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';


import "./MoodGraph.css"

export default function MoodGraph({moods}) {
  Chart.register(CategoryScale);
  const getMoodNumbersByDay = () => {
    const moodNumbersByDay = new Array(31).fill(0);

    moods.forEach((entry) => {
      const dayOfMonth = new Date(entry.date).getDate();
      moodNumbersByDay[dayOfMonth - 1] = entry.mood;
    });

    return moodNumbersByDay;
  };
  const data = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1).map(String), // Convert labels to strings
    datasets: [
      {
        label: 'Mood Numbers',
        data: getMoodNumbersByDay(),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        cubicInterpolationMode: 'monotone',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category', // Set the x-axis scale type to 'category'
        labels: Array.from({ length: 31 }, (_, i) => i + 1).map(String), // Convert labels to strings
      },
      y: {
        min: -5,
        max: 5,
        beginAtZero: true,
      },
    },
    
  };

  return (
    <div className='MoodGraph'>
      <Line data={data} options={options}/>;
    </div>
  );
}