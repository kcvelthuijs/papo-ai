import { ReactNode, useEffect, useRef, useState } from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '../shadcn/card';

import StarBurst from '../animations/starburst';
import { ActionButton } from './ActionButton';
import { CloseButton } from '../buttons/CloseButton';
import { OkCancelDialog } from '../dialogs/OkCancelDialog';

type CardLayoutProps = {
  title?: string;
  description?: string;
  image?: ReactNode | null;
  content?: ReactNode; // componenten voor CardContent
  footer?: ReactNode; // voor content in CardFooter of extra knoppen
  stars?: any; // optioneel voor animaties zoals StarBurst
  isComplete?: boolean;
  takesFullScreen?: boolean;
  onContinue?: () => void;
  onSkip?: () => void;
  onClose?: () => void;
};

export function CardLayout({
  title,
  description,
  image,
  content,
  footer,
  stars,
  isComplete,
  takesFullScreen = false,
  onContinue,
  onSkip,
  onClose,
}: CardLayoutProps) {
  const continueRef = useRef<HTMLButtonElement | null>(null);

  const [showCancelLesson, setShowCancelLesson] = useState(false);

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

  const confirmClose = () => {
    setShowCancelLesson(true);
  };

  const scrollCard = takesFullScreen
    ? 'h-[calc(100vh-9rem)] overflow-hidden'
    : 'justify-center';
  const scrollContent = takesFullScreen ? 'flex-1 min-h-0 overflow-y-auto' : '';

  return (
    <>
      <div className='flex flex-row justify-center'>
        <Card
          className={`flex l:w-180 w-full flex-col border-gray-500 gap-0  whitespace-pre-line ${scrollCard}`}
        >
          {title && (
            <CardHeader className='border-b border-gray-600'>
              <CardTitle className='flex items-center'>
                <div className='flex-1 text-center text-3xl font-semibold'>
                  {title.replace(/\\n/g, '\n')}
                </div>
                <CloseButton
                  className='flex-col w-8 right-3 top-3 rounded p-1 text-xl leading-none'
                  onClick={confirmClose}
                />
              </CardTitle>
              {description && (
                <CardDescription className='pb-2 text-center text-xl font-semibold'>
                  {description}
                </CardDescription>
              )}
            </CardHeader>
          )}
          {image && <>{image}</>}

          {content && (
            <CardContent className={`${scrollContent}`}>{content}</CardContent>
          )}

          <CardFooter className='flex-none flex w-full justify-center border-t border-gray-600 min-h-16 pt-2'>
            {isComplete ? (
              <CardAction className='pt-2'>
                <ActionButton ref={continueRef} onClick={onContinue}>
                  Continuar
                </ActionButton>
              </CardAction>
            ) : (
              <>
                {footer && footer.toString().length > 1 && (
                  <div className='mx-1 w-full'>{footer}</div>
                )}
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

      {onClose && (
        <OkCancelDialog
          open={showCancelLesson}
          title='Les afbreken'
          message='Weet je zeker dat je deze les wilt afbreken?'
          onOk={onClose!}
          onCancel={() => setShowCancelLesson(false)}
        />
      )}
    </>
  );
}
