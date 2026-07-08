require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Testimonial = require('./models/Testimonial');
const Contact = require('./models/Contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Kết nối MongoDB thành công!'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// --- API 1: Gửi Liên Hệ (Lưu MongoDB & Gửi mail dự phòng) ---
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // 1. Lưu vào MongoDB trước để tránh mất dữ liệu
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // 2. Gửi mail thông báo nếu cấu hình EMAIL_USER và EMAIL_PASS tồn tại
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: email,
                to: process.env.EMAIL_USER,
                subject: `📩 Portfolio: Tin nhắn mới từ ${name}`,
                text: `Người gửi: ${name}\nEmail: ${email}\nNội dung: ${message}`
            };

            // Gửi email bất đồng bộ (background task) để không chặn response
            transporter.sendMail(mailOptions).catch(err => {
                console.error('⚠️ Lỗi gửi mail (nhưng tin nhắn đã được lưu vào DB):', err.message);
            });
        }

        res.status(200).json({ message: 'Tin nhắn đã được gửi thành công!' });
    } catch (error) {
        console.error('❌ Lỗi xử lý liên hệ:', error);
        res.status(500).json({ error: 'Không thể gửi tin nhắn ngay lúc này.' });
    }
});

// --- API 2: Lấy danh sách Đánh Giá (Chỉ những cái đã duyệt) ---
app.get('/api/testimonials', async (req, res) => {
    try {
        const list = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi lấy dữ liệu.' });
    }
});

// --- API 3: Gửi Đánh Giá Mới ---
app.post('/api/testimonials', async (req, res) => {
    try {
        const newFeedback = new Testimonial(req.body);
        await newFeedback.save();
        res.status(201).json({ message: 'Cảm ơn bạn! Đánh giá đang chờ được duyệt.' });
    } catch (error) {
        res.status(400).json({ error: 'Dữ liệu không hợp lệ.' });
    }
});

// --- API 4: Lấy danh sách Liên Hệ (Dành cho Admin check) ---
app.get('/api/admin/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi lấy danh sách liên hệ.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
