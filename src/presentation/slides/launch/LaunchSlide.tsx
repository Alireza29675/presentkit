import { useState } from 'react';
import { usePresentationApi } from '../../navigation/PresentationApi.tsx';
import { defineSlide } from '../../stage/defineSlide.tsx';
import type { SlideProps } from '../../stage/defineSlide.tsx';
import * as tour from '../../tour.css.ts';
import { BriefPreview } from './components/BriefPreview.tsx';
import { TypedPrompt } from './components/TypedPrompt.tsx';
import { briefs, scenes, steps, stepAdvance } from './steps/steps.ts';
import type { Brief, Step } from './steps/steps.ts';
import * as styles from './launch.css.ts';

const agents = ['Codex', 'Claude Code', 'Your favorite agent'] as const;
const briefOptions: readonly Brief[] = ['space', 'product', 'workshop'];

function LaunchSlide({ stepId }: SlideProps<Step>) {
  const { completeStep } = usePresentationApi();
  const [agent, setAgent] = useState<string>('Your coding agent');
  const [brief, setBrief] = useState<Brief>('space');
  const scene = scenes[stepId];

  return (
    <section
      className={`${tour.slide} ${styles.layout}`}
      aria-labelledby="launch-title"
    >
      <div className={styles.intro}>
        <p className={tour.eyebrow}>{scene.action}</p>
        <h1 className={tour.heading} id="launch-title">
          {scene.title}
        </h1>
        <p className={tour.body}>{scene.description}</p>
        <ol className={styles.progress} aria-label="Walkthrough progress">
          {steps.map((step, index) => (
            <li
              key={step}
              className={styles.progressItem}
              aria-current={step === stepId ? 'step' : undefined}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {step}
            </li>
          ))}
        </ol>
        <p className={styles.disclaimer}>
          Simulated walkthrough · no commands run
        </p>
      </div>
      <div className={styles.workspace}>
        <div className={styles.chrome}>
          <span className={styles.windowDots} aria-hidden="true">
            ● ● ●
          </span>
          <span>presentation-foundation</span>
          <span className={styles.status}>● local</span>
        </div>
        <div className={styles.workspaceBody} key={stepId}>
          {stepId === 'clone' && (
            <>
              <div className={styles.fileLabel}>TERMINAL</div>
              <div className={styles.terminal}>
                <p>
                  <span className={styles.shell}>❯</span> git clone{' '}
                  <span className={styles.repository}>
                    https://github.com/Alireza29675/presentation-foundation.git
                  </span>
                </p>
                <p>
                  <span className={styles.shell}>❯</span> cd
                  presentation-foundation
                </p>
                <p>
                  <span className={styles.shell}>❯</span> npm ci
                </p>
                <p>
                  <span className={styles.shell}>❯</span> npm run dev
                </p>
              </div>
              <div className={styles.callout}>
                <span className={styles.check}>✓</span>
                <span>
                  Slides, steps, themes, navigation.
                  <br />
                  <strong>Your starting point is ready.</strong>
                </span>
              </div>
              <button className={tour.button} onClick={completeStep}>
                Try the clone workflow <span aria-hidden="true">↗</span>
              </button>
            </>
          )}
          {stepId === 'agent' && (
            <>
              <div className={styles.fileLabel}>OPEN THE FOLDER WITH</div>
              <div className={styles.choices}>
                {agents.map((name, index) => (
                  <button
                    className={styles.agentChoice}
                    key={name}
                    onClick={() => {
                      setAgent(name);
                      completeStep();
                    }}
                  >
                    <span className={styles.agentIcon}>
                      {['⌘', '✳', '↗'][index]}
                    </span>
                    <span>{name}</span>
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </button>
                ))}
              </div>
              <div className={styles.guide}>
                <span aria-hidden="true">↳</span> AGENTS.md{' '}
                <span className={styles.guideNote}>
                  The foundation explains itself to your agent.
                </span>
              </div>
            </>
          )}
          {stepId === 'brief' && (
            <>
              <div className={styles.fileLabel}>
                {agent.toUpperCase()} / NEW PRESENTATION
              </div>
              <h2 className={styles.question}>What will you make?</h2>
              <p className={styles.hint}>
                Choose a starting brief. No typing needed.
              </p>
              <div className={styles.choices}>
                {briefOptions.map((option, index) => (
                  <button
                    key={option}
                    className={styles.agentChoice}
                    onClick={() => {
                      setBrief(option);
                      completeStep();
                    }}
                  >
                    <span className={styles.agentIcon}>
                      {['◉', '↗', '✦'][index]}
                    </span>
                    <span>{briefs[option].label}</span>
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
          {stepId === 'preview' && (
            <>
              <div className={styles.fileLabel}>
                {agent.toUpperCase()} / YOUR BRIEF
              </div>
              <TypedPrompt text={briefs[brief].prompt} />
              <BriefPreview brief={brief} />
              <p className={styles.resultNote}>
                A different story. The same foundation.{' '}
                <span>Continue to look inside →</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export const launchSlide = defineSlide({
  id: 'launch',
  steps,
  stepAdvance,
  component: LaunchSlide,
});
