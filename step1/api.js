const fs = require('fs');
const path = require('path');
const { graphql, buildSchema } = require('graphql');

const schemaString = fs.readFileSync(path.resolve(__dirname, 'schema.graphql'), 'utf-8');

// Initialize our schema
const schema = buildSchema(schemaString);

// Create the resolvers
const root = {
	helloWorld: () => ({ message: 'Good morning!' }),
};

// This is a convenience wrapper around the graphql method
function runQuery(context, query, variables) {
	return graphql(schema, query, root, context, variables);
}

module.exports = {
	runQuery,
};
