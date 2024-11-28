import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import LogoImg from "./image.png"

const ExerciseSearch = ({ addExercise }) => {
  const [bodyPart, setBodyPart] = useState("");
  const [level, setLevel] = useState("");
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workoutDay, setWorkoutDay] = useState("");

  const fetchExercises = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/search/", {
        params: {
          BodyPart: bodyPart,
          Level: level,
        },
      });
      setExercises(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setError("Failed to fetch exercises");
      setExercises([]);
    }
  };

  const openModal = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedExercise(null);
    setShowModal(false);
    setWorkoutDay("");
  };

  const addToWorkout = () => {
    if (selectedExercise && workoutDay) {
      addExercise(workoutDay, selectedExercise);
      closeModal(); 
    }
  };

  return (
    <div className="exercise-search">
      {}
      <div className="logo-container">
        <img
          src={LogoImg} 
          alt="Logo"
          className="logo"
        />
      </div>

      <h1>Search Gym Exercises</h1>

      {}
      <div className="input-group">
        <label htmlFor="bodyPart">Body Part:</label>
        <select
          id="bodyPart"
          value={bodyPart}
          onChange={(e) => setBodyPart(e.target.value)}
        >
          <option value="">Select a body part</option>
          <option value="Abdominals">Abdominals</option>
          <option value="Adductors">Adductors</option>
          <option value="Abductors">Abductors</option>
          <option value="Biceps">Biceps</option>
          <option value="Calves">Calves</option>
          <option value="Chest">Chest</option>
          <option value="Forearms">Forearms</option>
          <option value="Glutes">Glutes</option>
          <option value="Hamstrings">Hamstrings</option>
          <option value="Lats">Lats</option>
          <option value="Lower Back">Lower Back</option>
          <option value="Middle Back">Middle Back</option>
          <option value="Traps">Traps</option>
          <option value="Neck">Neck</option>
          <option value="Quadriceps">Quadriceps</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Triceps">Triceps</option>
        </select>
      </div>

      {}
      <div className="input-group">
        <label htmlFor="level">Level:</label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="">Select a level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      {}
      <button className="search-button" onClick={fetchExercises}>
        Search
      </button>

      {}
      {error && <p className="error-message">{error}</p>}

      {}
      <div className="results">
        <h2>Exercises</h2>
        {exercises.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Body Part</th>
                <th>Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise, index) => (
                <tr key={index}>
                  <td>{exercise.title}</td>
                  <td>{exercise.body_part}</td>
                  <td>{exercise.level}</td>
                  <td>
                    <button onClick={() => openModal(exercise)}>+</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No exercises found</p>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add {selectedExercise.title} to Workout</h3>
            <select
              value={workoutDay}
              onChange={(e) => setWorkoutDay(e.target.value)}
            >
              <option value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <div className="modal-actions">
              <button onClick={addToWorkout}>Add</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseSearch;
