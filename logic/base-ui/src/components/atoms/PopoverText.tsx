import { PopoverTextProps } from '@workspace/webtypes';
import PopoverWord from './PopoverWord';

function PopoverText({ className, text, dictionary }: PopoverTextProps) {
  const dict = Object.fromEntries(
    dictionary.map((v) => [v.word.toLowerCase(), v.translation]),
  );

  const tokens = text.split(/(\s+)/);
  const tokenText = tokens.map((token, index) => {
    const clean = token.toLowerCase().replace(/[.,!?]/g, '');
    if (dict[clean]) {
      return (
        <PopoverWord
          key={`tip-${index}`}
          word={token}
          translation={dict[clean]}
        />
      );
    }
    return <span key={`tip-${index}`}>{token}</span>;
  });

  return <span className={className}>{tokenText}</span>;
}

export default PopoverText;
