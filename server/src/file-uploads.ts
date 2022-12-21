import process from "process"
import Multer from "multer"
import { RequestHandler } from "express"
import { Storage } from "@google-cloud/storage"

const storage = new Storage()

// Multer processes file uploads and make them available via req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // max 25 mb file
  },
})

const singleFileUpload: RequestHandler = multer.single("file")

async function uploadFile(file: Express.Multer.File): Promise<string> {
  const GCLOUD_STORAGE_BUCKET = process.env.GCLOUD_STORAGE_BUCKET || ""

  if (!GCLOUD_STORAGE_BUCKET) {
    throw new Error("GCLOUD_STORAGE_BUCKET not set")
  }

  const bucket = storage.bucket(GCLOUD_STORAGE_BUCKET)
  const blob = bucket.file(file.originalname)
  const blobStream = blob.createWriteStream()

  return new Promise((resolve, reject) => {
    blobStream.on("finish", () => {
      const publicUrl = `gs://${bucket.name}/${blob.name}`
      console.log(`📤 Uploaded file to ${publicUrl}`)
      resolve(publicUrl)
    })
    blobStream.on("error", (error) => {
      reject(error.toString())
    })
    blobStream.end(file.buffer)
  })
}

export { singleFileUpload, uploadFile }
