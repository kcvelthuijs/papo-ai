import { create } from "zustand";
import type { AvatarFullConfig } from "react-nice-avatar";

const DEFAULT_AVATARS: Record<string, AvatarFullConfig> = {
  default: {
    sex: "man",
    faceColor: "#F9C9B6",
    earSize: "small",
    eyeStyle: "oval",
    noseStyle: "short",
    mouthStyle: "peace",
    shirtStyle: "hoody",
    glassesStyle: "none",
    hairColor: "#000",
    hairStyle: "thick",
    hatStyle: "none",
    hatColor: "#F48150",
    shirtColor: "#FC909F",
    bgColor: "#D2EFF3"
  }
};

type Role = string;

type AvatarState = {
  avatarsByRole: Partial<Record<Role, AvatarFullConfig>>;

  // ophalen met fallback (optioneel handig)
  getAvatar: (role: Role) => AvatarFullConfig;

  // whole replace
  setAvatar: (role: Role, avatar: AvatarFullConfig) => void;

  // partial update
  updateAvatar: (role: Role, partial: Partial<AvatarFullConfig>) => void;

  // init role als die nog niet bestaat
  ensureRole: (role: Role, initial?: AvatarFullConfig) => void;
};

export const useAvatarStore = create<AvatarState>((set, get) => ({
  avatarsByRole: { ...DEFAULT_AVATARS },

  getAvatar: (role) => {
    const found = get().avatarsByRole[role];
    if (found) return found;

    // fallback: maak 'm aan met default (of leeg)
    const fallback = DEFAULT_AVATARS.default;

    // optioneel: direct opslaan zodat consistent blijft
    set((state) => ({
      avatarsByRole: { ...state.avatarsByRole, [role]: fallback }
    }));
    return fallback;
  },

  setAvatar: (role, avatar) =>
    set((state) => ({
      avatarsByRole: { ...state.avatarsByRole, [role]: avatar }
    })),

  updateAvatar: (role, partial) =>
    set((state) => {
      const current = state.avatarsByRole[role] ?? DEFAULT_AVATARS.default;
      return {
        avatarsByRole: {
          ...state.avatarsByRole,
          [role]: { ...current, ...partial }
        }
      };
    }),

  ensureRole: (role, initial) =>
    set((state) => {
      if (state.avatarsByRole[role]) return state;
      return {
        avatarsByRole: {
          ...state.avatarsByRole,
          [role]: initial ?? DEFAULT_AVATARS.default
        }
      };
    })
}));
