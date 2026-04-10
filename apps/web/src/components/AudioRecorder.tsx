import { useRef, useState } from 'react';
import { FaMicrophone as StartRecordingIcon } from 'react-icons/fa';
import { FaMicrophone as StopRecordingIcon } from 'react-icons/fa';

type Props = {
   className?: string;
   onReady?: (audio: Blob) => void;
};

function AudioRecorder({ className, onReady }: Props) {
   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
   const audioChunksRef = useRef<Blob[]>([]);
   const [isRecording, setIsRecording] = useState(false);

   const startRecording = async () => {
      // Guard: voorkomt dubbel starten
      if (mediaRecorderRef.current) {
         return;
      }

      // Check of browser audio ondersteunt
      if (!navigator.mediaDevices?.getUserMedia) {
         console.error('getUserMedia wordt niet ondersteund');
         return;
      }

      try {
         const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
         });

         const recorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm;codecs=opus',
         });
         mediaRecorderRef.current = recorder;
         audioChunksRef.current = [];

         recorder.ondataavailable = (event: BlobEvent) => {
            audioChunksRef.current.push(event.data);
         };

         recorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {
               type: recorder.mimeType,
            });

            if (onReady) onReady(audioBlob);

            // 🔜 hier upload / verwerking
            mediaRecorderRef.current = null;
         };

         recorder.start();
         setIsRecording(true);
      } catch (err) {
         console.error('Microfoon toegang geweigerd of fout:', err);
      }
   };

   const stopRecording = () => {
      const recorder = mediaRecorderRef.current;

      // Guard: er is niets om te stoppen
      if (!recorder) {
         return;
      }

      recorder.stop();
      setIsRecording(false);

      // Stop ook de microfoon tracks (belangrijk!)
      recorder.stream.getTracks().forEach((track) => track.stop());

      mediaRecorderRef.current = null;
   };

   return (
      <div className={`${className}`}>
         {!isRecording ? (
            <button
               onClick={startRecording}
               className="w-9 h-9 rounded-full flex items-center justify-center
                  transition-colors duration-200 bg-black text-white"
            >
               <StartRecordingIcon className="flex-col self-center" />
            </button>
         ) : (
            <button
               onClick={stopRecording}
               className="w-9 h-9 rounded-full flex items-center justify-center
                  transition-colors duration-200 bg-red-600 text-white"
            >
               <StopRecordingIcon className="flex-col self-center" />
            </button>
         )}
      </div>
   );
}

export default AudioRecorder;
