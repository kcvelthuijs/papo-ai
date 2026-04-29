import { type ReactNode } from 'react';
import { CardLayout, ExerciseInput, Field } from '@workspace/ui';
import { PtPronouns } from '@workspace/webtypes';

type Props = {
  title?: string;
  description?: string;
  activePronounId?: string;
  renderField: (pronounId: string, isActive: boolean) => ReactNode;
  stars?: any;
  footer?: ReactNode;
  complete?: boolean;
  onContinue?: () => void;
};

export function VerbCardLayout({
  title,
  description,
  renderField,
  stars,
  activePronounId,
  footer,
  complete,
  onContinue,
}: Props) {
  const content = (
    <div>
      {PtPronouns.map((p) => {
        const isActive = p.id === activePronounId;
        return (
          <div key={p.id} className='my-1 grid grid-cols-2 align-bottom w-full'>
            <span className='border-transparent m-0.5 pt-2 pr-2 text-right'>
              {p.text}
            </span>
            <div className='items-start rounded-sm px-2 py-1'>
              {renderField(p.id, isActive)}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <CardLayout
      title={title}
      description={description}
      content={content}
      footer={footer}
      complete={complete}
      onContinue={onContinue}
      stars={stars}
    />
  );
}
