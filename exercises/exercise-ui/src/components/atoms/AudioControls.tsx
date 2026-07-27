import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

import { useSpeechStore } from '@workspace/controllers';

export const AudioControls = () => {
  const audioOn = useSpeechStore((state) => state.enabled);
  const setEnabled = useSpeechStore((state) => state.setEnabled);

  const toggleAudio = () => {
    setEnabled(!audioOn);
  };

  return (
    <div className='text-center'>
      <button
        onClick={toggleAudio}
        className='flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-200 border border-gray-400 dark:bg-gray-700 dark:border-black hover:scale-103 transition-transform'
      >
        {audioOn ? <FaVolumeUp /> : <FaVolumeMute />}
        {audioOn ? 'On' : 'Off'}
      </button>
    </div>
  );
};
