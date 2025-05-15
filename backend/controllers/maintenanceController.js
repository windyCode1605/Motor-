const promiseDb = require('../config/promiseDb');

exports.getAllMaintenance = async (req, res) => {
    try {
        const [results] = await promiseDb.query('SELECT * FROM maintenance WHERE job_title = "Nhân viên bảo trì"');
        res.json(results);
    }
    catch(err) {
        console.error(err);
        res.status(500).send('Lỗi truy vấn dữ liệu.');
    }
}