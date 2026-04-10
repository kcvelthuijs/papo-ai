import type { Blob } from "node:buffer";

export type OnOffState = "on" | "off";

export type AudioTask = {
  id: string; 
  text: string; 
  blob: Blob; 
  voice: string; 
};