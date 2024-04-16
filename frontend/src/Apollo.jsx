import { ApolloClient, InMemoryCache, ApolloProvider as Provider, gql } from '@apollo/client';

// Frontends have clients. Frontend is what we see (UI)
// Clients are not synonymous with frontend
// Backend can connect with frontend in various ways (website requesting data & display, like a game with a leaderboard

// import pkg from '@apollo/client';
// const { ApolloClient, InMemoryCache, ApolloProvider: Provider, gql } = pkg;

export const client = new ApolloClient({ // Create new Apollo client
    uri: 'http://localhost:5000/',
    cache: new InMemoryCache(), // Create new memory || creates temporary storage
});

export default function ApolloProvider({children}) {
    // return <Provider client={client} children={children} />; // Equal to the below
    return (
        <Provider client={client}>
            {children}
        </Provider>
    );
}


// client.query({
//     query: gql`
//         query GetBooks {
//             book(index: 1) {
//                 title
//                 author
//             }
//             books {
//                 title
//
//             }
//         }
//     `,
// }).then((result) => console.log(result.data)); // then statement is the answer to the promise

//.then(({data}) => {
//     console.log(data)
// })
// This returns all the data