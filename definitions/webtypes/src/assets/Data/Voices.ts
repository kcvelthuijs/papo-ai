export type Sex = "male" | "female";
export type Pitch = "high" | "low";

export type VoiceParams = {
  sex: Sex;
  pitch: Pitch;
};

export const Voices: Record<string, VoiceParams> = {
  alloy: {
    sex: "female",
    pitch: "high"
  },
  ash: {
    sex: "female",
    pitch: "high"
  },
  ballad: {
    sex: "female",
    pitch: "high"
  },
  cedar: {
    sex: "female",
    pitch: "high"
  },
  coral: {
    sex: "female",
    pitch: "high"
  },
  echo: {
    sex: "female",
    pitch: "high"
  },
  fable: {
    sex: "female",
    pitch: "high"
  },
  marin: {
    sex: "female",
    pitch: "high"
  },
  nova: {
    sex: "female",
    pitch: "high"
  },
  onyx: {
    sex: "female",
    pitch: "high"
  },
  sage: {
    sex: "female",
    pitch: "high"
  },
  shimmer: {
    sex: "female",
    pitch: "high"
  },
  verse: {
    sex: "female",
    pitch: "high"
  }
};
