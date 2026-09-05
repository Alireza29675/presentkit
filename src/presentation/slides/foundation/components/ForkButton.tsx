import * as styles from './forkButton.css.ts';

export function ForkButton() {
  return (
    <a
      className={styles.button}
      href="https://github.com/Alireza29675/presentkit/fork"
      target="_blank"
      rel="noreferrer"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="6" cy="4" r="2.5" />
        <circle cx="18" cy="4" r="2.5" />
        <circle cx="12" cy="20" r="2.5" />
        <path d="M6 6.5V9c0 4 6 2 6 6v2.5M18 6.5V9c0 4-6 2-6 6" />
      </svg>
      Fork PresentKit
    </a>
  );
}
