import '@fontsource/open-sauce-one/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from './provider.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider />
  </StrictMode>
);
