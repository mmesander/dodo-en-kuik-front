// Functions
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom";

// Context
import AuthContextProvider from "./context/AuthContext.jsx";

// Pages
import App from './App.jsx'

// Styles
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <Router>
        <AuthContextProvider>
            <App/>
        </AuthContextProvider>
    </Router>
    // </React.StrictMode>,
)
