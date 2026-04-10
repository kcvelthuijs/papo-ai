import { Button } from "@workspace/ui/components/shadcn/button";
import { useAudioStore } from "../Stores/AudioStore";

import {
  PiPlay,
  PiPause,
  PiStop,
  PiSkipBack,
  PiSkipForward
} from "react-icons/pi";

type Props = {
  className?: string;
};

const AudioPlayer = ({ className }: Props) => {
  const { current, isPaused, pause, resume, restart, skip, stop } =
    useAudioStore();

  // Geen audio om af te spelen → niks renderen
  if (!current) return null;

  return (
    <div
      className={`flex flex-col gap-3 p-4 items-start rounded-xl ${className}`}
    >
      {/* Huidige zin */}
      <div className="self-start grow font-medium text-lg">{current.text}</div>

      {/* Playback controls */}
      <div className="flex-row self-start gap-2 opacity-50 text-black font-bold">
        <Button className="mx-2" onClick={restart}>
          <PiSkipBack />
        </Button>
        {isPaused ? (
          <Button className="mx-2" onClick={resume}>
            <PiPlay />
          </Button>
        ) : (
          <Button className="mx-2" onClick={pause}>
            <PiPause />
          </Button>
        )}
        <Button className="mx-2" onClick={skip}>
          <PiSkipForward />
        </Button>
        <Button className="mx-2" onClick={stop}>
          <PiStop />
        </Button>
      </div>
    </div>
  );
};

export default AudioPlayer;
