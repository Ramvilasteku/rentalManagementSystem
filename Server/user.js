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

app.get('/', (req, res) => {
	const sql = `SELECT * FROM users`;
	db.query(sql, (err, result) => {
		if (err)
			return res.status(500).json({ message: 'error Occured' })
		return res.json(result);
	})
})

app.post('/', (req, res) => {
	const { username, useremail, usermobileno, userpassword, usernoofunits } = req.body;
	const query = `INSERT INTO users(username,useremail,usermobileno,userpassword,usernoofunits) VALUES (?, ?, ?, ?, ?);`
	db.query(query, [username, useremail, usermobileno, userpassword, usernoofunits], (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'error Occured' })
		}
		res.status(200).json({ status: "success", message: "new user added" })
	})
})

app.put('/', (req, res) => {
	const {username, id} = req.body;
	// const id = req.params.id;
	const query = `UPDATE  users SET username = ? WHERE id = ?`
	db.query(query, [username, id ], (err, result) => {
		if (err) return res.status(500).json({ message: "Error Occured" })
		return res.status(200).json({ status: "success", message: "new user added" })
	})
})

app.put('/', (req, res) => {
	const {username, id} = req.body;
	// const id = req.params.id;
	const query = `UPDATE  users SET username = ? WHERE id = ?`
	db.query(query, [username, id ], (err, result) => {
		if (err) return res.status(500).json({ message: "Error Occured" })
		return res.status(200).json({ status: "success", message: "new user added" })
	})
})



app.delete('/', (req, res) => {
	const {id} = req.body;
	const query = `DELETE FROM users WHERE id = ?`
	db.query(query, [ id ], (err, result) => {
		if (err) return res.status(500).json({ message: "Error Occured" })
		return res.status(200).json({ status: "success", message: "new user added" })
	})
})



app.listen(5000, () => {
	console.log("server stated at 5000 port");
})