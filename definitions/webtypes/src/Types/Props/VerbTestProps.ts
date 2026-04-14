import { type VerbConjugation } from "../Interfaces/Pronouns"

export type VerbTestMode = "click" | "type"

export type VerbTestProps = {
  verb: VerbConjugation
  description?: string
  mode?: VerbTestMode
}
