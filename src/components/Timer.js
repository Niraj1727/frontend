import React, { useEffect, useState } from 'react';

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        // Get trial start time and calculate the remaining time
        const trialStartTime = new Date(localStorage.getItem('trialStartTime'));
        const trialDuration = 60 * 60 * 1000; // 1 hour in milliseconds
        const trialEndTime = trialStartTime.getTime() + trialDuration;

        const updateTimer = () => {
            const now = new Date().getTime();
            const remainingTime = trialEndTime - now;

            if (remainingTime > 0) {
                setTimeLeft(remainingTime);
            } else {
                setTimeLeft(0);
                alert('Your trial has expired! Please subscribe to continue.');
            }
        };

        const timerInterval = setInterval(updateTimer, 1000);

        return () => clearInterval(timerInterval); // Cleanup on unmount
    }, []);

    // Convert milliseconds to hours, minutes, and seconds
    const formatTime = (ms) => {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div>
            {timeLeft > 0 ? (
                <p>Time left in your trial: {formatTime(timeLeft)}</p>
            ) : (
                <p>Your trial has expired.</p>
            )}
        </div>
    );
};

export default Timer;
