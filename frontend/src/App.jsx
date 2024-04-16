// Import everything needed to use the `useQuery` hook
import {useQuery, gql} from '@apollo/client';
import {client as apollo} from './Apollo.jsx';
import {useState} from "react";

// A query is a method of requesting information from a database
const GQL_QUERY_GET_BOOKS = gql` # gql is a function that parses string into an object 
# The query below sets up what GetBooks is supposed to return
# it is possible to query a couple of attributes out of hundreds for one query
query GetBooks {
    books { #automatically will be an array
        title
        author
        pageCount
    }
}
`;
const GQL_MUTATION_ADD_BOOK = gql`
    # Remember that mutation changes the database somehow
    # Query is a getter, mutation is a setter
    # Spread (...) can be a getter or setter (mutation or query)
    mutation addBook ($t:String!, $a:String!, $pc:Int!) {
        addBook (title: $t, author:$a, pageCount:$pc) {
            title
            author
            pageCount
        }
        #    registerBookAuthor (bookTitle: $t, authorName:$a) {
        #        author
        #        listOfBooks { title }
        #    }
    }
`;

// const GQL_MUTATION_REMOVE_BOOK = gql`
//     mutation removeBook(title:String!, author:String!, pageCount:Int!) {
//
//     }
//
// `;

export default function App() {
    //add refetch near the end of data
    // Loading is what shows while the app is being loaded. Error is optional
    const {loading, error, data} = useQuery(GQL_QUERY_GET_BOOKS);
    // Note that loading is a boolean; this follows the useQuery hook. Data is the results that are loaded
    const [title, setTitle] = useState(''); // If no title was set, set title to empty
    const [author, setAuthor] = useState('');
    const [pageCount, setPageCount] = useState(0);

    // useQuery is a hook
    // Additionally, anything with "use" is a hook at the beginning

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const handleSubmit = () => {
        apollo.mutate({
            mutation: GQL_MUTATION_ADD_BOOK,
            variables: {
                t: title,
                a: author,
                pc: pageCount
            }
        })
            //.then(() => refetch())
        // Socket
    };


    console.log(data.books); //Data.books prints out whatever books are in the books list
    const books = data?.books ?? [];

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        title: <input value={title} onChange={e => setTitle(e.target.value)}/>
                    </div>

                    <div>
                        author: <input value={author} onChange={e => setAuthor(e.target.value)}/>
                    </div>

                    <div>
                        pageCount: <input value={pageCount} type={"number"}
                                          onChange={e => setPageCount(+e.target.value)}/>
                    </div>
                    <div>
                        <button type={"submit"}>Add to database</button>
                    </div>
                </form>
            </div>


            <h2>Le Bookshelf 🚀</h2>
            <ul>
                {books.map(book => (
                    <li>
                        {book.title}, by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
}

