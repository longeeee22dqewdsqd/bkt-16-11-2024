const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Tạo đặt chỗ mới
router.post('/book', async (req, res) => {
    const { customerName, date, time, status } = req.body; // Thêm status vào đây
    const newBooking = new Booking({ customerName, date, time, status }); // Lưu status
    await newBooking.save();
    res.redirect('/');
});

// Xem danh sách đặt chỗ
router.get('/', async (req, res) => {
    const bookings = await Booking.find();
    res.render('index', { bookings });
});

// Hiển thị form sửa đặt chỗ
router.get('/edit/:id', async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    res.render('edit', { booking });
});

// Cập nhật đặt chỗ
router.post('/edit/:id', async (req, res) => {
    const { customerName, date, time, status } = req.body; // Thêm status vào đây
    await Booking.findByIdAndUpdate(req.params.id, { customerName, date, time, status }); // Cập nhật status
    res.redirect('/');
});

// Hủy đặt chỗ
router.post('/cancel/:id', async (req, res) => {
    await Booking.findByIdAndUpdate(req.params.id, { status: 'Cancelled' });
    res.redirect('/');
});

// Xóa đặt chỗ
router.post('/delete/:id', async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

//kiểm tra lỗi trong quá trình edit
router.post('/edit/:id', async (req, res) => {
    try {
        const { customerName, date, time, status } = req.body; // Thêm status vào đây
        await Booking.findByIdAndUpdate(req.params.id, { customerName, date, time, status }); // Cập nhật status
        res.redirect('/');
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).send('Internal Server Error');
    }
});

//kiểm tra log update
router.post('/edit/:id', async (req, res) => {
    const { customerName, date, time, status } = req.body; // Thêm status vào đây
    console.log('Updating booking:', { customerName, date, time, status }); // Log giá trị
    await Booking.findByIdAndUpdate(req.params.id, { customerName, date, time, status }); // Cập nhật status
    res.redirect('/');
});

module.exports = router;