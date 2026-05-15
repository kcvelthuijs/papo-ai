import { useRef, useState } from 'react';

export type ExerciseStar = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
};

export function useExerciseStars() {
  // ---------------------------------------------------
  // STATE
  // ---------------------------------------------------
  const [stars, setStars] = useState<ExerciseStar[]>([]);

  // ---------------------------------------------------
  // REFS
  // ---------------------------------------------------
  const elementRefs = useRef<Record<string, HTMLElement>>({});
  const starIdRef = useRef(0);

  // ---------------------------------------------------
  // REGISTER ELEMENT
  // ---------------------------------------------------
  function registerStarRef(id: string, el: HTMLElement | null) {
    if (!el || !id) return;
    elementRefs.current[id] = el;
  }

  // ---------------------------------------------------
  // SPAWN STARS
  // ---------------------------------------------------
  function spawnStars(id: string, count = 3, delay = 100) {
    const rect = elementRefs.current[id]?.getBoundingClientRect();
    if (!rect) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const star = {
          id: starIdRef.current++,
          x: rect.left + Math.random() * rect.width,
          y: rect.top + Math.random() * rect.height,
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
  // ---------------------------------------------------
  // CLEAR ALL
  // ---------------------------------------------------
  function clearStars() {
    setStars([]);
  }

  // ---------------------------------------------------
  // API
  // ---------------------------------------------------
  return {
    stars,
    spawnStars,
    clearStars,
    registerStarRef,
  };
}
