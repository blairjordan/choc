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

  const [response] = await client.recognize(request as any)

  if (
    !response.results ||
    !response.results[0] ||
    !response.results[0].alternatives
  ) {
    return []
  }

  return response.results[0].alternatives.map((a: any) => a.transcript)
}
