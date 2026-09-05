import { deck } from './deck.ts';
import { Stage } from './stage/Stage.tsx';
import { usePresentationController } from './navigation/usePresentation.ts';
import { usePresentationKeyboard } from './keyboard/usePresentationKeyboard.ts';
import { PresentationApiProvider } from './navigation/PresentationApi.tsx';
import { presentationController } from './controller.ts';

export function Presentation() {
  const presentation = usePresentationController(presentationController);
  usePresentationKeyboard(presentation);
  return (
    <PresentationApiProvider controller={presentationController}>
      <Stage deck={deck} presentation={presentation} />
    </PresentationApiProvider>
  );
}
