import { useEffect, useState } from 'react';

type Props = {
  author: string;
  initialText: string;
};

const Message = (props: Props) => {
  const [text, setText] = useState(
    props.author === 'ai' ? '' : props.initialText
  );

  const blinkingCursorClass =
    props.initialText.length === text.length ? '' : 'blinking-cursor';

  // typewriter effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(props.initialText.slice(0, text.length + 1));
    }, 10);

    return () => clearTimeout(timeout);
  }, [props.initialText, text]);

  return (
    <>
      <div
        className={`p-2 ${
          props.author === 'ai' ? 'bg-zinc-900' : ''
        } rounded flex gap-4`}
      >
        <div
          className={`${
            props.author === 'ai' ? 'bg-[#B6FBFF]' : 'bg-violet-400'
          } w-8 h-8 rounded-full shrink-0 flex justify-center items-center font-bold text-white`}
        >
          {props.author === 'ai' ? 'A' : 'R'}
        </div>
        <div>
          <p
            className={`font-bold ${
              props.author === 'ai' ? 'text-[#B6FBFF]' : 'text-zinc-500'
            }`}
          >
            {props.author === 'ai' ? 'Chat GPT' : 'You'}
          </p>
          <p className={`text-slate-300 ${blinkingCursorClass}`}>{text}</p>
        </div>
      </div>
    </>
  );
};

export default Message;
