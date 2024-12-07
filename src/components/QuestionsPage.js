import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./QuestionsPage.css";

const QuestionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [subjectData, setSubjectData] = useState(null);
  const [expandedPart, setExpandedPart] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [showAnswerIndex, setShowAnswerIndex] = useState(null);
  const navigate = useNavigate();
  const { subject } = useParams();

  useEffect(() => {
    let timerInterval;

    const fetchSubjectData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `/api/questions/${subject}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Backend Response:", res.data);

        if (res.data.subscriptionActive) {
          setSubscriptionActive(true);
          setTimeLeft(0);
        } else if (res.data.remainingTime > 0) {
          setSubscriptionActive(false);
          setTimeLeft(res.data.remainingTime);

          timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
              if (prevTime <= 1000) {
                clearInterval(timerInterval);
                alert("Your trial has expired! Redirecting to subscription page.");
                navigate("/subscribe");
                return 0;
              }
              return prevTime - 1000;
            });
          }, 1000);
        } else {
          alert("Your trial has expired! Redirecting to subscription page.");
          navigate("/subscribe");
        }

        setSubjectData(res.data.subjectData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching subject data:", err.response || err.message);
        setLoading(false);
        navigate("/subscribe");
      }
    };

    fetchSubjectData();

    return () => clearInterval(timerInterval);
  }, [navigate, subject]);

  const fetchQuestions = async (chapter) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log(`Fetching questions for chapter: ${chapter}`);

      const res = await axios.get(
        `/api/questions/${encodeURIComponent(subject)}/${encodeURIComponent(chapter)}/questions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setQuestions(res.data);
      setExpandedChapter(chapter);
      setExpandedQuestionIndex(null);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching questions:", err.response || err.message);
      setLoading(false);
    }
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const togglePart = (part) => {
    setExpandedPart(expandedPart === part ? null : part);
    setExpandedChapter(null);
  };

  const toggleChapter = (chapter) => {
    if (expandedChapter === chapter) {
      setExpandedChapter(null);
      setQuestions([]);
    } else {
      fetchQuestions(chapter);
    }
  };

  const toggleQuestion = (index) => {
    setExpandedQuestionIndex(expandedQuestionIndex === index ? null : index);
    setShowAnswerIndex(null);
  };

  const toggleAnswer = (index) => {
    setShowAnswerIndex(showAnswerIndex === index ? null : index);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!subjectData) {
    return <p>Error: Subject data not available.</p>;
  }

  return (
    <div className="questions-page">
      <h2>{subject}</h2>

      {subscriptionActive ? (
        <p className="subscription-active">Your subscription is active. Enjoy unlimited access!</p>
      ) : (
        timeLeft > 0 && (
          <p className="trial-timer">Time left in your trial: {formatTime(timeLeft)}</p>
        )
      )}

      <div className="chapters-list">
        {Object.entries(subjectData).map(([partKey, part]) => (
          <div key={partKey} className="part">
            <div className="part-title" onClick={() => togglePart(partKey)}>
              {part.title}
            </div>
            {expandedPart === partKey && (
              <div className="chapters">
                {part.chapters.map((chapter, index) => (
                  <div key={index}>
                    <div className="chapter" onClick={() => toggleChapter(chapter)}>
                      {chapter}
                    </div>
                    {expandedChapter === chapter && (
                      <div className="questions">
                        {questions.length > 0 ? (
                          questions.map((q, idx) => (
                            <div key={q._id} className="question">
                              <p
                                className="truncated-question"
                                onClick={() => toggleQuestion(idx)}
                              >
                                <strong>Q{idx + 1}:</strong>{" "}
                                {expandedQuestionIndex === idx
                                  ? q.question
                                  : `${q.question.substring(0, 50)}...`}
                              </p>
                              {expandedQuestionIndex === idx && (
                                <div>
                                  <button
                                    className="view-answer-button"
                                    onClick={() => toggleAnswer(idx)}
                                  >
                                    {showAnswerIndex === idx ? "Hide Answer" : "View Answer"}
                                  </button>
                                  {showAnswerIndex === idx && (
                                    <p className="answer">
                                      <strong>Answer:</strong> {q.answer}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p>No questions available for this chapter.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;
