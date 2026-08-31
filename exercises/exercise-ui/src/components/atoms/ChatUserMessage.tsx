import { useState } from 'react';

import type { TeacherFeedback, TeacherRemark } from '@workspace/dtotypes';

type Props = {
  content: string;
  feedback?: TeacherFeedback;
};

export const ChatUserMessage = ({ content, feedback }: Props) => {
  const [activeFeedback, setActiveFeedback] = useState<TeacherRemark | null>(
    null,
  );

  // Bij een 10 zijn er geen fouten om te markeren.
  if (!feedback || feedback.grade === 10) {
    return <>{content}</>;
  }

  // Alleen opmerkingen met een daadwerkelijke fout verwerken.
  const remarks = feedback.remarks.filter(
    (remark) => !remark.error.toLowerCase().startsWith('geen fout'),
  );

  // Controleer of er opmerkingen zijn
  if (remarks.length === 0) {
    return <>{content}</>;
  }

  // Escape regex-karakters in de woorden.
  const escapedWords = remarks.map((remark) =>
    remark.woord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  );

  // Zoek uitsluitend naar volledige woorden.
  const regex = new RegExp(
    `(?<![A-Za-zÀ-ÖØ-öø-ÿ])(${escapedWords.join('|')})(?![A-Za-zÀ-ÖØ-öø-ÿ])`,
    'gi',
  );

  const parts = content.split(regex);

  return (
    <div>
      <div>
        {parts.map((part, index) => {
          const remark = remarks.find(
            (item) => item.woord.toLowerCase() === part.toLowerCase(),
          );

          if (!remark) {
            return <span key={index}>{part}</span>;
          }
          const isActive = activeFeedback === remark;
          return (
            <button
              key={index}
              type='button'
              className='underline decoration-red-500 decoration-2 underline-offset-4 cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                setActiveFeedback(isActive ? null : remark);
              }}
            >
              {part}
            </button>
          );
        })}
      </div>

      {activeFeedback && (
        <div
          className='mt-3 p-3 rounded-md border border-gray-300
            bg-white/70 text-gray-800 shadow-sm
            dark:border-gray-600 dark:bg-black/20
            dark:text-gray-200'
        >
          <div className='font-semibold'>
            {activeFeedback.woord} → {activeFeedback.correct}
          </div>
          <div className='mt-1 text-sm'>{activeFeedback.error}</div>
        </div>
      )}
    </div>
  );
};
