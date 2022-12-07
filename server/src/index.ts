import express from "express"
import cors from "cors"
import words from "./words.json"
import { singleFileUpload, uploadFile } from "./file-uploads"
import { transcribeAudioFile } from "./speech-to-text"

const app = express()
const port = 8080
const host = "0.0.0.0"

app.use(express.json())
app.use(cors())

app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "OK" })
})

app.use(express.static("public"))

app.post("/new-word", async (req, res) => {
  const { deviceId } = req.body
  const word = words[Math.floor(Math.random() * words.length)]
  console.log(`📖 New word (device ID ${deviceId}): ${word}`)
  res.json({
    word,
  })
})

app.post("/answer", singleFileUpload, async (req, res) => {
  try {
    const { deviceId, word } = req.body

    console.log(`⏳ Uploading file ${req.file?.originalname} ...`)

    const filePath = await uploadFile(req.file as Express.Multer.File)

    console.log(
      `⏳ Checking answer for word (deviceId ${deviceId}): ${word} ...`
    )

    const transcriptions = await transcribeAudioFile(filePath)

    let correct = false
    transcriptions.forEach((transcription) => {
      if (transcription === word.toLowerCase()) {
        correct = true
      }
    })

    console.log(`${correct ? "✅ Correct" : "❌ Incorrect"} answer`)

    return res
      .json({
        correct,
      })
      .send()
  } catch (error) {
    console.error(error)
    return res.status(500).send()
  }
})

app.listen(port, host, () => {
  console.log(`🍫 Started choc API @ http://${host}:${port}`)
})
