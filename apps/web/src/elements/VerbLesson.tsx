import { useState } from 'react';

import { VerbClickLearn } from '@workspace/ui/components/atoms/VerbClickLearn';
import { VerbClickTest } from '@workspace/ui/components/Exercises/VerbClickTest';
import { VerbTypeTest } from '@workspace/ui/components/Exercises/VerbTypeTest';
import {
  type VerbConjugation,
  type Pronoun,
  PtPronouns,
} from '@workspace/webtypes/src/Types/Interfaces/Pronouns';

import { AudioQueue } from '../Utilities/AudioQueue';
import { getSpeechAudio } from '@workspace/connectors/src/LanguageModel/SpeechConnector';

export default function VerbLesson() {
  // const { currentLessonID, lessonDetails, getLessonByID } = useLessonStore();
  const [stage, setStage] = useState<'learn' | 'click' | 'test'>('learn');
  const [verbId, setVerbId] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(true);

  const verbs: VerbConjugation[] = [
    {
      infinitive: 'ser',
      tense: 'presente',
      forms: {
        p1ev: 'sou',
        p2ev: 'és',
        p3ev: 'é',
        p1mv: 'somos',
        p2mv: 'são',
        p3mv: 'são',
      },
    },
    {
      infinitive: 'estar',
      tense: 'presente',
      forms: {
        p1ev: 'estou',
        p2ev: 'estás',
        p3ev: 'está',
        p1mv: 'estamos',
        p2mv: 'estão',
        p3mv: 'estão',
      },
    },
    {
      infinitive: 'ter',
      tense: 'presente',
      forms: {
        p1ev: 'tenho',
        p2ev: 'tens',
        p3ev: 'tem',
        p1mv: 'temos',
        p2mv: 'têm',
        p3mv: 'têm',
      },
    },
  ];

  const speakText = async (text: string) => {
    setReady(false);
    const task = await getSpeechAudio(text, {
      voice: 'marin',
      instructions:
        'Speak Português Europeu with the accent from Coimbra. Use a happy and joyfull tone.',
    });
    if (task) AudioQueue.enqueue(task);
    await AudioQueue.waitUntilEmpty();
    setReady(true);
  };

  const handleRight = async ({ id, text }: Pronoun) => {
    const pronoun = PtPronouns.find((p) => p.id === id);
    if (pronoun) {
      const pronounText = `${pronoun.text.replaceAll('/', ',')} ${text}`;
      await speakText(pronounText);
    }
  };

  const handleWrong = async ({ id, text }: Pronoun) => {
    console.log('Answer', id, text, '❌');
  };

  const NextStage = () => {
    switch (stage) {
      case 'learn':
        setStage('click');
        break;
      case 'click':
        setStage('test');
        break;
      case 'test':
        if (verbId < verbs.length - 1) {
          setVerbId(verbId + 1);
          setStage('learn');
        } else console.log('Alle stages voltooid!');
        break;
    }
  };

  return (
    <div className='flex flex-col bg-gray-200 h-screen m-0 p-0'>
      {stage === 'learn' && (
        <VerbClickLearn
          verb={verbs[verbId]}
          description={`Leer de vervoegingen van het werkwoord "${verbs[verbId].infinitive}"!`}
          enabled={ready}
          onReady={handleRight}
          onComplete={NextStage}
        />
      )}

      {stage === 'click' && (
        <VerbClickTest
          verb={verbs[verbId]}
          description={`Selecteer de juiste vervoeging van het werkwoord "${verbs[verbId].infinitive}"!`}
          onRight={handleRight}
          onWrong={handleWrong}
          onComplete={NextStage}
        />
      )}

      {stage === 'test' && (
        <VerbTypeTest
          verb={verbs[verbId]}
          description={`Typ de juiste vervoeging van het werkwoord "${verbs[verbId].infinitive}"!`}
          onRight={handleRight}
          onWrong={handleWrong}
          onComplete={NextStage}
        />
      )}
    </div>
  );
}
