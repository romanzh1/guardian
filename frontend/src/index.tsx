import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';

const ROOT_ELEMENT = document.getElementById('root');
if (ROOT_ELEMENT) {
  ReactDOM.createRoot(ROOT_ELEMENT).render(<App />);
}
