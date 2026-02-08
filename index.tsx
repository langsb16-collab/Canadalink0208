
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';

// Deployment Audit Logging
console.log("%c K-LINK PLATFORM LOADED ", "background: #4F46E5; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;");
console.log("Environment:", process.env.NODE_ENV);
console.log("System Time:", new Date().toISOString());

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("CRITICAL_BOOT_ERROR: Could not find root element.");
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>
);
