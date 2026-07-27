import { TiMinus, TiPlus } from 'react-icons/ti';
import { FaSquare, FaRegSquare } from 'react-icons/fa';

import { useSpeechStore } from '@workspace/controllers';

export default function SpeechSpeedControl() {
  const speed = useSpeechStore((s) => s.speed);
  const setSpeed = useSpeechStore((s) => s.setSpeed);

  const decrease = () => setSpeed(Math.max(0, speed - 1));
  const increase = () => setSpeed(Math.min(5, speed + 1));

  return (
    <div className='flex flex-row text-center px-0.5  rounded-xl bg-gray-200 border border-gray-400 dark:bg-gray-700 dark:border-black'>
      <div className='flex flex-col items-center self-center gap-3 px-2'>
        <button
          onClick={decrease}
          className='text-xl hover:scale-110 transition-transform'
        >
          <TiMinus />
        </button>
      </div>
      <div className='flex flex-col'>
        <p className='text-xs py-0.5'>speech speed</p>
        <div className='flex gap-0.5'>
          {Array.from({ length: 5 }, (_, i) =>
            i < speed ? <FaSquare key={i} /> : <FaRegSquare key={i} />
          )}
        </div>
      </div>
      <div className='flex flex-col items-center self-center  gap-3 px-2'>
        <button
          onClick={increase}
          className='text-xl hover:scale-110 transition-transform'
        >
          <TiPlus />
        </button>
      </div>
    </div>
  );
}
