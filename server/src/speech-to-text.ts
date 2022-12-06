import speech from "@google-cloud/speech"

const client = new speech.SpeechClient()

export async function transcribeAudioFile(gcsUri: string): Promise<string[]> {
  const audio = {
    uri: gcsUri,
  }
  const config = {
    encoding: "FLAC",
    languageCode: "en-AU",
  }
  const request = {
    audio: audio,
    config: config,
  }

  const [response] = (await client.recognize(request as any)) as any

  return response.results.map((result) =>
    result.alternatives.map((alt) => alt.transcript)
  )
}
