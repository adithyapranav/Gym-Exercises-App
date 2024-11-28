import React, { useState, useEffect } from "react";
import profileImage from "./img.png";

const Profile = ({ weeklyExercises, removeExercise }) => {
  const [userName] = useState("Adithya Mahesh");

  useEffect(() => {
    const fetchUserData = () => {
      const userExercises = {
        Monday: [
          { title: "Push-ups", body_part: "Chest", level: "Beginner" },
          { title: "Pull-ups", body_part: "Back", level: "Intermediate" },
        ],
        Wednesday: [{ title: "Squats", body_part: "Legs", level: "Advanced" }],
      };
    };
    fetchUserData();
  }, []);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="user-info">
        <img
          src={profileImage}
          alt="User Avatar"
          className="user-avatar"
        />
        <h2>{userName}</h2>
      </div>
      <div className="weekly-exercises">
        <h3>Your Weekly Exercises</h3>

        {}
        {Object.keys(weeklyExercises).map((day) => (
          <div key={day} className="exercise-day">
            <h4>{day}</h4>
            <table>
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Muscle Group</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {weeklyExercises[day].map((exercise, index) => (
                  <tr key={index}>
                    <td>{exercise.title}</td>
                    <td>{exercise.body_part}</td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => removeExercise(day, index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
