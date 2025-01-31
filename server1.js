const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Razorpay instance
const razorpay = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
    key_secret: 'YOUR_RAZORPAY_KEY_SECRET', // Replace with your Razorpay Key Secret
});

// API endpoint to create an order
app.post('/create-order', async (req, res) => {
    const { amount, currency } = req.body; // Amount in the smallest currency unit (e.g., 500 for ₹5.00)

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert to paise (smallest unit in INR)
            currency: currency || 'INR', // Default currency is INR
            receipt: `receipt_${Math.random() * 1000}`, // Generate a unique receipt ID
        });

        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start server
app.listen(5000, () => console.log('Server is running on http://localhost:5000'));
