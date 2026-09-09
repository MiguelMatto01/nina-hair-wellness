import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';

console.log('Starting app initialization...');

const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

if (!rootElement) {
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found!</div>';
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream p-8">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Oops! Something went wrong</h1>
            <p className="text-gray-600 mb-6">We're having trouble loading the page. Please try refreshing your browser.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gold text-black font-medium hover:bg-gold/80 transition-colors duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      }>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
  console.log('App rendered successfully');
} catch (error) {
  console.error('Failed to render app:', error);
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Fatal error during app initialization. Check console for details.</div>';
}
