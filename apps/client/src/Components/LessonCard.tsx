import {
  Badge,
  ActionButton,
  Card,
  CardAction,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@workspace/ui';
import { type LessonCardProps } from '@workspace/webtypes';

import ImageComponent from './ImageComponent';

const classesByType: { [type: string]: string } = {
  diálogo:
    'font-semibold bg-blue-600 border-blue-900 text-white dark:bg-blue-800 dark-border-blue-900 dark:text-white',
  notícias:
    'font-semibold bg-red-700 border-red-900 text-white dark:bg-red-700 dark:border-red-900 dark:text-white ',
  previsão:
    'font-semibold bg-red-700 border-red-900 text-white dark:bg-red-700 dark:border-red-900 dark:text-white',
  grammar:
    'font-semibold bg-green-500 border-yellow-900 text-green-800 dark:bg-green-500 dark:border-yellow-900 dark:text-green-800 ',
  vocabulário:
    'font-semibold bg-yellow-300 border-yellow-900 text-yellow-800 dark:bg-yellow-300 dark:border-yellow-900 dark:text-yellow-800',
};

export const LessonCardSkeleton = () => {
  return (
    <Card className='relative overflow-hidden mx-auto w-full max-w-sm pt-0 pb-3 bg-gray-100 border-gray-500 dark:bg-gray-500 dark:border-gray-300'>
      <Skeleton className='w-95 h-53 animate-pulse bg-gray-200 ' />
      <CardHeader className='px-2 m-0'>
        <CardAction>
          <Skeleton className='w-16 h-9 animate-pulse bg-gray-200 [animation-delay:0.2s]' />
        </CardAction>
        <CardTitle className='text-lg pt-1'>
          <Skeleton className='w-70 h-8 animate-pulse bg-gray-200 [animation-delay:0.4s]' />
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export const LessonCard = ({ lesson, onSelectLesson }: LessonCardProps) => {
  return (
    <Card
      id={lesson.id}
      className='relative overflow-hidden mx-auto w-full max-w-sm h-65 pt-0 pb-3 bg-gray-100 border-gray-500 dark:bg-gray-500 dark:border-gray-500 border-1'
      onClick={(e: any) => {
        e.stopPropagation();
        onSelectLesson(lesson.id);
      }}
    >
      {lesson.type && (
        <Badge
          variant='destructive'
          className={`z-30 absolute flex self-end m-2 py-1 px-2 border ${classesByType[lesson.type] || 'bg-gray-300 border-gray-500'}`}
        >
          {lesson.type}
        </Badge>
      )}

      <ImageComponent
        name={lesson.image}
        tree={['lessons', 'title']}
        size='small'
        className='w-100 h-50'
      />

      <CardHeader className='px-2 m-0'>
        <CardAction>
          <ActionButton className='cursor-pointer'>Start</ActionButton>
        </CardAction>
        <CardTitle className='text-lg p-0'>{lesson.title}</CardTitle>
      </CardHeader>
    </Card>
  );
};
