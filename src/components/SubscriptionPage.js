import React from 'react';

const SubscriptionPage = () => {
    return (
        <div>
            <h2>Your free trial has expired</h2>
            <p>Subscribe now to continue accessing the platform.</p>
            <button onClick={() => alert('Payment gateway coming soon!')}>Subscribe Now</button>
        </div>
    );
};

export default SubscriptionPage;
