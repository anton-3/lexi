/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import bodyParser from 'body-parser'
import util from '../lib/util'

const router = Router()

router.post('/gpt', bodyParser.json(), async (req, res) => {
  try {
    const prompt = String(req.body.prompt)
    res.send(await util.gpt(prompt))
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

// generate the story with the GPT API
// takes a json parameter "words" with the list of foreign language words
// formatted as a string separated by spaces e.g. "hombre perro carro"
router.post('/generateStory', bodyParser.json(), async (req, res) => {
  try {
    res.send(await util.generateStory(String(req.body.words)))
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

// translate the story into English with DeepL API
// translates the json parameter "text"
router.post('/translate', bodyParser.json(), async (req, res) => {
  try {
    res.send(await util.translate(String(req.body.text)))
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

export { router }
