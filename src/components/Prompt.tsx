import { useState } from 'react';

type Props = {
  isTooManyRequest: boolean;
  activeSession: string | null;
  isPending: boolean;
  onSession: () => void;
  onSubmit: (prompt: string) => void;
};

const Prompt = (props: Props) => {
  const [messageContent, setMessageContent] = useState('');

  const handleSendMessage = (promptContent: string) => {
    if (!props.isTooManyRequest) {
      // send message to the server
      props.onSubmit(promptContent);

      // reset value of the input
      setMessageContent('');
    }
  };

  return (
    <>
      <div className="border-2 border-[#B6FBFF] rounded-full flex">
        <input
          className="w-10/12 md:w-11/12 rounded-l-full p-4 bg-zinc-900 text-white placeholder-white outline-none"
          placeholder={
            props.activeSession
              ? props.isPending
                ? 'AI typing...'
                : 'Send a message'
              : 'Click button to chat'
          }
          disabled={props.isPending || !props.activeSession}
          value={messageContent}
          onChange={(event) => {
            setMessageContent(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              if (messageContent.length > 0) {
                handleSendMessage(messageContent);
              }
              setMessageContent('');
            }
          }}
        />
        <div
          className="w-2/12 md:w-2/12 lg:w-1/12 rounded-r-full bg-zinc-900 flex items-center justify-center"
          onClick={() => {
            if (!props.activeSession) {
              return props.onSession();
            }
            if (messageContent.length > 0) {
              handleSendMessage(messageContent);
            }
            setMessageContent('');
          }}
        >
          <div className="bg-[#B6FBFF] flex justify-center items-center w-8 h-8 rounded-full text-2xl transition-all duration-300 hover:bg-white hover:cursor-pointer">
            &rarr;
          </div>
        </div>
      </div>
    </>
  );
};

export default Prompt;
