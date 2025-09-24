import Image from 'next/image';
import styles from './Header.module.css';
import { useRef } from 'react';
import { ArrowLeftIcon } from '../icons/icons/ArrowLeftIcon';

export type AppState = 'hero' | 'walkthrough' | 'tutorial' | 'form' | 'results';

export const Header = ({
  onSetAppState,
  walkthroughStep,
}: {
  onSetAppState: (state: AppState) => void;
  walkthroughStep: number;
}) => {
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);

  const handleRefresh = () => {
    // Refresh page or reset state
    window.location.reload();
  };

  const handleGoBack = () => {
    // Implement your go back logic here
    onSetAppState('hero');
  };

  return (
    <header ref={logoContainerRef} className={styles.header} role="banner">
      <button
        ref={backButtonRef}
        onClick={handleGoBack}
        className={styles.backButton}
        aria-label="Go back"
      >
        <ArrowLeftIcon direction="left" color="#ffffff" />
      </button>
      <Image src="/jb-logo.png" alt="Juicebox Logo" width={120} height={40} priority />
      <button
        className={styles.refreshButton}
        onClick={handleRefresh}
        aria-label="Refresh application"
        title="Refresh"
      >
        <RefreshIcon />
      </button>
    </header>
  );
};

// Simple refresh icon component
function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.705 8.005a.75.75 0 0 1 .834.656 5.5 5.5 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.001 7.001 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834ZM8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.001 7.001 0 0 1 14.95 7.16a.75.75 0 0 1-1.49.178A5.5 5.5 0 0 0 8 2.5Z" />
    </svg>
  );
}
