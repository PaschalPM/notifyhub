import dotenv from "dotenv"
dotenv.config()

import { readFileSync } from "fs"

import { env } from "../constants/app.js"

const {
    PORT,
    ENV,
    SERVICE_ACCOUNT_JSON,
    SERVICE_ACCOUNT_FILE_PATH,
    MAIN_API_URL
} = process.env


// Set Service Account Properties based on ENV
let serviceAccount

switch (ENV) {
    case env.VERCEL:
        serviceAccount = JSON.parse(SERVICE_ACCOUNT_JSON)
        break;
    default:
        serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_FILE_PATH, "utf8"))
}

export default {
    port: PORT ?? 5000,
    env: ENV ?? "development", // development, production, vercel
    serviceAccount,
    mainApiUrl: MAIN_API_URL ?? "http://localhost:8000"
}
