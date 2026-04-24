import { ReactNode } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction
} from '../shadcn/card';
import { Button } from '../shadcn/button';
import StarBurst from '../animations/starburst';

type CardLayoutProps = {
  title?: string;
  description?: string;
  content?: ReactNode; // componenten voor CardContent
  footer?: ReactNode; // voor content in CardFooter of extra knoppen
  stars?: any; // optioneel voor animaties zoals StarBurst
  complete?: boolean;
  onComplete?: () => void;
};

export function CardLayout({
  title,
  description,
  footer,
  stars,
  complete,
  onComplete,
  content
}: CardLayoutProps) {
  return (
    <div className='min-h-screen bg-gray-300 shadow-lg xl:flex xl:justify-center dark:bg-gray-900'>
      <div className='h-[calc(100vh-5rem)] bg-gray-100 p-4 sm:w-full xl:w-300 xl:border-r xl:border-l xl:border-gray-400 dark:border-gray-800 dark:bg-gray-700'>
        <div className='flex flex-row justify-center'>
          <Card className='mt-2 flex w-120 flex-col justify-center border-gray-500'>
            {title && (
              <CardHeader className='border-b border-gray-600'>
                <CardTitle className='text-center text-2xl font-semibold'>
                  {title}
                </CardTitle>
                {description && (
                  <CardDescription className='pb-2 text-center font-semibold'>
                    {description}
                  </CardDescription>
                )}
              </CardHeader>
            )}

            {content && <CardContent>{content}</CardContent>}

            <CardFooter className='flex justify-center border-t border-gray-600 min-h-16 pt-2'>
              {footer && <div className='mx-1'>{footer}</div>}
              {complete && (
                <CardAction className='mx-1'>
                  <Button onClick={onComplete}>Continuar</Button>
                </CardAction>
              )}
            </CardFooter>
          </Card>
        </div>

        {stars && <StarBurst stars={stars} />}
      </div>
    </div>
  );
}
