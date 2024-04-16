import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Context from './Context.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    // App == children, which are inside contextBuilder
    <React.StrictMode>
        <Context>
            <App/>
        </Context>
    </React.StrictMode>,
)
