import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Right-click "save image" and drag-to-desktop are blocked on every <img>. Photos drawn as
// backgrounds (gallery) have their own guard in GalleryPage.
const blockImageSave = (event: Event) => {
  if (event.target instanceof HTMLImageElement) event.preventDefault();
};
document.addEventListener('contextmenu', blockImageSave);
document.addEventListener('dragstart', blockImageSave);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
