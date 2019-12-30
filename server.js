const express = require('express'),
      bodyParser = require('body-parser'),
      { graphqlExpress, graphiqlExpress } = require('graphql-server-express'),
      { makeExecutableSchema } = require('graphql-tools');

const typeDefs = [`
type Query {
    hello: String
    goodbye: String
}

schema {
    query: Query
}`];

const resolvers = {
    Query: {
        hello(root) {
            return "world";
        },
        goodbye(root) {
            return "bye world";
        }
    }
}

const schema = makeExecutableSchema({typeDefs, resolvers});

const app = express();

app.use("/graphql", bodyParser.json(), graphqlExpress({schema}));
app.use("/graphiql", graphiqlExpress({endpointURL: "/graphql"}));
app.listen(4000, () => console.log("Now browse to localhost:4000/graphiql"));
