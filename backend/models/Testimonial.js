const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String },
    message: { type: String, required: true },
    isApproved: { type: Boolean, default: false }, // Bạn có thể duyệt trước khi hiện lên
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
