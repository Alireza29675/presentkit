import * as styles from './introHint.css.ts';

export function IntroHint({ visible }: { readonly visible: boolean }) {
  return (
    <div className={styles.hint} hidden={!visible}>
      <p className={styles.question}>Do you want to know how it works?</p>
      <p className={styles.keyPrompt}>
        <span>Press</span>
        <kbd className={styles.key}>space</kbd>
      </p>
    </div>
  );
}
