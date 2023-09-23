import express from 'express'
const app = express()
const port = 7474

app.set('view engine', 'ejs')

// Remove any trailing slashes with redirect
// https://stackoverflow.com/a/15773824
app.use((req, res, next) => {
  if (req.path.slice(-1) === '/' && req.path.length > 1) {
    const query = req.url.slice(req.path.length)
    const safepath = req.path.slice(0, -1).replace(/\/+/g, '/')
    res.redirect(301, safepath + query)
  } else {
    next()
  }
})

// Static Web Files
app.use(express.static('public'))
// Flatten icons to /public for device support reasons
app.use(express.static('public/icons'))

// Add endpoints
import { router as rootRouter } from './routes/root'
app.use('/', rootRouter)

// Host express server
app.listen(port, () => {
  console.info('Express server listening on http://127.0.0.1:' + port)
})
