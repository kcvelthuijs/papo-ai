export type PronounId = "p1ev" | "p2ev" | "p3ev" | "p1mv" | "p2mv" | "p3mv"

export type TenseId =
  | "presente"
  | "pretérito imperfeito"
  | "pretérito perfeito"
  | "pretério mais-que-perfeito"
  | "futuro do presente"
  | "futuro do pretérito"
  | "pretérito perfeito composto"
  | "pretérito mais-que-perfeito composto"
  | "futuro do presente composto"
  | "futuro do pretérito composto"
  | "afirmativo"
  | "negativo"
  | "infinitivo pessoal"
  | "infinitivo pessoal composto"

export type Pronoun = {
  id: PronounId
  text: string
}

export const PtPronouns: Pronoun[] = [
  { id: "p1ev", text: "eu" },
  { id: "p2ev", text: "tu" },
  { id: "p3ev", text: "ele/ela/você" },
  { id: "p1mv", text: "nós" },
  { id: "p2mv", text: "vocês" },
  { id: "p3mv", text: "eles/elas" },
]

export type VerbForms = Record<PronounId, string>

export type VerbConjugation = {
  infinitive: string
  tense: TenseId
  forms: VerbForms
}
