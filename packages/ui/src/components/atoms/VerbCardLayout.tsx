import {
  PtPronouns,
  PronounId,
} from "@workspace/webtypes/src/Types/Interfaces/Pronouns";
import { CardLayout } from "./CardLayout";
import { ReactNode } from "react";

type VerbCardLayoutProps = {
  title: string;
  description?: string;
  matches: Record<string, string>;
  nextPronounId?: PronounId;
  stars?: any[];
  onComplete?: () => void;
  renderField: (pronounId: PronounId) => ReactNode;
  children?: ReactNode; // bijvoorbeeld de buttons van VerbClickTest
};

export function VerbCardLayout({
  title,
  description,
  matches,
  nextPronounId,
  stars,
  onComplete,
  renderField,
  children,
}: VerbCardLayoutProps) {
  const complete: boolean = Object.keys(matches).length === PtPronouns.length;

  // CardContent component
  const content = (
    <div>
      {PtPronouns.map((p) => {
        const colour =
          p.id === nextPronounId
            ? "border-red-400 bg-white border-1 border-b-2"
            : "border-gray-200 bg-white border-1 border-b-2";

        return (
          <div
            key={p.id}
            className="my-1 grid grid-cols-[40%_30%_30%] gap-y-4 align-bottom"
          >
            <span className="border-transparent m-0.5 py-1 pr-2 text-right">
              {p.text}
            </span>
            <span
              className={`w-min-12 items-start rounded-sm px-2 py-1 transition ${colour}`}
            >
              {renderField(p.id)}
            </span>
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
      children={children}
      complete={complete}
      onComplete={onComplete}
      stars={stars}
    />
  );
}
