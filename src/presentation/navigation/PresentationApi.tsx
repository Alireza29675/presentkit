import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react';
import type { ReactNode } from 'react';
import type { Cursor, PresentationSnapshot } from './types.ts';

interface InteractionController {
  readonly getSnapshot: () => PresentationSnapshot<Cursor>;
  readonly subscribe: (listener: () => void) => () => void;
  readonly controls: {
    readonly next: () => void;
    readonly previous: () => void;
  };
  readonly captureStepCompletion: () => () => void;
}

const ControllerContext = createContext<InteractionController | null>(null);

export function PresentationApiProvider({
  controller,
  children,
}: {
  readonly controller: InteractionController;
  readonly children: ReactNode;
}) {
  return (
    <ControllerContext.Provider value={controller}>
      {children}
    </ControllerContext.Provider>
  );
}

/** Available at any depth under the provider, without passing navigation props. */
export function usePresentationApi() {
  const controller = useContext(ControllerContext);
  if (!controller)
    throw new Error('usePresentationApi requires a PresentationApiProvider.');
  const snapshot = useSyncExternalStore(
    controller.subscribe,
    controller.getSnapshot,
    controller.getSnapshot,
  );
  const completeStep = useMemo(
    () => controller.captureStepCompletion(),
    [controller, snapshot],
  );

  return {
    ...controller.controls,
    current: snapshot.current,
    isFirstVisit: snapshot.isFirstVisit,
    completeStep,
  };
}
