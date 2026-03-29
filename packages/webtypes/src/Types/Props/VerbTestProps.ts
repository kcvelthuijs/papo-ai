import { type VerbConjugation } from "../Interfaces/Pronoun"

export type VerbTestMode = "click" | "type"

export type VerbTestProps = {
  verb: VerbConjugation
  description?: string
  mode?: VerbTestMode
}
