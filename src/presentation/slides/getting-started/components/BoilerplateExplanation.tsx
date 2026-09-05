import { boilerplateChunks } from '../steps/steps.ts';
import { caption } from '../gettingStarted.css.ts';
import * as styles from './boilerplateExplanation.css.ts';

export function BoilerplateExplanation() {
  return (
    <p className={caption}>
      {boilerplateChunks.map((chunk, index) => (
        <span
          key={chunk}
          className={styles.chunk}
          style={{ animationDelay: `${index + 1}s` }}
        >
          {chunk}
          {index < boilerplateChunks.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </p>
  );
}
