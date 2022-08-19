import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from "react-cookie";
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";


ReactDOM.render(
  <CookiesProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App page="home"/>} />
      <Route path="/mural" element={<App page="mural"/>} />
      <Route path="/score" element={<App page="score"/>} />
    </Routes>
  </BrowserRouter>
  </CookiesProvider>,
  document.getElementById("root")
);