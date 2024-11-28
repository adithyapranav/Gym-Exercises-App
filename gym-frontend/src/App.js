import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExerciseSearch from "./ElasticSearch";
import ProfilePage from "./Profile";
import "./App.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Centralized state for weekly exercises
  const [weeklyExercises, setWeeklyExercises] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  // Add an exercise to a specific day
  const addExercise = (day, exercise) => {
    setWeeklyExercises((prev) => ({
      ...prev,
      [day]: [...prev[day], exercise],
    }));
  };

  // Remove an exercise from a specific day
  const removeExercise = (day, index) => {
    setWeeklyExercises((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  return (
    <Router>
      <div className="app">
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <button
            className="close-sidebar"
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>
          <nav>
            <Link to="/">Search Exercises</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        </div>
        <div className="content">
          {/* Only show the sidebar toggle button if the sidebar is closed */}
          {!isSidebarOpen && (
            <button
              className="open-sidebar"
              onClick={() => setIsSidebarOpen(true)}
            >
              &#x2026; {/* Three dots */}
            </button>
          )}
          <Routes>
            <Route
              path="/"
              element={<ExerciseSearch addExercise={addExercise} />}
            />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  weeklyExercises={weeklyExercises}
                  removeExercise={removeExercise}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
