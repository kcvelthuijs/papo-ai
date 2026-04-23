import { useMemo, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  RadioGroup,
  RadioGroupItem,
} from '@workspace/ui';
import { type QuizQuestionProps } from '@exercises/logic';

type Answer = {
  answer: string;
  correct: string;
};

const QuizQuestion = ({
  className,
  question,
  correct,
  options,
}: QuizQuestionProps) => {
  const [selected, setSelected] = useState<string>('');
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const respostas = useMemo(
    () => setAnswers(correct, options),
    [correct, options],
  );

  const setAnswers = (correct: string, options: string[]) => {
    let respostas: Answer[] = [];
    const indexcorrect = Math.floor(Math.random() * 4);
    for (let i = 0; i < options.length; i++) {
      if (i == indexcorrect)
        respostas = [...respostas, { answer: correct, correct: 'v' }];
      respostas = [...respostas, { answer: options[i], correct: `f${i}` }];
    }
    if (indexcorrect >= options.length)
      respostas = [...respostas, { answer: correct, correct: 'v' }];
    console.log(respostas);
    return respostas;
  };

  const setAltKey = (i: number) => {
    return 'ABCDEFGHIJ'.substring(i, i + 1);
  };

  function onSubmit() {
    const correct: boolean = selected === 'v';
    setIsCorrect(correct);
    setChecked(true);
  }

  return (
    <Card className={`w-full max-w-full ${className}`}>
      <CardHeader>
        <CardTitle>{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selected} onValueChange={setSelected}>
          {respostas.map((r, index) => (
            <Field orientation='horizontal'>
              <RadioGroupItem
                value={r.correct}
                id={`quiz-${setAltKey(index)}`}
              />
              <FieldDescription>{`${setAltKey(index)}: ${r.answer}`}</FieldDescription>
            </Field>
          ))}
        </RadioGroup>

        {checked && (
          <div className='mt-4 font-semibold'>
            {isCorrect ? (
              <p className='text-green-600'>✅ Resposta é verdade!</p>
            ) : (
              <p className='text-red-600'>❌ Resposta é falso</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isCorrect && (
          <Button
            size='sm'
            className='max-w-sm'
            onClick={onSubmit}
            disabled={!selected}
          >
            Verificar
          </Button>
        )}
        {isCorrect && (
          <Button
            size='sm'
            className='max-w-sm'
            onClick={onSubmit}
            disabled={!selected}
          >
            Continuar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
