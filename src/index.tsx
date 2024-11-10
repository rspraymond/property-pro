import React from 'react';
import ReactDOM from 'react-dom/client';

// import './index.css'; // Import your global styles here
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root element for rendering the React app
const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
