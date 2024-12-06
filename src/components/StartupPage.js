import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartupPage.css';

const StartupPage = () => {
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate a loading period (e.g., fetching data or assets)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500); // 0.5 seconds loading

        // Cleanup timer
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-animation">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <p>Preparing Your Experience...</p>
            </div>
        );
    }

    return (
        <div className="startup-page">
            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <h1 className="main-title">Master CS Exams with Ease!</h1>
                    <p className="tagline">Interactive question series to boost your success.</p>
                    <div className="cta-buttons">
                        <button onClick={() => navigate('/register')} className="btn-primary">Get Started</button>
                        <button onClick={() => navigate('/login')} className="btn-secondary">Login</button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default StartupPage;
