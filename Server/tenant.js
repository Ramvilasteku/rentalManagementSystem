const express = require("express");
const sql = require('mysql2');

const app = express();

const db = sql.createConnection({
	host: "localhost",
	user: "root",
	password: "9812",
	database: "rental",
	waitForConnections: true
})

app.use(express.json());


app.get('/tenants', (req, res) => {
	const sql = `SELECT * FROM tenant`;
	db.query(sql, (err, result) => {
		if (err)
			return res.status(500).json({ message: 'error Occured' })
		return res.json(result);
	})
})


app.post('/tenants', (req, res) => {
	const { tenantName, tenantMail, tenantPhoneNo, unitNumber, noofUnit, tenantRentAmount, tenantSecurityDeposit, tenantStartDate, tenantEndDate } = req.body;
	const query = `INSERT INTO tenant( tenantName, tenantMail, tenantPhoneNo,unitNumber, noofUnit, tenantRentAmount,tenantSecurityDeposit, tenantStartDate, tenantEndDate) VALUES (?,?,?,?,?,?,?,?,?)`;
	db.query(query, [tenantName, tenantMail, tenantPhoneNo, unitNumber, noofUnit, tenantRentAmount, tenantSecurityDeposit, tenantStartDate, tenantEndDate], (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'error Occured' })
		}
		res.status(200).json({ status: "success", message: "new user added" })
	})
})


app.put('/tenants', (req, res) => {
	const { tenantName, tenantMail, tenantPhoneNo, unitNumber, noofUnit, tenantRentAmount, tenantSecurityDeposit, tenantStartDate, tenantEndDate, tenantId } = req.body;
	const query = `
    UPDATE tenant
    SET tenantName = ? , tenantMail = ?, tenantPhoneNo = ?, unitNumber = ?,
        noofUnit = ?, tenantRentAmount = ?, tenantSecurityDeposit = ?,
        tenantStartDate = ?, tenantEndDate = ?
    WHERE tenantId = ?
  `;
	db.query(query, [tenantName, tenantMail, tenantPhoneNo, unitNumber, noofUnit, tenantRentAmount, tenantSecurityDeposit, tenantStartDate, tenantEndDate, tenantId], (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'error Occured' })
		}
		res.status(200).json({ status: "success", message: "new user added" })
	})
})

app.delete('/tenants', (req, res) => {
	const { tenantId } = req.body;
	const query = `DELETE FROM tenant WHERE tenantId = ?`
	db.query(query, [tenantId], (err, result) => {
		if (err) return res.status(500).json({ message: "Error Occured" })
		return res.status(200).json({ status: "success", message: "new user added" })
	})
})


app.listen(6000, () => {
	console.log("server started at tenant");

})

