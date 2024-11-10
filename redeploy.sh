#! /usr/bin/bash

# install dependencies
npm i;

# Stop Node Server
npm run pm2-stop

# Start Node Server
npm run pm2-start
