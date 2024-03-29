// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
});


type Req = {
  message: string;
};

type Res = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>,
) {

  const { message } = req.body;
  try {
    const resp: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });
        
    res.status(200).json({message: resp.choices[0].message.content|| ''})
  } catch(e: any) {
    res.status(400).json({message: e.message})
  }
}
