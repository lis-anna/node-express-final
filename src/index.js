import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <ChakraProvider>
        <Router>
          <ColorModeProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </ColorModeProvider>
        </Router>
      </ChakraProvider>
    </CookiesProvider>
  </React.StrictMode>
);
