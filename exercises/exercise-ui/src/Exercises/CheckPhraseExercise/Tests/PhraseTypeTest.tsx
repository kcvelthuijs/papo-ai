import { useState, useRef, useEffect } from 'react';

import { type Gap } from '@workspace/dtotypes';
import { Button, CardLayout } from '@workspace/ui';
import type { PhraseGapProps } from '@exercises/logic';

import { ExerciseInputBox } from '../../../components/atoms/ExerciseInputBox';

export function PhraseTypeTest({ exercise, onSubmit }: PhraseGapProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [stars, setStars] = useState<any[]>([]);

  const starIdRef = useRef(0);
  const inputRefs = useRef<Record<string, HTMLInputElement>>({});

  const Phrase = exercise.phrases[index];
  const isLast = index === exercise.phrases.length - 1;

  const gaps = Phrase ? Phrase.gaps : null;

  useEffect(() => {
    if (!gaps) return;

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
          scale: 0.4 + Math.random() * 0.4,
        };
        setStars((s) => [...s, star]);
        setTimeout(() => {
          setStars((s) => s.filter((x) => x.id !== star.id));
        }, 600);
      }, i * delay);
    }
  }

  function allCorrect(): boolean {
    if (!gaps) return true;
    else return gaps.every((g: any) => matches[g.id]);
  }

  // -------------------------
  // CheckGap
  // -------------------------
  async function checkGap(gap: any) {
    const value = answers[gap.id]?.trim().toLowerCase();
    if (!value) return;

    const correct = await onSubmit({ gapId: gap.id, value });
    if (correct) {
      const newMatches = {
        ...matches,
        [gap.id]: value,
      };
      setMatches(newMatches);
      spawnStars(gap.id);
      return;
    } else {
      setWrong(gap.id);
      setTimeout(() => setWrong(null), 400);
    }
  }

  // -------------------------
  // NEXT Phrase (carousel control)
  // -------------------------
  function nextPhrase() {
    const correct = allCorrect();
    if (!correct) return;
    setIndex((i) => i + 1);
  }

  // -------------------------
  // RENDER SINGLE Phrase
  // -------------------------
  return (
    <CardLayout
      title={exercise.title}
      description={exercise.description}
      stars={stars}
      complete={isLast && gaps?.every((g: any) => matches[g.id])}
      content={
        <div className='flex flex-col gap-6'>
          {/* Phrase */}
          <div className='flex flex-wrap items-center gap-2 text-lg'>
            {Phrase?.textParts.map((part: string, index: number) => {
              const gap = Phrase.gaps[index];

              return (
                <span key={index} className='flex items-center gap-2'>
                  <span>{part}</span>

                  {gap && (
                    <ExerciseInputBox
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
                          [gap.id]: e.target.value,
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
          <div className='text-sm text-gray-400'>{Phrase?.translation}</div>
        </div>
      }
      footer={
        allCorrect() &&
        !isLast && (
          <div className='flex justify-end gap-2'>
            <Button
              onClick={() => {
                nextPhrase();
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
