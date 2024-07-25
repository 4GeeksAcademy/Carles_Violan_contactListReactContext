// src/index.js o src/main.js
import React from "react";
import ReactDOM from "react-dom/client";

// Include your styles into the webpack bundle
import "../styles/index.css";

// Import the main App component
import App from '../js/component/app.jsx';

ReactDOM.createRoot(document.getElementById('app')).render(<App />);