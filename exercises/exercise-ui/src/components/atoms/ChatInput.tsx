import { useState, type KeyboardEvent } from 'react';
import { Button, ArrowUpIcon, AudioRecorder } from '@workspace/ui';

type Props = {
  onSubmit: (data: string) => void;
  onAudio?: (audio: Blob) => void;
  isDisabled?: boolean;
};

export function ChatInput({ onSubmit, onAudio, isDisabled }: Props) {
  const [value, setValue] = useState('');

  function handleSubmit() {
    if (!value.trim()) return;
    onSubmit(value);
    setValue('');
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function onRecordingReady() {}

  return (
    <div className='flex gap-2 border rounded-2xl p-2'>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        className='flex-1 resize-none outline-none'
        placeholder='Typ je bericht...'
      />

      <div className='flex overlay flex-row items-start justify-end gap-1'>
        <div>
          <AudioRecorder onReady={onRecordingReady} />
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            disabled={isDisabled}
            className='rounded-full w-10 h-10'
          >
            <ArrowUpIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
