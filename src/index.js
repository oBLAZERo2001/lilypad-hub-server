const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const port = process.env.PORT || 3000;

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
