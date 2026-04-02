import React, { ReactNode, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../shadcn/card";
import { Button } from "../shadcn/button";

import StarBurst from "../animations/starburst";
import {
  PronounId,
  PtPronouns,
} from "@workspace/webtypes/src/Types/Interfaces/Pronoun";

type VerbCardLayoutProps = {
  title: string;
  description?: string;
  matches: Record<string, string>;
  nextPronounId?: string;
  stars?: any[];
  onComplete?: () => void;
  renderField: (pronounId: PronounId) => ReactNode;
  children?: React.ReactNode;
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
  return (
    <div className="min-h-screen bg-gray-300 shadow-lg xl:flex xl:justify-center dark:bg-gray-900">
      <div className="h-[calc(100vh-5rem)] bg-gray-100 p-4 sm:w-full xl:w-300 xl:border-r xl:border-l xl:border-gray-400 dark:border-gray-800 dark:bg-gray-700">
        <div className="flex flex-row justify-center">
          <Card className="mt-2 flex w-120 flex-col justify-center border-gray-500">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold">
                {title}
              </CardTitle>
              <CardDescription className="border-b border-gray-600 pb-2 text-center font-semibold">
                {description ?? "Escolha a forma correta do verbo."}
              </CardDescription>
              <CardContent>
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
                        <span className="border-transparant m-0.5 py-1 pr-2 text-right">
                          {p.text}
                        </span>
                        <span
                          className={`w-min-12 items-start rounded-sm px-2 py-1 transition ${colour}`}
                        >
                          {renderField(p.id)}{" "}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>

        {/* stars zijn alleen van toepassing bij VerbTypeTest */}
        {stars && <StarBurst stars={stars} />}

        {/* children zijn alleen van toepassing bij VerbClickTest */}
        {children && <div className="mt-4">{children}</div>}

        {complete && (
          <div className="flex flex-col items-center pt-2">
            <Button onClick={onComplete}>Continuar</Button>
          </div>
        )}
      </div>
    </div>
  );
}
