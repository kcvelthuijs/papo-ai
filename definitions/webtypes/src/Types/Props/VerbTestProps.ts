import { type VerbConjugation } from "@workspace/dtotypes/src/Types/Pronouns"

export type VerbTestMode = "click" | "type"

export type VerbTestProps = {
  verb: VerbConjugation
  description?: string
  mode?: VerbTestMode
}
