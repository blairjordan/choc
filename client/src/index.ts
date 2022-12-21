import readline from "readline"
import childProcess from "child_process"
import request from "superagent"
import chalk from "chalk"
import Box from "cli-box"

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080"
const DEVICE_ID = "unit001"
const FILE_PATH = "out.flac"
const OPEN_PATH = "open.py"

export const API = ({ baseUrl }) => ({
  getNewWord: async ({ deviceId }) =>
    request
      .post(`${baseUrl}/new-word`)
      .send({
        deviceId,
      })
      .set("Accept", "application/json"),
  checkAnswer: async ({ deviceId, word }) =>
    request
      .post(`${baseUrl}/answer`)
      .accept("application/json")
      .attach("file", FILE_PATH)
      .field("deviceId", deviceId)
      .field("word", word),
})

const getBox = (text: string) =>
  Box("30x5", {
    text,
    stretch: false,
    autoEOL: true,
    vAlign: "center",
    hAlign: "middle",
  })

const api = API({ baseUrl: API_BASE_URL })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log("🍫 welcome to read'n'feed")

const waitForInput = async () => {
  console.log("⏳ Fetching new word ...")
  const {
    body: { word },
  } = await api.getNewWord({ deviceId: DEVICE_ID })

  const box = getBox(chalk.blue(word))
  console.log(`\n🗣️  Say:\n${box}\n`)

  rl.question("⌨ Press ENTER to answer", async (answer) => {
    if (answer == "exit") {
      rl.close()
    } else {
      console.log("🔴 Recording ...")

      childProcess.spawnSync("ffmpeg", [
        "-y",
        "-f",
        "alsa",
        "-ac",
        "1",
        "-i",
        "hw:2",
        "-t",
        "4",
        "-sample_rate",
        "16000",
        "out.flac",
      ])

      console.log("⏳ Checking Answer ...")

      const {
        body: { correct },
      } = await api.checkAnswer({ deviceId: DEVICE_ID, word })

      console.log(`${correct ? "✅ Correct" : "❌ Incorrect"} answer`)

      if (correct) {
        childProcess.spawnSync("python3", [OPEN_PATH])
      }

      waitForInput()
    }
  })
}

waitForInput()
