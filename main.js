import express from 'express'
import puppeteer from 'puppeteer'
import cors from 'cors'

const app = express()

// Enable CORS for a specific domain
const corsOptions = {
    origin: ['https://your-nextjs-app-domain.com', 'http://127.0.0.1:3000', 'http://localhost:3000'],
}

app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req, res) => {
    console.log('first')
    res.status(200).json({ message: 'Hello from express!' })
})

app.post('/generate-pdf', async (req, res) => {
    const { html } = req.body

    try {
        if (!html) {
            throw new Error('html string is not provided on req body')
        }
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        // Set content of the page to the received HTML string
        await page.setContent(html)

        // Generate PDF from the HTML content
        const pdfBuffer = await page.pdf({ format: 'A4' })

        // Close the browser
        await browser.close()

        // Send the PDF as response
        res.set('Content-Type', 'application/pdf')
        res.set('Content-Disposition', 'attachment; filename="generated.pdf"')
        res.send(pdfBuffer)
    } catch (error) {
        console.error('Error generating PDF:', error)
        res.status(500).json({
            message: 'Error generating PDF',
            error: error.message,
        })
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
