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
    temperature: 0.2,
    max_tokens: 500,
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
  const prompt = `You will write sentences, with the goal of teaching children a new language by incorporating specific vocabulary words in your story. Your task is to write a short story that includes certain vocabulary words. 

Your story must contain each of the following words: ${wordString}


You will follow the following instructions:
1. The sentences will be written in Spanish.
2. Each sentence MUST be written on its own line.
3. You will write ${words.length}-${words.length + 2} sentences.
4. You will write the sentences and ONLY the sentences.
5. You will include the word in the same form as written in the list. it will be the exact same spelling. it will be the exact same part f speech. you will completely avoid using similar words and alternate apellings. 
6. You will use correct grammar and tense to mold sentences around the selected word
7. You will design the sentences to form in a narrative structure, so that each sentence is related to each of the rest. Every sentence should connect to the one before it and the one after it.
8. The sentences must contain each word in the word list at least once. You can use one or more listed words per sentence, but they all hve to be used at some point, and each sentence needs one listed word.
9. The words can be used in any order, as long as they maintain a cohesive story from start to end.
10. Do not use any pronouns such as "he, him, she, her, they, we," etc. Don't use pronouns in other languages either
11. Make the sentences relatively simple, to the point where a new lanugage learner could understand.s`

  return await gpt(prompt)
}

async function convertDescriptive(story: string) {
  const prompt = `You will be providing descriptions for an artist to paint about from a few sentences. Here are the sentences: 
${story}

Here are the guidelines:
You are supposed to provide descriptions for an artist who will paint scenes of each sentence. Treat each sentence as a new scene. For each scene you have to describe each noun in great detail. For humans and animals, give physical descriptions, like hair color and style, size, chlothes, etc. For inanimate objects, describe distinct attributes like the color, shape, size, etc. 

Because each sentence is a new scene, you want to make sure subjects and objects that appear in more than one scene are painted the same way.
Because of this, make sure you repeat the descriptions exactly for a subject or object that appears multiple times. This means that each time a noun appears, it will have the same description. If you first describe a man as "tall, wears ballcap, has beard", you will have to describe him as that after every sentence he is in

Here is an example of how you would format a description: if the sentence was "The woman walked outside", an appropriate modification would be "The woman walked outside", (the woman is tall with brown hair and is wearing a red dress)

Notice how the original sentence is the same but there is added content after it. 

There should be a description for every sentence. if the noun is an abstract idea or does not have physical properties, describe how it could be represented in visual form. 

you will list those descriptors after each sentence in the format of: The "sample subject/object" is "sample descriptor"

Next, remember that the descriptions for nouns must be the same if you are referring to the same noun in a new sentence. Because the artist has a short memory, you must repeat the description each time the noun reappears in another sentence. Here is an example:
"The woman walked outside"
"The woman pet the dog"
An appropriate modification would be
"The woman walked outside", (the woman is tall with brown hair, wearing red), (Setting: outside)
"The woman pet the dog" (the woman is tall with brown hair) (the dog is a black lab with a spot on his side) (Setting: outside)

Notice how the description for the woman is the same, because the sentences are reffering to the same woman. Make sure this is the case for your sentences.
You cannot change the descriptors for the same noun. once you come up with one, repeat that one whenever the noun in question appears again in a future sentence

Also, you will specify a setting after the descriptors in each sentence in the style of: setting: "sample setting". You will replace the "sample setting" with whatever you choose. The setting will be what fits best in context.
You will only add content after the sentence.

Here is an example of how you would format a description and setting together: if the sentence was "The woman walked outside", an appropriate modification would be "The woman walked outside", (the woman is tall with brown hair and is wearing a red dress) (Setting: The park outside a house)

Also remember that if you see the pronoun "I", you have to describe it like any other noun each time

Make sure to re-describe each noun as it was originally. if you would like to add in context description, do so, but ensure you always describe the physical features first`
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
  console.log('\n\nSTORY:')
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
