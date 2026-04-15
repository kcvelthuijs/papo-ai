import { useState } from "react";
import { shuffle } from "../../lib/shuffle";
import {
  VerbConjugation,
  PronounId,
  type Pronoun
} from "@workspace/webtypes/src/Types/Interfaces/Pronouns";
import { VerbCardLayout } from "../atoms/VerbCardLayout";
import { AnswerButton } from "../atoms/AnswerButton";

type Props = {
  verb: VerbConjugation;
  description?: string;
  onRight?: (data: any) => void;
  onWrong?: (data: any) => void;
  onComplete?: () => void;
};

export function VerbClickTest({
  verb,
  description,
  onRight,
  onWrong,
  onComplete
}: Props) {
  const [forms, setForms] = useState(() =>
    shuffle(
      Object.entries(verb.forms).map(([id, text]) => ({
        id: id as PronounId,
        text
      }))
    )
  );
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);

  const nextPronounObj = (Object.keys(verb.forms) as PronounId[]).find(
    (id) => !matches[id]
  );

  function handleRight(verb: Pronoun) {
    if (onRight) onRight(verb);
  }

  function handleWrong(verb: Pronoun) {
    if (onWrong) onWrong(verb);
  }

  function handleSelect(id: PronounId) {
    if (!nextPronounObj) return;
    const formObj = forms.find((f) => f.id === id);
    if (!formObj) return;

    if (formObj.text === verb.forms[nextPronounObj]) {
      handleRight({ id: nextPronounObj, text: formObj.text });
      console.log("handleSelect", formObj, nextPronounObj);
      setMatches({ ...matches, [nextPronounObj]: id });
      setForms(forms.filter((f) => f.id !== id));
    } else {
      handleWrong(formObj);
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
      onComplete={onComplete}
    >
      <div className="flex flex-col items-center">
        <div className="wrap mt-2 flex flex-row flex-wrap justify-center gap-2">
          {forms.map((f) => (
            <AnswerButton
              id={f.id}
              state={wrong === f.id}
              onClick={() => handleSelect(f.id)}
            >
              {f.text}
            </AnswerButton>
          ))}
        </div>
      </div>
    </VerbCardLayout>
  );
}
