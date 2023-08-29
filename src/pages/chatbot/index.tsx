import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import Message from '@/components/Message';
import Prompt from '@/components/Prompt';
import useUser from '@/hooks/useUser';

type Props = {};

const ChatBot = (props: Props) => {
  const [messages, setMessages] = useState<
    { id: string; author: string; text: string }[]
  >([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const { user, getUser } = useUser();
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isTooManyRequest, setIsTooManyRequest] = useState(false);

  const handleSession = async () => {
    if (user && activeSession && activeSession.length > 0) {
      return;
    }

    const session = new Date().toISOString();

    if (!session) {
      console.log('Not valid session!');
      return;
    }

    await fetch(`/api/chatbot?uid=${session}`, {
      method: 'PUT',
    });

    getUser();
  };

  const handleSubmit = async (prompt: string) => {
    if (prompt.trim().length === 0) {
      return;
    }

    setMessages((messages) => {
      return [
        ...messages,
        {
          id: new Date().toISOString(),
          author: 'human',
          text: prompt,
        },
      ];
    });

    setIsPending(true);

    const response = await fetch(`/api/chatbot`, {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.status);
    if (response.status === 429) {
      setIsPending(false);
      setIsTooManyRequest(true);
    } else {
      const responseJson = await response.json();

      if (response.ok) {
        setMessages((messages) => {
          return [
            ...messages,
            {
              id: new Date().toISOString(),
              author: 'ai',
              text: responseJson.data.message,
            },
          ];
        });
        setIsPending(false);
      } else {
        console.error(responseJson.error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    console.log('user', user);

    if (user) {
      setActiveSession(user);
    }

    const cleanChatHistory = async () => {
      await fetch(`/api/chatbot`, {
        method: 'DELETE',
      });
    };

    return () => {
      if (user) {
        cleanChatHistory();
      }
    };
  }, [user]);

  useEffect(() => {
    if (isTooManyRequest) {
      setTimeout(() => {
        setIsTooManyRequest(false);
      }, 60000);
    }
  }, [isTooManyRequest]);

  return (
    <main className="flex h-full max-h-screen overflow-hidden">
      <div className="w-2/12 md:w-3/12 lg:w-5/12">
        <div className="ml-4 sm:ml-6 md:ml-10 lg:ml-32 mt-10 flex">
          <Link
            href={`/`}
            className="text-[#B6FBFF] transition-all duration-300 hover:-translate-x-2"
          >
            &larr; Back
          </Link>
        </div>
        <div className="hidden md:block lg:w-7/12 mx-auto text-center">
          <h1 className="mt-72 lg:text-6xl font-bold">
            <span className="text-[#B6FBFF]">AI</span>{' '}
            <span className="text-white">Chatbot</span>
          </h1>
          <p className="mt-10 text-[rgba(255,255,255,0.7)] sm:text-sm md:text-xl">
            We’ve trained a model called ChatGPT which interacts in a
            conversational way.
          </p>
          L
        </div>
        <div className="w-full relative overflow-hidden h-[24rem] sm:h-[54rem] sm:mt-30 sm:pt-96">
          <div className="wave"></div>
        </div>
      </div>

      <div className="w-10/12 md:w-9/12 lg:w-7/12 flex flex-col justify-between">
        <h2 className="mt-10 mb-10 ml-10 text-2xl font-bold">
          <span className="text-[#B6FBFF]">reload</span>
          <span className="text-white">.case</span>
        </h2>
        <div
          ref={chatRef}
          className="w-11/12 sm:w-10/12 md:w-8/12 mx-auto h-full py-4 overflow-y-auto flex flex-col gap-4"
        >
          {!isTooManyRequest &&
            messages.map((message, index) => {
              return (
                <Message
                  key={message.id}
                  author={message.author}
                  initialText={message.text}
                />
              );
            })}
          {isTooManyRequest && (
            <>
              <div className="w-6/12 mx-auto my-auto text-[#B6FBFF]">
                Too many request in one minute. Please wait 60 seconds for
                sending new message...
              </div>
            </>
          )}
        </div>
        <div className="w-10/12 md:w-8/12 mx-auto mb-10 mt-10">
          <Prompt
            isTooManyRequest={isTooManyRequest}
            activeSession={activeSession}
            isPending={isPending}
            onSession={handleSession}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
};

export default ChatBot;
