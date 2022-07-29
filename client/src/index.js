import React from "react";
import * as ReactDOM from 'react-dom/client';
import App from "./components/App";
import {BrowserRouter} from 'react-router-dom';

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>);