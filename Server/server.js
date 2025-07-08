const express = require('express');

const sql = require("mysql2");

const cors = require("cors");


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

app.use(cors({
	origin: "http://localhost:5173",
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true
}))


//USERS API START

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
			return res.status(500).json({ message: 'error Occured', err })
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

//USERS API END


//ASSETS API START

app.get('/assets', (req, res) => {
	const sql = `SELECT * FROM assets`;
	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).json({ message: "error occured", err })
		}
		return res.status(200).json(result);
	})

})

app.post('/assets', (req, res) => {
	const { assetName, assetType, assetCost, assetStatus,  lastMaintenanceDate, nextMaintenanceDate, assetPurchesDate, warrentyEndDate, assetDescription } = req.body;
	const sql = `INSERT INTO assets (assetName, assetType, assetCost, assetStatus, lastMaintenanceDate, nextMaintenanceDate,assetPurchesDate, warrentyEndDate, assetDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	db.query(sql, [assetName, assetType, assetCost, assetStatus, lastMaintenanceDate, nextMaintenanceDate, assetPurchesDate, warrentyEndDate, assetDescription], (err, result) => {
		if (err) {
			return res.status(500).json({ message: "Eroor Occured", err });
		}
		return res.status(200).json({ status: "success", message: "New asset added" })
	})

})

app.put('/assets', (req, res) => {
	const { assetName, assetType, assetCost, assetStatus,  lastMaintenanceDate, nextMaintenanceDate, assetPurchesDate, warrentyEndDate, assetDescription, assetId } = req.body;
	const sql = `UPDATE assets SET assetName = ?, assetType = ? , assetCost = ? , assetStatus = ? , lastMaintenanceDate = ? , nextMaintenanceDate = ? ,assetPurchesDate = ? , warrentyEndDate = ? , assetDescription = ? WHERE  assetId = ?`;
	db.query(sql, [assetName, assetType, assetCost, assetStatus,  lastMaintenanceDate, nextMaintenanceDate, assetPurchesDate, warrentyEndDate, assetDescription, assetId], (err, result) => {
		if (err) {
			return res.status(500).json({ message: "Eroor Occured", err });
		}
		return res.status(200).json({ status: "success", message: " asset updated  added" })
	})

})

app.delete("/assets", (req, res) => {
	const {assetId} = req.body;
	const sql = `DELETE FROM assets WHERE assetId = ?`;
	db.query(sql, [assetId], (err, result) => {
		if (err) {
			return res.status(500).json({ message: "Error Occured",err })
		}
		return res.status(200).json({ stauts: "success", message: "Asset Data deleted " })
	})
})

//ASSETS API END


//TENANT API START


app.get('/tenant', (req, res) => {
	const sql = `SELECT * FROM tenant`;
	db.query(sql, (err, result) => {
		if (err)
			return res.status(500).json({ message: 'error Occured' })
		return res.json(result);
	})
})


app.post('/tenant', (req, res) => {
	const { tenantName, tenantMail, tenantPhoneNo, unitNumber, noofUnit, tenantRentAmount, tenantSecurityDeposit, tenantStartDate, tenantEndDate } = req.body;
	const query = `INSERT INTO tenant( tenantName, tenantMail, tenantPhoneNo,unitNumber, noofUnit, tenantRentAmount,tenantSecurityDeposit, tenantStartDate, tenantEndDate) VALUES (?,?,?,?,?,?,?,?,?)`;
	db.query(query, [tenantName, tenantMail, tenantPhoneNo, unitNumber, noofUnit, tenantRentAmount, tenantSecurityDeposit, tenantStartDate, tenantEndDate], (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'error Occured',err })
		}
		res.status(200).json({ status: "success", message: "new user added" })
	})
})


app.put('/tenant', (req, res) => {
	const { tenantName, tenantMail, tenantPhoneNo, unitNumber, noofUnit, tenantRentAmount, tenantSecurityDeposit, tenantStartDate, tenantEndDate, tenantId } = req.body;
	const query = `UPDATE tenant SET tenantName = ? , tenantMail = ?, tenantPhoneNo = ?, unitNumber = ?,noofUnit = ?, tenantRentAmount = ?, tenantSecurityDeposit = ?,tenantStartDate = ?, tenantEndDate = ? WHERE tenantId = ?`;
	db.query(query, [tenantName, tenantMail, tenantPhoneNo, unitNumber, noofUnit, tenantRentAmount, tenantSecurityDeposit, tenantStartDate, tenantEndDate, tenantId], (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'error Occured',err })
		}
		res.status(200).json({ status: "success", message: "new user added" })
	})
})

app.delete('/tenant', (req, res) => {
	const { tenantId } = req.body;
	const query = `DELETE FROM tenant WHERE tenantId = ?`
	db.query(query, [tenantId], (err, result) => {
		if (err) return res.status(500).json({ message: "Error Occured" })
		return res.status(200).json({ status: "success", message: "new user added" })
	})
})


//TENANT API START


app.listen(8080, () => {
	console.log("server stated at 8080 ");
})