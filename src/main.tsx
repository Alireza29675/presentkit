import { createRoot } from 'react-dom/client';
import { Presentation } from './presentation/Presentation.tsx';
import { defaultTheme, themeRoot } from './presentation/theme/themes.css.ts';
import './presentation/theme/global.css.ts';

const root = document.getElementById('root');
if (!root) throw new Error('The presentation root element is missing.');
createRoot(root).render(
  <div className={`${defaultTheme} ${themeRoot}`}>
    <Presentation />
  </div>,
);
