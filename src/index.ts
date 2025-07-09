require('dotenv').config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import { getRandomColorFormats } from './utils/color.helper'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

let publicPath: string
publicPath = path.join(__dirname, '..', 'public')

console.log(`Serving static files from: ${publicPath}`)
console.log(`Current PORT: ${port}`)
app.use(express.static(publicPath))

app.get('/api/random-color', (req: Request, res: Response) => {
  try {
    const colorData = getRandomColorFormats()
    res.status(200).json(colorData)
  } catch (error) {
    console.error('Error generating the color: ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// --- Start Server ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
