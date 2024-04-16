import ApolloProvider from "./Apollo.jsx";


export default function Context({children}) { // Children is the children of context == app
// Builds context, what the children are dependent on
    return (
        <ApolloProvider>
            {children}
        </ApolloProvider>
    );

}