import { useState } from 'react';
import { shuffle, CardLayout, AnswerButton } from '@workspace/ui';
import { type PhrasePiece } from '../Exercises/CheckPhraseExercise/Tests/GapClickTest';

type PhraseClickTestProps = {
  title?: string;
  description?: string;
  Phrase: string[]; // zin in juiste volgorde, gesplitst
  onComplete?: () => void;
};

export function PhraseClickTestEvaluate({
  title,
  description,
  Phrase,
  onComplete,
}: PhraseClickTestProps) {
  // maak automatisch unieke ids
  const pieces: PhrasePiece[] = Phrase.map((text, index) => ({
    id: `piece-${index}`,
    text,
  }));

  const [available, setAvailable] = useState(() => shuffle(pieces));
  const [selected, setSelected] = useState<PhrasePiece[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);

  const nextPiece = pieces[selected.length]; // volgende correct te kiezen stuk
  const complete = selected.length === pieces.length;

  function handleSelect(piece: PhrasePiece) {
    if (piece.id === nextPiece.id) {
      const newSelected = [...selected, piece];

      setSelected(newSelected);
      setAvailable(available.filter((p) => p.id !== piece.id));

      if (newSelected.length === pieces.length) {
        onComplete?.();
      }
    } else {
      setWrong(piece.id);
      setTimeout(() => setWrong(null), 400);
    }
  }

  // content voor CardContent
  const content = (
    <div className='flex flex-wrap gap-2 min-h-8 mb-4 justify-center'>
      {selected.map((piece) => (
        <span
          key={piece.id}
          className='px-3 py-1 bg-green-200 text-green-800 rounded'
        >
          {piece.text}
        </span>
      ))}
    </div>
  );

  // children voor CardFooter: beschikbare stukken
  const children = (
    <div className='flex flex-wrap gap-2 justify-center'>
      {available.map((piece) => (
        <AnswerButton
          id={piece.id}
          state={wrong === piece.id}
          onClick={() => handleSelect(piece)}
        >
          {piece.text}
        </AnswerButton>
      ))}
    </div>
  );

  return (
    <CardLayout
      title={title ?? 'Title'}
      description={description ?? 'Description'}
      content={content}
      footer={children}
      complete={complete}
      onComplete={onComplete}
    />
  );
}
