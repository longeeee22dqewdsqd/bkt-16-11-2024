const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Chuỗi kết nối MongoDB
const MONGODB_URI = 'mongodb+srv://hoanglong:28012002@cv.juiw1.mongodb.net/?retryWrites=true&w=majority&appName=cv'; // Thay thế bằng chuỗi kết nối của bạn

// Kết nối đến MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Kết nối đến MongoDB thành công!');
    })
    .catch(err => {
        console.error('Kết nối đến MongoDB thất bại:', err);
    });


// Thiết lập middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Sử dụng định tuyến
app.use('/', bookingRoutes);

// Chạy ứng dụng
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});