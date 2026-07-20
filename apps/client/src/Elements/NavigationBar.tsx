import type { OnOffState } from '@workspace/webtypes';
import { useSpeechStore } from '@workspace/controllers';

import AudioControls from '../Components/AudioControls';
import Avatar from '../Components/Avatar';
import MenuButton from '../Components/MenuButton';
import DarkLightToggle from '../Components/DarkLightToggle';
import SpeechSpeedControl from '../Components/SpeechSpeedControl';

const NavigationBar = () => {
  const onAudioOnOff = (state: OnOffState) => {
    useSpeechStore.getState().setEnabled(state === 'on');
  };

  const speed = useSpeechStore((s) => s.speed);
  const setSpeed = useSpeechStore((s) => s.setSpeed);

  return (
    <div>
      <div>
        <div className='relative flex flex-col self-start md:flex-row bg-gray-50 border-gray-400 dark:bg-gray-500 dark-border-gray-300 border-b p-2 shadow-sm'>
          {/* MenuButton altijd links 8*/}
          <div className='flex shrink-0'>
            <button title='Language' className='cursor-pointer'>
              <MenuButton />
            </button>
            <span className='flex-col self-center text-4xl p-0 pt-2 font-bold'>
              Diz-lá
            </span>
          </div>

          {/*  Spacer: indien van toepassing  */}
          <div className='hidden md:block md:flex-1' />

          {/* Hier kan je knoppen voor navigatie toevoegen */}
          <div className='flex flex-row self-center gap-2'>
            <SpeechSpeedControl speed={speed} onChange={setSpeed} />
            <AudioControls onStateChanged={onAudioOnOff} />
            <DarkLightToggle />
          </div>

          {/* Uiterst rechts staat de avatar */}
          <div className='absolute right-2 top-2 md:static md:ml-2'>
            <Avatar
              role='student'
              style={{
                width: '3.4rem',
                height: '3.4rem',
                transform: 'scaleX(-1)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
