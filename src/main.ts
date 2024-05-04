import cors from "cors"
import "dotenv/config"
import express from "express"
import generatePDF from "./lib/generatePDF"
import logger from "./lib/logger"
import { errorHandler } from "./middlewares/error-handler"
import { expressLogger, errorLogger } from "./middlewares/express-logger"
import { ReqBodySchema } from "./validation"

const app = express()

// // Enable CORS for a specific domain
// const corsOptions = {
//     origin: [
//         'https://your-nextjs-app-domain.com',
//         'http://127.0.0.1:3000',
//         'http://localhost:3000',
//     ],
// }

app.use(expressLogger)
app.use(cors())
app.use(express.json())

// Set EJS as the view engine
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from express hehe!" })
})

app.get("/generate-pdf", (req, res) => {
    res.status(200).json({ message: "Hello from /generate-pdf route!" })
})

app.get("/400", (req, res) => {
    res.status(400).json({
        message: "BAD REQ",
    })
})
app.get("/500", (req, res) => {
    res.status(500).json({
        message: "OH NOOSE",
    })
})
app.get("/error-route", (req, res) => {
    throw new Error("loh error yeeeeeee")
})

app.post("/generate-creditor-pdf", async (req, res, next) => {
    try {
        const { data } = ReqBodySchema.parse(req.body)

        res.setHeader("Content-Disposition", 'attachment; filename="file.pdf"')
        res.setHeader("Content-Type", "application/pdf")

        const pdfFile: Buffer = await generatePDF(data)

        res.send(pdfFile)
    } catch (err) {
        next(err)
    }
})

app.use(errorLogger)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
})
