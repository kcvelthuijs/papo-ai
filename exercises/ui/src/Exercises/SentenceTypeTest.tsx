import { useState, useRef, useEffect } from 'react';
import { Button } from '../shadcn/button';

import { CardLayout } from '../atoms/CardLayout';
import { ExerciseInput } from '../atoms/ExerciseInput';
import { Gap } from '@workspace/webtypes/src/Types/Interfaces/Exercise';

type Props = {
  exercise: any;
  description?: string;
  onRight?: (data: any) => void;
  onWrong?: (data: any) => void;
  onComplete?: () => void;
};

export function SentenceTypeTest({
  exercise,
  description,
  onRight,
  onWrong,
  onComplete
}: Props) {
  const [index, setIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [stars, setStars] = useState<any[]>([]);

  const starIdRef = useRef(0);
  const inputRefs = useRef<Record<string, HTMLInputElement>>({});

  const sentence = exercise.sentences[index];
  const isLast = index === exercise.sentences.length - 1;

  const gaps = sentence.gaps;

  useEffect(() => {
    const next = gaps.find((g: Gap) => !matches[g.id]);
    if (next?.id) {
      const el = inputRefs.current[next.id];
      if (el) {
        setTimeout(() => {
          el.focus();
        }, 0);
      }
    }
  }, [matches, gaps]);

  // -------------------------
  // Stars
  // -------------------------
  function spawnStars(gapId: string, count = 3, delay = 100) {
    const rect = inputRefs.current[gapId]?.getBoundingClientRect();
    if (!rect) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const star = {
          id: starIdRef.current++,
          x: rect.left + Math.random() * rect.width,
          y: rect.top + (Math.random() * rect.height) / 2,
          rotation: Math.random() * 360,
          scale: 0.4 + Math.random() * 0.4
        };

        setStars((s) => [...s, star]);

        setTimeout(() => {
          setStars((s) => s.filter((x) => x.id !== star.id));
        }, 600);
      }, i * delay);
    }
  }

  function allCorrect(): boolean {
    return gaps.every((g: any) => matches[g.id]);
  }

  // -------------------------
  // CheckGap
  // -------------------------
  function checkGap(gap: any) {
    const value = answers[gap.id]?.trim().toLowerCase();
    if (!value) return;

    const correct = gap.correct.toLowerCase();
    if (value === correct) {
      onRight?.({ id: gap.id, text: value });
      const newMatches = {
        ...matches,
        [gap.id]: value
      };
      setMatches(newMatches);
      spawnStars(gap.id);
      return;
    }

    onWrong?.({ id: gap.id, text: value });
    setWrong(gap.id);
    setTimeout(() => setWrong(null), 400);
  }

  // -------------------------
  // NEXT SENTENCE (carousel control)
  // -------------------------
  function nextSentence() {
    const correct = allCorrect();
    if (!correct) return;
    if (isLast) {
      onComplete?.();
      return;
    }
    setIndex((i) => i + 1);
  }

  // -------------------------
  // RENDER SINGLE SENTENCE
  // -------------------------
  return (
    <CardLayout
      title='Complete the sentences'
      description={description}
      stars={stars}
      complete={isLast && gaps.every((g: any) => matches[g.id])}
      content={
        <div className='flex flex-col gap-6'>
          {/* SENTENCE */}
          <div className='flex flex-wrap items-center gap-2 text-lg'>
            {sentence.textParts.map((part: string, index: number) => {
              const gap = sentence.gaps[index];

              return (
                <span key={index} className='flex items-center gap-2'>
                  <span>{part}</span>

                  {gap && (
                    <ExerciseInput
                      ref={(el: HTMLInputElement | null) => {
                        if (el) inputRefs.current[gap.id] = el;
                      }}
                      value={answers[gap.id] || ''}
                      size={(answers[gap.id]?.length || 1) + 1}
                      state={
                        wrong === gap.id
                          ? 'wrong'
                          : matches[gap.id]
                            ? 'correct'
                            : 'idle'
                      }
                      disabled={!!matches[gap.id]}
                      onChange={(e: any) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [gap.id]: e.target.value
                        }))
                      }
                      onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                          checkGap(gap);
                        }
                      }}
                    />
                  )}
                </span>
              );
            })}
          </div>

          {/* TRANSLATION */}
          <div className='text-sm text-gray-400'>{sentence.translation}</div>
        </div>
      }
      footer={
        allCorrect() &&
        !isLast && (
          <div className='flex justify-end gap-2'>
            <Button
              onClick={() => {
                nextSentence();
              }}
            >
              Continuar
            </Button>
          </div>
        )
      }
    />
  );
}
