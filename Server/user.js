const express = require('express');
const sql = require("mysql2");

const app = express();


// database integration

const db = sql.createConnection({
	host: "localhost",
	user: "root",
	password: "9812",
	database: "rental",
	waitForConnections: true
})

app.use(express.json());

app.get('/users', (req, res) => {
	const sql = `SELECT * FROM users`;
	db.query(sql, (err, result) => {
		if (err)
			return res.status(500).json({ message: 'error Occured' })
		return res.json(result);
	})
})

app.post('/users', (req, res) => {
	const { userName, userMail, userPassword, userPhoneNumber, noOfUnits } = req.body;
	const query = `INSERT INTO users (userName, userMail, userPassword, userPhoneNumber, noOfUnits) VALUES (?, ?, ?, ?, ?)`;
	db.query(query, [userName, userMail, userPassword, userPhoneNumber, noOfUnits], (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'error Occured',err })
		}
		res.status(200).json({ status: "success", message: "new user added" })
	})
})

app.put('/users', (req, res) => {
	const { userName, userMail, userPassword, userPhoneNumber, noOfUnits, userId } = req.body;
	// const id = req.params.id;
	const query = `  UPDATE users SET userName = ?, userMail = ?, userPassword = ?, userPhoneNumber = ?, noOfUnits = ? WHERE userId = ?`
	db.query(query, [userName, userMail, userPassword, userPhoneNumber, noOfUnits, userId], (err, result) => {
		if (err) return res.status(500).json({ message: "Error Occured" })
		return res.status(200).json({ status: "success", message: "new user added" })
	})
})




app.delete('/users', (req, res) => {
	const { userId } = req.body;
	const query = `DELETE FROM users WHERE userId = ?`
	db.query(query, [userId], (err, result) => {
		if (err) return res.status(500).json({ message: "Error Occured" })
		return res.status(200).json({ status: "success", message: "new user added" })
	})
})



app.listen(5000, () => {
	console.log("server stated at 5000 port");
})