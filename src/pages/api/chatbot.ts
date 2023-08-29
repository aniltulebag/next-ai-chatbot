// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from 'openai';
// API request limiting
import applyRateLimit from '@/lib/rateLimit';
import { withNextSession } from '@/lib/session';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      uid: string;
    };
  }
}

const MEMORY_SIZE = 6;
interface CompletionMessage {
  role: 'system' | 'assistant' | 'user';
  content: string;
}
let messageHistory: {
  [key: string]: CompletionMessage[];
} = {};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function completionRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    await applyRateLimit(req, res);
  } catch {
    return res.status(429).send('Too many requests');
  }

  if (req.method === 'POST') {
    if (!openai.apiKey) {
      return res.status(500).json({
        success: false,
        data: null,
        error: { message: 'OpenAi Api Key is missing!' },
      });
    }

    const { user } = req.session;
    // if cookie is not provided
    if (!user) {
      return res.status(500).json({
        success: false,
        data: null,
        error: { message: 'Session is missing!' },
      });
    }

    try {
      const body = req.body;
      const systemMessageContent = 'You are a helpful assistant.';
      // A prompt for ChatGPT is a question or statement that a user inputs to start a conversation with the AI. Based on the prompt, ChatGPT generates a response using its machine learning algorithms and vast knowledge base to provide relevant and coherent answers.
      const userMessageContent = body.prompt || 'Hello'; // fallback value
      const systemMessage = {
        role: 'system',
        content: systemMessageContent,
      } as CompletionMessage;
      const userMessage = {
        role: 'user',
        content: userMessageContent,
      } as CompletionMessage;

      // If there are already some data stored in messagesHistory under the user.uid then reassign this data.
      // Otherwise if there are no data, initialize it to the empty array.
      messageHistory[user.uid] ||= [];
      // Create and query items using plain JavaScript
      messageHistory[user.uid].push(userMessage);

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, ...messageHistory[user.uid]],
        temperature: 1, // Controls randomness. The value can be from zero to two. If the zero value is provided, the model will provide the same answer or at least the most of the time. If the value is bigger, then the model is more creative and it's changing the answers.
        max_tokens: 3000, // How the GPT works is that it's predicting the next token that you generate. It's predicting what words of a token should generate. 1 token approximately equal to four characters. 1 token approximately 0.75 of a english word.
        top_p: 1, // Cumulative Probabilities. Controls diversity of options. If top_p is 1, then we can choose from all of the candidate words. GPT can generate a word with the largest probability. prompt: "A dog sat on [MASK]"
        frequency_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
      });

      const aiResponse = completion.choices[0].message;
      const assistantMessage = {
        role: 'assistant',
        content: aiResponse.content,
      } as CompletionMessage;
      // Create and query items using plain JavaScript
      messageHistory[user.uid].push(assistantMessage);
      // If we will cross the "MEMORY_SIZE", remove first two items and then write it to a database.
      if (messageHistory[user.uid].length > MEMORY_SIZE) {
        messageHistory[user.uid].splice(0, 2);
      }

      return res.status(200).json({
        success: true,
        data: { message: aiResponse.content },
        error: null,
      });
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        return res.status(500).json({
          success: false,
          data: null,
          error: { message: error.message },
        });
      } else if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          data: null,
          error: { message: error.message },
        });
      } else {
        console.log(error);
      }
    }
  } else if (req.method === 'PUT') {
    const { uid } = req.query;

    if (!uid) {
      return res.status(500).json({
        success: false,
        data: null,
        error: { message: 'Invalid uid provided!' },
      });
    }

    req.session.user = {
      uid: uid as string,
    };

    await req.session.save();

    return res.status(200).json({
      success: true,
      data: { message: uid },
      error: null,
    });
  } else if (req.method === 'DELETE') {
    const { user } = req.session;

    if (user) {
      messageHistory[user.uid] = [];

      console.log('history cleared');

      return res.status(200).json({
        success: true,
        data: { message: 'History cleared!' },
        error: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: { message: 'Nothing to clear!' },
      error: null,
    });
  } else {
    return res.status(500).json({
      success: false,
      data: null,
      error: { message: 'Invalid Api Route' },
    });
  }
}

export default withNextSession(completionRoute);
