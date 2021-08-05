const express = require('express')
const cors = require('cors')
const treatErrors = require('./middlewares/treatErrors')

const app = express()

app.use(express.json())
app.use(cors())


const Puppeteer = require('./services/puppeteer')
const puppeteer = new Puppeteer()

app.use(treatErrors)

app.get('/:job', async (req, res) => {
    const { job } = req.params

    const avgHourlyRate = await puppeteer.scrapWorkana(job)

    return res.json(avgHourlyRate)
})

const port = 4000

app.listen(port, () => {
    console.log('Listening on port ', port)
})