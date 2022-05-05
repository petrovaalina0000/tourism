import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import './index.css';
import {AuthProvider} from "./components/AuthProvider";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
