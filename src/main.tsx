import { Buffer } from 'buffer';
(globalThis as any).Buffer = Buffer;

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Providers from './providers';
import './styles/index.scss';
import '@rainbow-me/rainbowkit/styles.css'
import "./index.css"

createRoot(document.getElementById('root')!).render(
  <Providers>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Providers>,
)
