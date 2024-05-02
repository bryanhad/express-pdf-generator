import express from 'express'
import cors from 'cors'
import generatePDF from './lib/generatePDF'
import ejs from 'ejs'

const app = express()

// Enable CORS for a specific domain
const corsOptions = {
    origin: [
        'https://your-nextjs-app-domain.com',
        'http://127.0.0.1:3000',
        'http://localhost:3000',
    ],
}

app.use(cors())
app.use(express.json())

// Set EJS as the view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from express!' })
})

app.post('/generate-pdf', async (req, res) => {
    const { data } = req.body

    res.setHeader('Content-Disposition', 'attachment; filename="file.pdf"')
    res.setHeader('Content-Type', 'application/pdf')

    const pdfFile = await generatePDF(data)

    res.send(Buffer.from(pdfFile))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
