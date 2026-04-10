import { AudioQueue } from "./Utilities/AudioQueue";
import { useAudioStore } from "./Stores/AudioStore";

export function initAudioBridge() {
  AudioQueue.subscribe((task) => {
    useAudioStore.setState({
      current: task,
      isBusy: task !== null || AudioQueue.hasQueue()
    });
  });
}
