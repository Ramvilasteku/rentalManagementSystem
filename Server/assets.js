const express = require("express");
const app = express();

app.get('/',(req,res)=>{
	res.send("hi frends ela unnaru")
})

app.listen(5000,()=>{
	console.log("server started at assets");
	
})

