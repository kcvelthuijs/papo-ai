import { useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

import { Button } from '@workspace/ui';
import type { OnOffState } from '@workspace/webtypes';

type Props = {
  onStateChanged?: (state: OnOffState) => void;
  className?: string;
};

const AudioControls = ({ onStateChanged, className }: Props) => {
  const [audioState, setAudioState] = useState<OnOffState>('off');

  const buttonStyle = `flex item-center text-black bg-gray-200 border-gray-400
      hover:bg-blue-300 hover:border-blue-600 border-2 ${className}`;

  const toggleAudio = async () => {
    const newState: OnOffState = audioState === 'on' ? 'off' : 'on';
    if (newState == 'on') {
      const ctx = new AudioContext();
      await ctx.resume();
    }
    setAudioState(newState);
    onStateChanged?.(newState);
  };

  return (
    <div className='flex flex-row flex-wrap gap-2'>
      <Button onClick={toggleAudio} className={`${buttonStyle}`}>
        {audioState === 'on' ? (
          <>
            <FaVolumeUp />
            <span className='hidden lg:inline'>Geluid is aan</span>
          </>
        ) : (
          <>
            <FaVolumeMute />
            <span className='hidden lg:inline'>Geluid is uit</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default AudioControls;
