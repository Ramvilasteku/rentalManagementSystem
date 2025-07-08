const express = require("express");
const sql = require("mysql2");
const cors = require("cors")

const app = express();

const db = sql.createConnection({
	host: "localhost",
	user: "root",
	password: "9812",
	database: "rental",
	waitForConnections: true
});

app.use(express.json());
app.use(cors({
	origin: "http://localhost:5173",
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true
}))

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



app.listen(8080, () => {
	console.log("server started at assets");

})

