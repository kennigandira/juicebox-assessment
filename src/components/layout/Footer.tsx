import { ChangeEventHandler, useRef } from 'react';
import { Button, Input } from '../ui';
import clsx from 'clsx';

import gsap from 'gsap';
import { TextPlugin } from 'gsap/all';
import styles from './Footer.module.css';
import { parseAsInteger, parseAsStringEnum, useQueryState } from 'nuqs';
import { PageState } from '@/global/enums/pageState';
import { QueryState } from '@/global/enums/queryState';
import { useGSAP } from '@gsap/react';
import { WALKTHROUGH_STEPS_TOTAL } from '@/global/constants';

const BUTTON_TEXTS = {
  INITIAL_TEXT: 'Get a reality check',
  WALKTHROUGH_MODE: 'Continue',
  END_OF_WALKTHROUGH_MODE: 'Get Started',
  FORM_CONTINUE: 'Continue',
};

const BUTTON_ANIMATIONS_ATTRIBUTES = {
  [PageState.Walkthrough]: {
    background: 'transparent',
    border: '1px solid #FFFFFF99',
    color: '#ffffff',
  },
  [PageState.Hero]: {
    text: BUTTON_TEXTS.INITIAL_TEXT,
    background: '#CDAAFF',
    color: '#0c0d10',
    border: 'none',
  },
};

const LAST_STEP_BUTTON_ATTRIBUTE = {
  background: '#fafafa',
  color: '#0c0d10',
};

const HIDE_BUTTON = {
  opacity: 0,
  visibility: 'hidden',
};

const SHOW_BUTTON = {
  opacity: 1,
  visibility: 'visible',
};

const FORM_STEP_INPUT_PLACEHOLDER = ['First name', 'Email Address'];
const INPUT_NAME = ['firstName', 'emailAddress'];
// const FORM_STEP_TEXTS = {
//   0: "Let's start with the basics. Type in your first name.",
//   1: 'How should we contact you? Type in your email address.',
//   2: (name: string) =>
//     `Thanks, ${name}! Now, it\'s time to get a reality check.\nThis will take 2-3 minutes.`,
// };
gsap.registerPlugin(useGSAP, TextPlugin);

export const Footer = ({
  onInputChange,
  onFormStepComplete,
}: {
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  onFormStepComplete?: (step: number, value: string) => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputContainerRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [pageState, setPageState] = useQueryState(
    QueryState.PageState,
    parseAsStringEnum<PageState>(Object.values(PageState)).withDefault(PageState.Hero)
  );

  const [walkthroughStep, setWalkthroughStep] = useQueryState(
    QueryState.WalkthroughStep,
    parseAsInteger.withDefault(0)
  );

  const [formStep, setFormStep] = useQueryState<number>(
    QueryState.FormStep,
    parseAsInteger.withDefault(0)
  );

  const isLastStep = walkthroughStep === 2;
  const lastStepButtonStyles = isLastStep ? LAST_STEP_BUTTON_ATTRIBUTE : {};

  // Form step 2 button styling (white button)
  const formStep2ButtonStyles =
    formStep === 2
      ? {
          background: '#fafafa',
          color: '#0c0d10',
          text: BUTTON_TEXTS.FORM_CONTINUE,
        }
      : {};

  const handleFormStepSubmit = (value: string) => {
    if (onFormStepComplete) {
      onFormStepComplete(formStep, value);
    }
    if (formStep < 2) {
      setFormStep(formStep + 1);
    }
  };

  useGSAP(() => {
    if (pageState === PageState.Hero) {
      gsap.to(buttonRef.current, {
        duration: 0.4,
        ...SHOW_BUTTON,
        ...BUTTON_ANIMATIONS_ATTRIBUTES[PageState.Hero],
      });
      gsap.to(inputContainerRef.current, HIDE_BUTTON);
    }

    if (pageState === PageState.Walkthrough) {
      gsap.to(buttonRef.current, {
        duration: 0.4,
        ...SHOW_BUTTON,
        ...BUTTON_ANIMATIONS_ATTRIBUTES[PageState.Walkthrough],
        text:
          walkthroughStep === 2
            ? BUTTON_TEXTS.END_OF_WALKTHROUGH_MODE
            : BUTTON_TEXTS.WALKTHROUGH_MODE,
        ...lastStepButtonStyles,
      });
      gsap.to(inputContainerRef.current, HIDE_BUTTON);
    }

    if (pageState === PageState.Form) {
      if (formStep < 2) {
        gsap.to(buttonRef.current, { ...HIDE_BUTTON, duration: 0.4 });
        gsap.to(inputContainerRef.current, { ...SHOW_BUTTON, duration: 0.4 });
      } else {
        gsap.to(inputContainerRef.current, { ...HIDE_BUTTON, duration: 0.4 });
        gsap.to(buttonRef.current, {
          duration: 0.4,
          ...SHOW_BUTTON,
          ...formStep2ButtonStyles,
        });
      }
    }
  }, [pageState, walkthroughStep, formStep]);

  const handleCtaClick = () => {
    const isHeroState = pageState === PageState.Hero;
    const isWalkthroughState = pageState === PageState.Walkthrough;

    if (isHeroState) {
      setPageState(PageState.Walkthrough);
    }

    if (isWalkthroughState) {
      if (walkthroughStep < WALKTHROUGH_STEPS_TOTAL) {
        setWalkthroughStep(walkthroughStep + 1);
      }

      if (walkthroughStep === WALKTHROUGH_STEPS_TOTAL) {
        setWalkthroughStep(null);
        setPageState(PageState.Form);
        setFormStep(0);
      }
    }
  };

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={handleCtaClick}
        variant="primary"
        size="lg"
        className={clsx(styles.ctaElement, styles.ctaButton)}
        aria-label="Get a reality check about technology opinions"
      >
        {BUTTON_TEXTS.INITIAL_TEXT}
      </Button>
      <Input
        ref={inputContainerRef}
        inputRef={inputRef}
        className={clsx(styles.ctaElement, styles.ctaInput)}
        placeholder={FORM_STEP_INPUT_PLACEHOLDER[formStep]}
        onChange={onInputChange}
        onEnterSubmit={handleFormStepSubmit}
        name={INPUT_NAME[formStep]}
      />
    </>
  );
};
