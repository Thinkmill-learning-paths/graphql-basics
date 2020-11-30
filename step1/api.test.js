const { initDatabase } = require('./db');
const { runQuery } = require('./api');

describe('Hello world', () => {
	beforeEach(() => {
		// We pass the database in as context to each query.
		// For tests we want a new copy every time
		this.context = { db: initDatabase({ inMemory: true, silent: true }) };
	});

	it('Should greet the world', async () => {
		const query = `query { helloWorld { message } }`;
		const variables = {};
		const result = await runQuery(this.context, query, variables);
		expect(result.data.helloWorld).toEqual({ message: 'Good morning!' });
	});
});
