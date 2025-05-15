const db = require('../config/db');

exports.getReceptionists = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM receptionist');
        res.json(rows);
    } catch (error) {
        console.error("Lỗi lấy dữ liệu receptionist : ", error);
        res.status(500).json({message: 'server error?'});
    }
} 