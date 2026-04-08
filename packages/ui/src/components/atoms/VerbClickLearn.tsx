import { useState } from "react";
import {
  VerbConjugation,
  PronounId,
} from "@workspace/webtypes/src/Types/Interfaces/Pronouns";
import { VerbCardLayout } from "./VerbCardLayout";
import { Button } from "../shadcn/button";

type Props = {
  verb: VerbConjugation;
  description?: string;
  onComplete?: () => void;
};

export function VerbClickLearn({ verb, description, onComplete }: Props) {
  const [matches, setMatches] = useState<Record<string, string>>({});

  const nextPronounObj = (Object.keys(verb.forms) as PronounId[]).find(
    (id) => !matches[id],
  );

  function handleNext() {
    if (!nextPronounObj) return;

    const newMatches = {
      ...matches,
      [nextPronounObj]: nextPronounObj,
    };

    setMatches(newMatches);

    const next = (Object.keys(verb.forms) as PronounId[]).find(
      (id) => !newMatches[id],
    );

    if (!next) {
      onComplete?.();
    }
  }

  return (
    <VerbCardLayout
      title={verb.infinitive}
      description={description ?? "Aprenda a conjugação"}
      nextPronounId={nextPronounObj}
      matches={matches}
      renderField={(pronounId) => {
        const matched = matches[pronounId];
        return matched ? <p>{verb.forms[pronounId]}</p> : null;
      }}
      onComplete={onComplete}
    >
      {/* 👇 Slechts één knop */}
      <div className="flex flex-col items-center">
        {nextPronounObj && (
          <Button
            onClick={handleNext}
            className="rounded-lg border px-4 py-2 bg-white border-gray-600 hover:bg-gray-200 text-black"
          >
            {verb.forms[nextPronounObj]}
          </Button>
        )}
      </div>
    </VerbCardLayout>
  );
}
