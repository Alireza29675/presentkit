import { deck } from './deck.ts';
import { createPresentationController } from './navigation/createPresentationController.ts';
import { connectPresentationUrl, resolveHash } from './url/presentationUrl.ts';

/** Restore before React renders; refresh starts directly at this slide and step. */
export const presentationController = createPresentationController(deck, {
  initialCursor: resolveHash(deck, window.location.hash),
});

const disconnectUrl = connectPresentationUrl(
  presentationController,
  deck,
  window,
);
import.meta.hot?.dispose(disconnectUrl);
