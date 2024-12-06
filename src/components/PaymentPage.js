import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentPage = () => {
    const [userId, setUserId] = useState(null);

    // Fetch userId from localStorage when the component mounts
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
            alert("User not logged in. Please log in to continue.");
            return;
        }
        setUserId(storedUserId);
    }, []);

    const handlePayment = async () => {
        if (!userId) {
            alert("User ID not found. Please log in again.");
            return;
        }

        try {
            const { data } = await axios.post('https://13.233.123.159:5000/api/payment/create-order', {
                amount: 500, // Amount in INR
                currency: 'INR',
            });

            const { orderId, amount, currency } = data;

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Razorpay Key ID
                amount: amount,
                currency: currency,
                name: "CS Exam Platform",
                description: "Subscription Payment",
                order_id: orderId,
                handler: async (response) => {
                    const paymentData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        userId, // Pass the user ID
                    };

                    try {
                        const verifyRes = await axios.post('https://api.acezy.site/api/payment/verify-payment', paymentData);

                        if (verifyRes.data.message === "Payment verified successfully") {
                            alert("Payment successful! Subscription activated.");
                            console.log("Subscription details:", verifyRes.data);
                            // Redirect or update UI
                        } else {
                            alert("Payment verification failed!");
                        }
                    } catch (verificationErr) {
                        console.error("Error verifying payment:", verificationErr);
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: "Your Name",
                    email: "your.email@example.com",
                    contact: "1234567890",
                },
                theme: {
                    color: "#F37254",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            console.error("Error during payment:", err);
            alert("Payment failed. Please try again later.");
        }
    };

    return (
        <div>
            <h2>Subscribe to CS Exam Platform</h2>
            <button
                onClick={handlePayment}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#0056b3",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Pay Rs. 500
            </button>
        </div>
    );
};

export default PaymentPage;
