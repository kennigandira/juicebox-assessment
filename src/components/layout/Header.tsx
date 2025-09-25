import Image from 'next/image';
import gsap from 'gsap';
import styles from './Header.module.css';
import { useRef } from 'react';
import { ArrowIcon } from '../icons/icons/ArrowIcon';
import { parseAsInteger, parseAsStringEnum, useQueryState } from 'nuqs';
import { QueryState } from '@/global/enums/queryState';
import { PageState } from '@/global/enums/pageState';
import { useGSAP } from '@gsap/react';
import { RefreshIcon } from '../icons/icons/RefreshIcon';
import { WALKTHROUGH_STEPS_TOTAL } from '@/global/constants';

export type AppState = 'hero' | 'walkthrough' | 'tutorial' | 'form' | 'results';

gsap.registerPlugin(useGSAP);

const BACK_BUTTON_ANIMATIONS_ATTRIBUTES = {
  [PageState.Hero]: {
    display: 'none',
    opacity: '0',
    border: 'none',
  },
  [PageState.Walkthrough]: {
    display: 'block',
    opacity: '1',
  },
};

export const Header = () => {
  const [pageState, setPageState] = useQueryState(
    QueryState.PageState,
    parseAsStringEnum<PageState>(Object.values(PageState)).withDefault(PageState.Hero)
  );
  const [walkthroughStep, setWalkthroughStep] = useQueryState(
    QueryState.WalkthroughStep,
    parseAsInteger.withDefault(0)
  );
  const [, setFormStep] = useQueryState(QueryState.FormStep, parseAsInteger.withDefault(0));

  const logoContainerRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);

  const handleRefresh = () => {
    setPageState(null);
    setWalkthroughStep(null);
    setWalkthroughStep(null);
    setFormStep(null);
  };

  useGSAP(() => {
    if (pageState === PageState.Hero) {
      gsap.to(backButtonRef.current, {
        duration: 0.4,
        ...BACK_BUTTON_ANIMATIONS_ATTRIBUTES[PageState.Hero],
      });
    }

    if (pageState === PageState.Walkthrough) {
      gsap.to(backButtonRef.current, {
        duration: 0.4,
        ...BACK_BUTTON_ANIMATIONS_ATTRIBUTES[PageState.Walkthrough],
      });
    }
  }, [pageState]);

  const handleGoBack = () => {
    if (pageState === PageState.Walkthrough) {
      if (walkthroughStep > 0 && walkthroughStep < 3) {
        setWalkthroughStep(walkthroughStep - 1);
      } else if (walkthroughStep === 0) {
        setPageState(PageState.Hero);
      }
    }

    if (pageState === PageState.Form) {
      setPageState(PageState.Walkthrough);
      setWalkthroughStep(WALKTHROUGH_STEPS_TOTAL);
    }
  };

  return (
    <header ref={logoContainerRef} className={styles.header} role="banner">
      <button
        ref={backButtonRef}
        onClick={handleGoBack}
        className={styles.backButton}
        aria-label="Go back"
      >
        <ArrowIcon direction="left" color="#ffffff" />
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
