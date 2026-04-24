import { type ReactNode } from 'react';

import { PtPronouns, type PronounId } from '@workspace/dtotypes';

type Props = {
  title: string;
  description?: string;

  matches: Record<string, string>;
  nextPronounId?: PronounId;

  renderField: (pronounId: PronounId) => ReactNode;

  children: ReactNode;
  footer?: ReactNode;
};

export function VerbCardLayout({
  title,
  description,
  matches,
  nextPronounId,
  renderField,
  children,
  footer
}: Props) {
  return (
    <div className='border rounded p-4 flex flex-col gap-4'>
      {/* HEADER */}
      <div>
        <h2 className='text-xl font-semibold'>{title}</h2>
        {description && <p className='text-sm text-gray-500'>{description}</p>}
      </div>

      {/* PRONOUN GRID */}
      <div>
        {PtPronouns.map((p) => {
          const isActive = p.id === nextPronounId;
          return (
            <div
              key={p.id}
              className='my-1 grid grid-cols-[40%_30%_30%] gap-y-4 align-bottom'
            >
              <span className='border-transparent m-0.5 py-1 pr-2 text-right'>
                {p.text}
              </span>
              <span
                className={`
                  px-2 py-1 rounded border min-h-8
                  flex items-center
                  ${isActive ? 'border-red-400 bg-white' : 'border-gray-200 bg-white'}
                `}
              >
                {renderField(p.id)}
              </span>
            </div>
          );
        })}
      </div>

      {/* OPTIONS / CHILDREN */}
      <div className='flex justify-center'>{children}</div>

      {/* FOOTER */}
      {footer && <div className='mt-2'>{footer}</div>}
    </div>
  );
}
