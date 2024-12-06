import React, { useState } from 'react';
import axios from 'axios';
import './AddQuestionForm.css';

const AddQuestionForm = () => {
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Subject and Chapter Data
  const subjects = {
    'Company Law': [
      'Introduction to Company Law',
      'Legal Status and Types of Registered Companies',
      'Memorandum and Articles of Association and its Alteration',
      'Shares and Share Capital - Concepts',
      'Members and Shareholders',
      'Debt Instruments - Concepts',
      'Charges',
      'Distribution of Profits',
      'Accounts and Auditors',
      'Compromise, Arrangement and Amalgamations - Concepts',
      'Dormant Company',
      'Inspection, Inquiry and Investigation',
    ],
    SUBIL: [
      'Selection of Business Organization',
      'Corporate Entities – Companies',
      'Limited Liability Partnership',
      'Startups and its Registration',
      'Micro, Small and Medium Enterprises',
      'Conversion of Business Entities',
      'Non-Corporate Entities',
      'Financial Services Organisation',
      'Business Collaborations',
      'Setting up of Branch Office/ Liaison Office/ Wholly Owned Subsidiary by Foreign Company',
      'Setting up of Business outside India and Issues Relating thereto',
      'Identifying laws applicable to various Industries and their initial compliances',
      'Various Initial Registrations and Licenses',
    ],
    JIGL: [
      'Sources of Law',
      'Constitution of India',
      'Interpretation of Statutes',
      'Administrative Laws',
      'Law of Torts',
      'Law relating to Civil Procedure',
      'Laws relating to Crime and its Procedure',
      'Law relating to Evidence',
      'Law relating to Specific Relief',
      'Law relating to Limitation',
      'Law relating to Arbitration, Mediation, and Conciliation',
      'Indian Stamp Law',
      'Law relating to Registration of Documents',
      'Right to Information Law',
      'Law relating to Information Technology',
      'Contract Law',
      'Law relating to Sale of Goods',
      'Law relating to Negotiable Instruments',
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !chapter || !question || !answer) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const res = await axios.post(
        `https://api.acezy.site/api/questions/${subject}/${chapter}/add-question`,
        { question, answer },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Question added successfully!');
      setSubject('');
      setChapter('');
      setQuestion('');
      setAnswer('');
    } catch (err) {
      console.error('Error adding question:', err.response || err.message);
      alert('Error adding question. Please try again.');
    }
  };

  return (
    <div className="add-question-container">
      <div className="add-question-card">
        <h2 className="neon-title">Add Question</h2>
        <form className="add-question-form" onSubmit={handleSubmit}>
          <select
            className="neon-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Subject
            </option>
            {Object.keys(subjects).map((subj, index) => (
              <option key={index} value={subj}>
                {subj}
              </option>
            ))}
          </select>

          <select
            className="neon-input"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            disabled={!subject}
            required
          >
            <option value="" disabled>
              Select Chapter
            </option>
            {subject &&
              subjects[subject].map((chap, index) => (
                <option key={index} value={chap}>
                  {chap}
                </option>
              ))}
          </select>

          <textarea
            className="neon-textarea"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          ></textarea>

          <textarea
            className="neon-textarea"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="neon-button">
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestionForm;
