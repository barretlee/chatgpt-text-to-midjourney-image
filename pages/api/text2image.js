import axios from 'axios'
const { Configuration, OpenAIApi } = require('openai');

// Setup OpenAI configurations
const OPENAI_KEY = process.env.OPENAI_KEY || "";
const OPENAI_MODEL = process.env.MODEL || "gpt-3.5-turbo";
const MAX_MESSAGES_PER_CHAT = 40;

export default async function handler(req, res) {
  const { prompt, image_model, direct } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' });
  }
  
  // prepare text2text params
  const content = `你是一个 prompt 工程师，我输入一个 prompt，你就给我输出一个新的 prompt，输出的 prompt 可以比较好地运行在图片生成模型上。
举个例子：

输入: 一个三只耳朵的猫
输出: mdjrny-v4 style a cat with three ears.

输入: ${prompt}
输出:`;

  // fetch text data
  let generatedPrompt = prompt;
  try {
    if (!direct) { 
      const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_KEY }));
      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: content,
        temperature: 1,
        n: 1,
        stream: false,
      });
      generatedPrompt = completion.data.choices[0].text;
    } else {
      console.log('Direct Mode, skip text2text');
    }
  } catch (error) {
    return res.status(400).json({ error: 'Something error while text2text' });
  }

  // prepare text2image params
  const replicate = await import('node-replicate');
  const [ url ] = await replicate.default.run(image_model, {
    prompt: generatedPrompt,
  });
  return res.status(400).json({ url, text: generatedPrompt });;
}