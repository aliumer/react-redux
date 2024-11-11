import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App"

const rootElement = document.getElementById('app');
createRoot(rootElement).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
