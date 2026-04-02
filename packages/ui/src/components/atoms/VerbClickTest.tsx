import { useState } from "react";
import { shuffle } from "../../lib/shuffle";
import {
  VerbConjugation,
  PronounId,
  PtPronouns,
} from "@workspace/webtypes/src/Types/Interfaces/Pronoun";
import { VerbCardLayout } from "./VerbCardLayout";
import { Button } from "../shadcn/button";

type Props = {
  verb: VerbConjugation;
  description?: string;
};

export function VerbClickTest({ verb, description }: Props) {
  const [forms, setForms] = useState(() =>
    shuffle(
      Object.entries(verb.forms).map(([id, text]) => ({
        id: id as PronounId,
        text,
      })),
    ),
  );
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);

  const nextPronounObj = (Object.keys(verb.forms) as PronounId[]).find(
    (id) => !matches[id],
  );

  function handleSelect(id: PronounId) {
    if (!nextPronounObj) return;
    const formObj = forms.find((f) => f.id === id);
    if (!formObj) return;

    if (formObj.text === verb.forms[nextPronounObj]) {
      setMatches({ ...matches, [nextPronounObj]: id });
      setForms(forms.filter((f) => f.id !== id));
    } else {
      setWrong(id);
      setTimeout(() => setWrong(null), 400);
    }
  }

  return (
    <VerbCardLayout
      title={verb.infinitive}
      description={description}
      nextPronounId={nextPronounObj}
      matches={matches}
      renderField={(pronounId) => {
        const matchedFormId = matches[pronounId];
        return matchedFormId ? <p>{verb.forms[pronounId]}</p> : null;
      }}
      onComplete={() => console.log("Alle antwoorden ingevuld!")}
    >
      <div className="flex flex-col items-center">
        <div className="wrap mt-2 flex flex-row flex-wrap justify-center gap-2">
          {forms.map((f) => (
            <button
              key={f.id}
              onClick={() => handleSelect(f.id)}
              className={`rounded-lg border px-3 py-2 transition ${
                wrong === f.id
                  ? "animate-shake border-red-400 bg-red-100"
                  : "border-gray-600 bg-gray-100 hover:bg-white"
              }`}
            >
              {f.text}
            </button>
          ))}
        </div>
      </div>
    </VerbCardLayout>
  );
}
