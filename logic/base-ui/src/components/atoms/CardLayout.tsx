import { ReactNode, useEffect, useRef } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '../shadcn/card';
// import { Button } from '../shadcn/button';
import StarBurst from '../animations/starburst';
import { ContinueButton } from './ContinueButton';

type CardLayoutProps = {
  title?: string;
  description?: string;
  image?: ReactNode | null;
  content?: ReactNode; // componenten voor CardContent
  footer?: ReactNode; // voor content in CardFooter of extra knoppen
  stars?: any; // optioneel voor animaties zoals StarBurst
  isComplete?: boolean;
  onContinue?: () => void;
  onSkip?: () => void;
};

export function CardLayout({
  title,
  description,
  image,
  content,
  footer,
  stars,
  isComplete,
  onContinue,
  onSkip,
}: CardLayoutProps) {
  const continueRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isComplete) return;
    setTimeout(() => {
      continueRef.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
      continueRef.current?.focus();
    });
  }, [isComplete]);

  return (
    <>
      <div className='flex flex-row justify-center'>
        <Card
          className={`mt-2 flex xl:w-180 flex-col justify-center border-gray-500 cloze-0 `}
        >
          {title && (
            <CardHeader className='border-b border-gray-600'>
              <CardTitle className='text-center text-3xl font-semibold'>
                {title}
              </CardTitle>
              {description && (
                <CardDescription className='pb-2 text-center text-xl font-semibold'>
                  {description}
                </CardDescription>
              )}
            </CardHeader>
          )}
          {image && <>{image}</>}

          {content && <CardContent>{content}</CardContent>}

          <CardFooter className='flex justify-center border-t border-gray-600 min-h-16 pt-2'>
            {footer && <div className='mx-1'>{footer}</div>}
            {isComplete ? (
              <CardAction className='mx-1 pt-2'>
                <ContinueButton ref={continueRef} onClick={onContinue}>
                  Continuar
                </ContinueButton>
              </CardAction>
            ) : (
              <>
                {onSkip && (
                  <button
                    onClick={onSkip}
                    className='mx-1 rounded-md border border-gray-400 px-3 py-1 text-sm transition hover:bg-gray-100'
                  >
                    Revelar
                  </button>
                )}
              </>
            )}
          </CardFooter>
        </Card>
      </div>

      {stars && <StarBurst stars={stars} />}
    </>
  );
}
