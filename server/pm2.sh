#!/bin/sh

pm2 stop choc-api
git pull
yarn
yarn build
pm2 start dist/index.js --name choc-api

