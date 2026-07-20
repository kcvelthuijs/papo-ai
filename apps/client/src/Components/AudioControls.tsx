import { useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

import type { OnOffState } from '@workspace/webtypes';

type Props = {
  onStateChanged?: (state: OnOffState) => void;
};

const AudioControls = ({ onStateChanged }: Props) => {
  const [audioState, setAudioState] = useState<OnOffState>('off');

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
    <div className='text-center'>
      <button
        onClick={toggleAudio}
        className='flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-200 border border-gray-400 dark:bg-gray-700 hover:scale-103 transition-transform'
      >
        {audioState === 'on' ? <FaVolumeUp /> : <FaVolumeMute />}
        {audioState === 'on' ? 'On' : 'Off'}
      </button>
    </div>
  );
};

export default AudioControls;
