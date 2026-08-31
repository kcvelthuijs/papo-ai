import ReactMarkdown from 'react-markdown';

type Props = {
  children: string;
};

export const ChatBotMessage = ({ children }: Props) => {
  return <ReactMarkdown>{children}</ReactMarkdown>;
};
