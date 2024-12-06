import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import SubjectSelection from './components/SubjectSelection';
import QuestionsPage from './components/QuestionsPage';
import SubscriptionPage from './components/SubscriptionPage';
import AddQuestionForm from './components/AddQuestionForm'; // Admin form
import PaymentPage from './components/PaymentPage'; // Import PaymentPage
import StartupPage from './components/StartupPage'; // Import StartupPage

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<StartupPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/subjects" element={<SubjectSelection />} />
                <Route path="/questions/:subject" element={<QuestionsPage />} />
                <Route path="/questions/:subject" element={<QuestionsPage />} />
                <Route path="/subscribe" element={<SubscriptionPage />} />
                <Route path="/admin/add-question" element={<AddQuestionForm />} />
                <Route path="/payment" element={<PaymentPage />} /> {/* Payment route */}
            </Routes>
        </Router>
    );
}

export default App;
