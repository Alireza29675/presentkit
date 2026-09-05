import type { NavigationControls } from '../navigation/types.ts';
import { useEffect } from 'react';
import { navigationActionForKey } from './keyboard.ts';

export function usePresentationKeyboard({
  presenter,
}: {
  readonly presenter: Pick<NavigationControls, 'next' | 'previous'>;
}) {
  const { next, previous } = presenter;
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const action = navigationActionForKey(event);
      if (!action) return;
      event.preventDefault();
      if (event.repeat) return;
      if (action === 'next') next();
      else previous();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next, previous]);
}
