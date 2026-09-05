import { useEffect, useState } from 'react';
import * as styles from '../launch.css.ts';

export function TypedPrompt({ text }: { readonly text: string }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setInterval> | undefined;
    function start() {
      clearInterval(timer);
      if (preference.matches) {
        setVisible(text.length);
        return;
      }
      let count = 0;
      setVisible(0);
      timer = setInterval(() => {
        count = Math.min(text.length, count + 3);
        setVisible(count);
        if (count === text.length) clearInterval(timer);
      }, 24);
    }
    start();
    preference.addEventListener('change', start);
    return () => {
      clearInterval(timer);
      preference.removeEventListener('change', start);
    };
  }, [text]);

  return (
    <p className={styles.prompt}>
      <span className={styles.screenReaderText}>{text}</span>
      <span aria-hidden="true">
        {text.slice(0, visible)}
        <span className={styles.caret}>▍</span>
      </span>
    </p>
  );
}
