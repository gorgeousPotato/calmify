import './App.css';
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import { getUser } from "../../utilities/users-service"
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import NewMoodPage from "../NewMoodPage/NewMoodPage";
import MoodsPage from "../MoodsPage/MoodsPage";
import CalendarPage from '../CalendarPage/CalendarPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      { user ? 
      <>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/moods/new" element={<NewMoodPage />}/>
          <Route path="/moods" element={<MoodsPage />}/>
          <Route path="/calendar" element={<CalendarPage />}/>
          <Route path="/*" element={<Navigate to="/moods/new" />} />
        </Routes>
      </>
          
          :
          <AuthPage setUser={ setUser }/>
      }
    </main>
  );
}


