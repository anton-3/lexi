/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { app } from '..'
import axios from 'axios'
import { OpenAI } from 'openai'
import { config } from 'dotenv'

config()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
})

// sends a prompt to GPT-3.5 and returns a response
async function gpt(prompt: string) {
  // console.log(prompt)
  const gptResponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.1,
    max_tokens: 256,
  })
  return gptResponse.choices[0].message.content
}

// calls the GPT API and returns a story constructed from a
// space-separated string of vocab words
async function generateStory(wordList: string) {
  const words = wordList.split(' ')
  let wordString = ''
  words.forEach((word) => (wordString += `'${word}', `))
  wordString = wordString.slice(0, wordString.length - 2)
  const prompt = `Your task is to write sentences. 

Each of your sentences will contain one of the following words: 
Word list: ${wordString}


You will follow the following instructions
1. the sentences will be written in Spanish
2. the sentences will be simple, something a new language learner could understand. 
3. You will write ${words.length} sentences.
4. you will include the word in the same form as written. it will be the exact same spelling as it is in the quotes. It will be the exact same part of speech as it is in quotes. You will completely avoid using similar words or alternate spellings. 
5. you will write the sentences and only the sentences.
6. You will use correct grammar and tense to mold sentences around the selected word.  
7. You will design the sentences to form in a narrative structure, so that each sentence is related to each of the rest. The sentences should read like a really short story.
8. You can switch up the order that you use the words in the sentences, in order to form a more cohesive narrative. 
9. You will type one sentence per line
10. You must use each word in the list at least once in any of the sentences`
  return await gpt(prompt)
}

async function convertDescriptive(story: string) {
  const prompt = `You will be adding details to sentences. Here are the sentences: 
${story}

Here are the guidelines:
You will decide physical descriptors to each subject and object. any time the same subject comes up in another sentence, it will have the same descriptors.

For example, if the sentence was "The woman walked outside", an appropriate modification would be "The woman walked outside", (the woman is tall with brown hair), (Setting: outside)

Notice how the original sentence is the same but there is added content after it. 

I will now give you an example with multiple sentences and the context i want you to uphold. here it is:
"The woman walked outside"
"The woman pet the dog"
The modifications would be
"The woman walked outside", (the woman is tall with brown hair, wearing red), (Setting: outside)
"The woman pet the dog" (the woman is tall with brown hair) (the dog is a black lab with a spot on his side) (Setting: outside)
you will list those descriptors after each sentence in the format of: The "sample subject/object" is "sample descriptor"
you will specify a setting after the descriptors in the style of setting: "sample setting". You will replace the "sample setting" with whatever you choose. The setting will be what fits best in context.
You will only add content after the sentence.`
  return await gpt(prompt)
}

// Calls the deepL API to translate any text into English
async function translate(text: string) {
  const params = {
    target_lang: 'EN',
    text: text,
  }
  const response = await axios.get(String(process.env.DEEPL_PROXY_URL), { params })
  return response.data.translations[0].text
}

// Generates the storybook from start to finish
async function generateAll(wordList: string) {
  app.locals.story = await generateStory(wordList)
  app.locals.storyEnglish = await translate(app.locals.story)
  app.locals.descriptiveStory = await convertDescriptive(app.locals.storyEnglish)
  console.log('STORY:')
  console.log(app.locals.story)
  console.log('ENGLISH:')
  console.log(app.locals.storyEnglish)
  console.log('DESCRIPTIVE:')
  console.log(app.locals.descriptiveStory)
  // call a fn here: use the descriptive story to generate the images
  // then upload the images to IPFS with pinata API?
  // then get the links and store them in an array, one per sentence in the story
  // here we'll just use shrek pics as a placeholder
  app.locals.imageLinks = [
    'https://cdn.discordapp.com/attachments/1153855137920602112/1155306154709225544/image.png',
    'https://cdn.discordapp.com/attachments/1153855137920602112/1155306154709225544/image.png',
    'https://cdn.discordapp.com/attachments/1153855137920602112/1155306154709225544/image.png',
    'https://cdn.discordapp.com/attachments/1153855137920602112/1155306154709225544/image.png',
    'https://cdn.discordapp.com/attachments/1153855137920602112/1155306154709225544/image.png',
    'https://cdn.discordapp.com/attachments/1153855137920602112/1155306154709225544/image.png',
    'https://cdn.discordapp.com/attachments/1153855137920602112/1155306154709225544/image.png',
    'https://cdn.discordapp.com/attachments/1153855137920602112/1155306154709225544/image.png',
    'https://cdn.discordapp.com/attachments/1153855137920602112/1155306154709225544/image.png',
    'https://cdn.discordapp.com/attachments/1153855137920602112/1155306154709225544/image.png',
  ]
}

export default { gpt, generateStory, translate, generateAll }
