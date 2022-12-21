# Read 'n' Feed

> 👧 This is a hacky, cobbled-together device to help kids who can't read good. 👦

![zoolander](https://github.com/blairjordan/readfeed/raw/main/media/zoolander-plaque.png)

Here's how it works:

🔤 A word is presented to the user.

🗣 The user must say the correct word out loud.

🍫 If the answer is correct, a chocolate will be dispensed.

## Getting started

### Hardware

![device](https://github.com/blairjordan/readfeed/raw/main/media/device.png)

Servo motor wiring:

![servo wiring](https://github.com/blairjordan/readfeed/raw/main/media/wiring.png)

### Server

Install and Authenticate Google Cloud on your server machine: https://cloud.google.com/sdk/docs/install

Setup a Google Cloud storage bucket: https://cloud.google.com/storage/docs/creating-buckets

Enable the Google Speech-to-Text API: https://cloud.google.com/speech-to-text

In `server/.env`, set `GCLOUD_STORAGE_BUCKET` to your storage bucket name.

Start the server (from `server` directory):

```
yarn && yarn build && yarn start
```

### Client (Raspberry Pi)

Install NodeJS: https://nodejs.org/en/download/

Set the server URL (`API_BASE_URL` in `client/.env`).

For convenience, I run https://ngrok.com/ on my server.

Start the client (from `client` directory):

```
yarn && yarn build && yarn start
```