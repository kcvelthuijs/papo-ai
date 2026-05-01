import type {
  PronounId as dtoPronounId,
  Pronoun as dtoPronoun,
  VerbFormTable as dtoVerbConjugation,
  VerbFormRow as dtoVerbFormRow,
  CheckVerbExercise,
} from '@workspace/dtotypes';
import { PtPronouns as dtoPtPronouns } from '@workspace/dtotypes';

// Neem de definities over uit de dto
export type PronounId = dtoPronounId;
export type Pronoun = dtoPronoun;
export type VerbConjugation = dtoVerbConjugation;
export type VerbFormRow = dtoVerbFormRow;
export const PtPronouns = dtoPtPronouns;

export function buildVerbForms(exercise: CheckVerbExercise): VerbFormRow[] {
  return PtPronouns.map((p) => ({
    id: p.id,
    pronoun: p.text,
    tense: exercise.tense,
    form: exercise.forms[p.id] ?? '',
  }));
}
