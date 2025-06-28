import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FavProvider } from './context/FavContext'; // ✅ Import the context

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavProvider> {/* ✅ Wrap the entire App with the context provider */}
      <App />
    </FavProvider>
  </React.StrictMode>
);

// Optional: For performance monitoring
reportWebVitals();