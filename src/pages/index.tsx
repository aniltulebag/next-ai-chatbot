import Link from 'next/link';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

import aiChatbotImage from '@/assets/carreers.png';

const inter = Inter({ subsets: ['latin'] });

const boxVariant = {
  visible: {
    rotateY: 0,
    transition: { duration: 2.5 },
  },
  hidden: { rotateY: 45 },
};

export default function Home() {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    } else {
      control.start('hidden');
    }
  }, [control, inView]);

  return (
    <main
      className={`${inter.className} flex flex-col items-center text-center w-full`}
    >
      <h2 className="mt-11 font-bold">
        <span className="text-[#B6FBFF]">reload</span>
        <span className="text-white">.case</span>
      </h2>
      <h1 className="mt-36 text-6xl font-bold">
        <span className="text-[#B6FBFF]">AI</span>{' '}
        <span className="text-white">Chatbot</span>
      </h1>
      <p className="mt-14 sm:w-[31rem] text-[rgba(255,255,255,0.7)] sm:text-xl">
        We’ve trained a model called ChatGPT which interacts in a conversational
        way.
      </p>
      <Link
        className="mt-20 w-60 h-14 bg-white text-black font-bold rounded-full flex justify-center items-center transition-all duration-300 hover:translate-y-2 hover:bg-[#B6FBFF]"
        href={`/chatbot`}
      >
        Continue
      </Link>

      <div className="w-full relative overflow-hidden h-[24rem] sm:h-[54rem] sm:mt-30 sm:pt-96">
        <div className="wave"></div>
      </div>

      <div className="w-4/5 text-start mt-44">
        <h2 className="text-6xl font-bold">
          <span className="text-white">Start chatting with</span>{' '}
          <span className="text-[#B6FBFF]">AI.</span>
        </h2>
        <p className="mt-10 text-xl text-[rgba(255,255,255,0.7)]">
          Chat about any topic with ChatGPT in any time. It can be your friend,
          tutor or therapist.
        </p>
        <div className="flex mt-10">
          <Link
            className="text-[#B6FBFF] transition-all duration-300 hover:translate-x-2"
            href={`/chatbot`}
          >
            Let&apos;s start chat &rarr;
          </Link>
        </div>

        <motion.div
          className="box"
          ref={ref}
          variants={boxVariant}
          initial="hidden"
          animate={control}
        >
          <div className="mt-10 p-3 border border-slate-400 rounded-xl">
            <Image
              className="rounded-xl"
              src={aiChatbotImage}
              alt="AI Chatbot"
            />
          </div>
        </motion.div>
      </div>

      <div className="w-full mt-44 border-t border-b border-slate-800 text-start">
        <div className="w-11/12 mx-auto relative sm:w-4/5 sm:flex">
          <div className="py-20 px-5 sm:border-r border-slate-800 max-h-screen sm:sticky sm:top-0 sm:w-5/12 md:w-6/12">
            <h2 className="text-5xl font-bold text-white lg:text-6xl">
              Chat with unique characters
            </h2>
            <p className="mt-10 text-xl text-[rgba(255,255,255,0.7)]">
              You can chat many different characters for a few set of topics and
              interests.
            </p>
            <Link
              className="mt-10 w-40 h-14 font-bold bg-[#B6FBFF] rounded-full flex justify-center items-center transition-all duration-300 hover:translate-y-2 hover:bg-white"
              href={`/chatbot`}
            >
              Let&apos;s start chat
            </Link>
            <div className="mt-20 w-full bg-[#212121] h-[15rem] sm:h-[30rem] rounded-3xl"></div>
          </div>

          <div className="mt-20 py-20 text-white border-t sm:border-none sm:border-l border-slate-800 grid justify-center items-center gap-16 xl:grid-cols-2 sm:gap-6 xl:justify-between sm:w-7/12 sm:ml-auto sm:mt-0">
            <div className="flex flex-col items-center justify-center">
              <div>
                <div className="w-80 md:w-64 h-[20rem] xl:h-[50vh] mb-5 bg-[#212121]"></div>
                <span>Hitachi Digital Brand Ecosystem.</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <div className="w-80 md:w-64 h-[20rem] xl:h-[50vh] mb-5 bg-[#212121]"></div>
                <span>Stråbe</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <div className="w-80 md:w-64 h-[20rem] xl:h-[50vh] mb-5 bg-[#212121]"></div>
                <span>Commons.</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <div className="w-80 md:w-64 h-[20rem] xl:h-[50vh] mb-5 bg-[#212121]"></div>
                <span>Aeizei</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <div className="w-80 md:w-64 h-[20rem] xl:h-[50vh] mb-5 bg-[#212121]"></div>
                <span>Zvurçyk Fashion</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <div className="w-80 md:w-64 h-[20rem] xl:h-[50vh] mb-5 bg-[#212121]"></div>
                <span>Lancome</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gradient-to-b from-zinc-950 to-black border-b border-slate-800 flex flex-col items-center justify-center h-screen sm:block sm:mt-32 sm:h-[60vh]">
        <h2 className="w-11/12 text-5xl font-bold text-white sm:w-full sm:mt-32 sm:text-6xl">
          Let&apos;s start experiencing the
          <br />
          new internet <span className="text-[#B6FBFF]">today.</span>
        </h2>
        <Link
          className="mt-14 w-52 h-14 font-bold bg-[#B6FBFF] rounded-full flex justify-center items-center mx-auto transition-all duration-300 hover:translate-y-2 hover:bg-white"
          href={`/chatbot`}
        >
          Get started for free
        </Link>
      </div>

      <div className="mx-auto py-14 flex flex-col items-center gap-20 text-white sm:flex-row sm:w-4/5 sm:gap-0 lg:gap-32 lg:items-start">
        <div className="w-6/12 text-lg xl:w-11/12">
          <p className="w-100 text-start">
            We would love to hear from you. Let&apos;s work &#8212; together
            <br />
            with Reload
          </p>
          <Link
            className="mt-8 w-40 h-14 font-bold border border-slate-400 rounded-full flex justify-center items-center transition-all duration-300 hover:bg-white hover:text-black"
            href={`mailto:contact@reload.app`}
          >
            Contact us
          </Link>
        </div>
        <div className="w-10/12 text-start grid grid-cols-2 gap-6 sm:w-6/12 sm:gap-4 xl:gap-12">
          <div className="flex flex-col gap-2">
            <p className="mb-2">Business requires</p>
            <span className="text-sm text-gray-400">hello@colstic.com</span>
            <span className="text-sm text-gray-400">+27 123 456 789</span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="mb-2">Open positions</p>
            <span className="text-sm text-gray-400">Junior Graphic Design</span>
            <span className="text-sm text-gray-400">Videography</span>
            <span className="text-sm text-gray-400">Photography</span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="mb-2">London</p>
            <span className="text-sm text-gray-400">
              133A Rye lane London SE15 4BQ
              <br />
              UK
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="mb-2">Cape town</p>
            <span className="text-sm text-gray-400">
              14 Upper pepper street CBD, 8001
              <br />
              Cape Town
            </span>
          </div>
        </div>
      </div>

      <div className="w-full mb-16 py-14 text-white border-t border-b border-slate-800">
        <div className="w-4/5 mx-auto flex flex-col-reverse items-center justify-center gap-24 sm:flex-row xl:gap-32">
          <h2 className="font-bold sm:mr-auto">
            <span className="text-[#B6FBFF]">reload</span>
            <span className="text-white">.case</span>
          </h2>
          <Link
            className="transition-all duration-300 hover:text-[#B6FBFF]"
            href={'/'}
          >
            DRIBBLE
          </Link>
          <Link
            className="transition-all duration-300 hover:text-[#B6FBFF]"
            href={'/'}
          >
            INSTAGRAM
          </Link>
          <Link
            className="transition-all duration-300 hover:text-[#B6FBFF]"
            href={'/'}
          >
            LINKEDIN
          </Link>
        </div>
      </div>
    </main>
  );
}
