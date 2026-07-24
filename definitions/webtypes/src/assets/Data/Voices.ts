export type Sex = 'male' | 'female';
export type Pitch = 'high' | 'low';

export type VoiceParams = {
  sex: Sex;
  pitch: Pitch;
  volume?: number;
  speed?: number;
};

export const Voices: Record<string, VoiceParams> = {
  alloy: {
    sex: 'male',
    pitch: 'high',
    volume: 1.0,
    speed: 0.9,
  },
  ash: {
    sex: 'male',
    pitch: 'low',
    volume: 1.1,
    speed: 1.3,
  },
  ballad: {
    sex: 'male',
    pitch: 'high',
    volume: 1.2,
    speed: 1.0,
  },
  cedar: {
    sex: 'male',
    pitch: 'high',
    volume: 1.0,
    speed: 0.9,
  },
  coral: {
    sex: 'female',
    pitch: 'high',
    volume: 1.6,
    speed: 1.0,
  },
  echo: {
    sex: 'female',
    pitch: 'high',
    volume: 1.15,
    speed: 1.0,
  },
  fable: {
    sex: 'male',
    pitch: 'high',
    volume: 1.2,
    speed: 0.8,
  },
  marin: {
    sex: 'female',
    pitch: 'high',
    volume: 1.3,
    speed: 1.0,
  },
  nova: {
    sex: 'female',
    pitch: 'high',
    volume: 0.95,
    speed: 0.9,
  },
  onyx: {
    sex: 'male',
    pitch: 'low',
    volume: 1.2,
    speed: 1.0,
  },
  sage: {
    sex: 'female',
    pitch: 'high',
    volume: 3.0,
    speed: 1.1,
  },
  verse: {
    sex: 'male',
    pitch: 'high',
    volume: 1.8,
    speed: 1.0,
  },
};
