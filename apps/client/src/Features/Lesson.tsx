import { useEffect, useState } from 'react';
import axios from 'axios';

import { Spinner } from '@workspace/ui';
import { type LessonSummary } from '@workspace/webtypes';

import ImageComponent from '../Components/ImageComponent';

type LessonProps = {
  id: string;
};

type LessonState =
  | 'begin'
  | 'fetching'
  | 'loading'
  | 'ready'
  | 'started'
  | 'finished';

const Lesson = ({ id }: LessonProps) => {
  const [lesson, setLesson] = useState<LessonSummary | undefined>(undefined);
  const [state, setState] = useState<LessonState>('begin');

  useEffect(() => {
    const fetchLesson = async () => {
      if (state != 'begin') return;
      setState('fetching');
      try {
        const { data } = await axios.post('/api/lesson', { id: id });
        setLesson(data);
        setState('loading');
      } catch (err) {
        setState('finished');
      }
    };
    fetchLesson();
  }, []);

  const startLesson = () => {
    setState('ready');
  };

  return (
    <div className='mx-3'>
      <div className='self-center mx-0 lg:mx-2 pt-3'>
        {/* Foto */}
        <ImageComponent
          name={lesson?.image ?? ''}
          tree={['lessons', 'title']}
          size='full'
          className='flex flex-col w-full rounded-lg'
        />
        <div className='flex flex-col my-2 lg:mx-2'>
          <p className='text-lg mx-0 lg:text-2xl font-bold underline lg:my-2'>
            {lesson?.title}
          </p>
          <p className='lg:text-lg '>{lesson?.description}</p>
        </div>

        {state === 'loading' && (
          <div className='flex justify-center w-full my-4'>
            <div
              className='flex items-center gap-2 bg-gray-300 rounded-sm border-2 border-gray-400 shadow-2xl px-3 py-2'
              onClick={startLesson}
            >
              <Spinner className='h-8 w-8' />
              <span className='lg:text-lg font-medium mr-4'>
                Preparar a aula...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lesson;
