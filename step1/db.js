const fs = require('fs');
const path = require('path');
const lowdb = require('lowdb');
const MemoryAdapter = require('lowdb/adapters/Memory');
const FileSyncAdapter = require('lowdb/adapters/FileSync');

// Initialise the database if it is empty
function initDatabase({ inMemory, silent } = {}) {
	// In testing we want an in memory DB which we can reset for each test run
	const adapter = inMemory
		? new MemoryAdapter()
		: new FileSyncAdapter(path.resolve(__dirname, 'temp.db.json'));
	const db = lowdb(adapter);

	// In testing logs are noisy
	const log = silent ? () => {} : console.log.bind(console);

	// Seed the database if it is empty
	const existingState = db.getState();

	if (!Object.keys(existingState).length) {
		log('✏️  Initialising database');
		try {
			const initialDB = fs.readFileSync(path.resolve(__dirname, 'initial-db.json'), 'utf-8');
			db.setState(JSON.parse(initialDB)).write();
		} catch (error) {
			console.error('Failed to initialise DB', error);
			process.exit(1);
		}
	}

	log('✨ Database ready');
	return db;
}

module.exports = {
	initDatabase,
};
