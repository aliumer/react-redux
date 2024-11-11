import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App"
import store from "./redux/reducers/configureStore.dev";
import { Provider } from "react-redux"

const rootElement = document.getElementById('app');
createRoot(rootElement).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
