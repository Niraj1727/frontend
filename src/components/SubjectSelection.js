import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubjectSelection.css';

const SubjectSelection = () => {
  const navigate = useNavigate();

  const handleSubjectClick = (subject) => {
    navigate(`/questions/${encodeURIComponent(subject)}`); // Pass the subject in the route
  };

  return (
    <div className="subject-selection-container">
      <div className="subject-selection-card">
        <h2 className="subject-selection-title">Choose Your Subject</h2>
        <div className="subject-selection-buttons">
          <button
            className="subject-selection-button"
            onClick={() => handleSubjectClick('Company Law')}
          >
            Company Law
          </button>
          <button
            className="subject-selection-button"
            onClick={() => handleSubjectClick('JIGL')}
          >
            Tax Laws
          </button>
          <button
            className="subject-selection-button"
            onClick={() => handleSubjectClick('SUBIL')}
          >
            Other Subjects
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;
