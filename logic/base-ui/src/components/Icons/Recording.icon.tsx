import type { IconType } from 'react-icons';

import { FaMicrophone as StartRecording } from 'react-icons/fa';
import { FaMicrophone as StopRecording } from 'react-icons/fa';

export const StartRecordingIcon: IconType = (props) => {
  return <StartRecording {...props} />;
};
export const StopRecordingIcon: IconType = (props) => {
  return <StopRecording {...props} />;
};
