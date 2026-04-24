import { type ReactNode } from 'react';
import { CardLayout } from '@workspace/ui';
import { PtPronouns } from '@workspace/webtypes';

type Props = {
  title?: string;
  description?: string;
  renderField: (pronounId: string) => ReactNode;
  activePronounId?: string;
  footer?: ReactNode;
  complete?: boolean;
  onComplete?: () => void;
};

export function VerbCardLayout({
  title,
  description,
  renderField,
  activePronounId,
  footer,
  complete,
  onComplete
}: Props) {
  const content = (
    <div className='flex flex-col gap-2'>
      {PtPronouns.map((p) => {
        const isActive = p.id === activePronounId;

        return (
          <div
            key={p.id}
            className='my-1 grid grid-cols-[40%_30%_30%] gap-y-4 align-bottom'
          >
            {/* pronoun */}
                        <span className="border-transparent m-0.5 py-1 pr-2 text-right">
  {p.text}
            </span>

            {/* field */}
            <div
              className={`
                min-h-12 px-2 py-1 border rounded
                ${isActive ? 'border-red-400' : 'border-gray-200'}
              `}
            >
              {renderField(p.id)}
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
      onComplete={onComplete}
    />
  );
}
