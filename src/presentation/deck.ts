import { welcomeSlide } from './slides/welcome/WelcomeSlide.tsx';
import { launchSlide } from './slides/launch/LaunchSlide.tsx';
import { conceptsSlide } from './slides/concepts/ConceptsSlide.tsx';
import { linksSlide } from './slides/links/LinksSlide.tsx';
import { finishSlide } from './slides/finish/FinishSlide.tsx';

export const deck = [
  welcomeSlide,
  launchSlide,
  conceptsSlide,
  linksSlide,
  finishSlide,
] as const;
