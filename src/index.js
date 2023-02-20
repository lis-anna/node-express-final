import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';

import { CookiesProvider } from 'react-cookie';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <CookiesProvider>
        <Router>
          <App />
        </Router>
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
export default { root };
