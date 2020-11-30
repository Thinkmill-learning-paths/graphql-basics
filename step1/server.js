const express = require('express');
const { initDatabase } = require('./db');

// Config
const PORT = process.env.PORT || 3000;

// Create the server
const app = express();

// Define routes
app.get('/', (req, res) => res.send('Hello world'));

const run = async () => {
	await initDatabase();
	app.listen(PORT, () => {
		console.log(`🚀 Server listening on http://localhost:${PORT}`);
	});
};

// Make rocket go now
run();
