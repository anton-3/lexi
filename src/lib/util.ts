/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'
import { OpenAI } from 'openai'
import { config } from 'dotenv'

config()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
})

async function gpt(prompt: string) {
  console.log(prompt)
  const gptResponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.1,
  })
  return gptResponse.choices[0].message.content
}

async function generateStory(wordsList: string) {
  const words = wordsList.split(' ')
  let wordsString = ''
  words.forEach((word) => (wordsString += `'${word}', `))
  wordsString = wordsString.slice(0, wordsString.length - 2)
  const prompt = `Your task is to write sentences. 

Each of your sentences will contain one of the following words: 
Word list: ${wordsString}


You will follow the following instructions
1. the sentences will be written in Spanish
2. the sentences will be simple, something a new language learner could understand. 
3. You will write ${words.length} sentences.
4. you will include the word in the same form as written. it will be the exact same spelling as it is in the quotes. you will avoid using similar words or alternate spellings.
5. you will write the sentences and only the sentences.
6. You will use correct grammar and tense to mold sentences around the selected word.  
7. You will design the sentences to form in a narrative structure
8. You can switch up the order that you use the words in the sentences, in order to form a more cohesive narrative.`
  return await gpt(prompt)
}

async function translate(text: string) {
  const params = {
    target_lang: 'EN',
    text: text,
  }
  const response = await axios.get(String(process.env.DEEPL_PROXY_URL), { params })
  return response.data.translations[0].text
}

export default { gpt, generateStory, translate }
