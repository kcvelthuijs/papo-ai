import { useEffect, useState } from 'react';

import type { CardItem } from '@workspace/dtotypes';
import { CardLayout } from '@workspace/ui';
import { ImageView } from '../../../Components/Atoms/ImageView';
import type { CardExerciseProps } from '@exercises/logic';

export function CardLearn({
  exercise,
  onComplete,
  handleAudio,
}: CardExerciseProps) {
  // -------------------------
  // STATE
  // -------------------------
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [busy, setBusy] = useState(false);

  // -------------------------
  // ACTIVE CARD
  // -------------------------
  const active: CardItem | undefined = exercise.items[index];
  const isComplete = index >= exercise.items.length - 1 && revealed;

  const audioReady = () => {
    setBusy(false);
  };

  useEffect(() => {
    const callAudio = async () => {
      setBusy(true);
      if (handleAudio !== undefined)
        await handleAudio(active?.response ?? '', audioReady);
    };
    if (active) callAudio();
  }, [index]);

  // -------------------------
  // REVEAL / HIDE
  // -------------------------
  function toggleReveal() {
    setRevealed((prev) => !prev);
  }

  // -------------------------
  // NEXT CARD
  // -------------------------
  async function next() {
    // laatste kaart
    if (index >= exercise.items.length - 1) {
      await onComplete('end');
      return;
    }

    // volgende kaart
    setIndex((prev) => prev + 1);
    setRevealed(false);
  }

  // -------------------------
  // PREVIOUS CARD
  // -------------------------
  function previous() {
    if (index <= 0) return;

    setIndex((prev) => prev - 1);
    setRevealed(false);
  }

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <CardLayout
      title={exercise.title}
      description={exercise.description}
      isComplete={isComplete}
      onContinue={next}
      image={
        <ImageView
          name={active?.name ?? ''}
          tree={active?.tree ?? []}
          size='none'
          className='w-full h-auto object-contain pt-0 mt-0 gap-0'
        />
      }
      content={
        <div className='flex flex-col gap-6'>
          {/* CARD */}
          <div className='flex w-full flex-col items-center justify-center'>
            {/* question or answer */}
            <div className='text-center text-2xl font-semibold py-3'>
              {revealed ? active?.question : active?.response}
            </div>
          </div>

          {/* HINT */}
          {active?.hint && (
            <div className='text-center text-sm text-gray-400'>
              {active.hint}
            </div>
          )}
        </div>
      }
      footer={
        <div className='flex flex-row gap-2'>
          {/* PREVIOUS */}
          <button
            onClick={previous}
            disabled={index === 0 || busy}
            className='rounded-md border border-gray-400 px-3 py-1 text-sm transition hover:bg-gray-100 disabled:opacity-40'
          >
            ← Anterior
          </button>

          {/* REVEAL */}
          <button
            onClick={toggleReveal}
            className='rounded-md border border-gray-400 px-3 py-1 text-sm transition hover:bg-gray-100'
          >
            {revealed ? 'Ocultar' : 'Revelar'}
          </button>

          {/* NEXT */}
          {!isComplete && (
            <button
              onClick={next}
              disabled={busy}
              className='rounded-md border border-gray-400 px-3 py-1 text-sm transition hover:bg-gray-100 disabled:opacity-40'
            >
              Próxima →
            </button>
          )}
        </div>
      }
    />
  );
}
