import type {
  PronounId as dtoPronounId,
  Pronoun as dtoPronoun,
  VerbConjugation as dtoVerbConjugation,
  VerbForms as dtoVerbForms,
} from '@workspace/dtotypes';
import { PtPronouns as dtoPtPronouns } from '@workspace/dtotypes';

// Neem de definities over uit de dto
export type PronounId = dtoPronounId;
export type Pronoun = dtoPronoun;
export type VerbConjugation = dtoVerbConjugation;
export type VerbForms = dtoVerbForms;

export const PtPronouns = dtoPtPronouns;
