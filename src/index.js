const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		" GET, POST, PATCH, PUT, DELETE, OPTIONS"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	next();
});

app.use(express.json());

// Database
require("./database/mongoose");

const { routes } = require("./routes");

app.use(routes);

app.get("/", (req, res) => {
	res.send("Hello, Express!");
});

// Start the server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
