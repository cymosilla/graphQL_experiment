import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'

// Independent program that communicates with frontend, data transport layer

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    
    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        title: String
        author: String
        pageCount: Int
    }
    
    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book]
        book(index: Int): Book
    }
    type Mutation {
        addBook(title:String!, author:String!, pageCount:Int!): Book
        # removeBook
    }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
        pageCount: 300,
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
        pageCount: 500,
    },
    {
        title: 'Throne of Glass',
        author: 'Hunter',
        pageCount: 357,
    }
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
        book: (_, params) => books[params.index] // _ is root, ignore argument
    },
    Mutation: {
        addBook: (_, userInput) => {
            const book = {
                // User input is a type of param/argument
                title: userInput.title,
                author: userInput.author,
                pageCount: userInput.pageCount,
            };
            books.push(book); // .push() returns length of array
            return book;
        }
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, { listen: { port: 5000 } });

console.log(`🚀 Server listening at: ${url}`);

// URL >> HTTP >> Domain >> Subdomain >> uri
// URI
