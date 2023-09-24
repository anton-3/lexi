/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { app } from '..'
import bodyParser from 'body-parser'
import util from '../lib/util'
const router = Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/story', (req, res) => {
  if (!app.locals.story || !app.locals.storyEnglish || !app.locals.imageLinks) {
    res.redirect('/')
  } else {
    const storyPages = []
    const storySentences = app.locals.story.split('\n')
    const storyEnglishSentences = app.locals.storyEnglish.split('\n')
    for (let i = 0; i < storySentences.length; i++) {
      const page: { [key: string]: string } = {}
      page['imageUrl'] = app.locals.imageLinks[i]
      page['caption'] = storySentences[i]
      page['englishCaption'] = storyEnglishSentences[i]
      storyPages.push(page)
    }
    res.render('story', {
      storyPages: storyPages,
    })
  }
})

router.post('/', bodyParser.json(), async (req, res) => {
  // req.body.words is a post body parameter containing all words
  // space-separated e.g. "perro hombre queso cocina"
  try {
    await util.generateAll(String(req.body.words), String(req.body.language))
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export { router }
