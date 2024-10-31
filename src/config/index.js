import dotenv from "dotenv"
dotenv.config()

const {
    PORT,
    ENV,
    SERVICE_ACCOUNT
} = process.env


export default {
    port: PORT ?? 5000,
    env: ENV ?? "development",
    serviceAccount: JSON.parse(SERVICE_ACCOUNT)
}
