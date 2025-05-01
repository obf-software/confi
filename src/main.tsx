import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './provider.tsx';

import '@fontsource/open-sauce-one/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider />
  </StrictMode>
);
