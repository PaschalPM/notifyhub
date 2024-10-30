import dotenv from "dotenv"
dotenv.config()

const {
    PORT,
    ENV,
    SERVICE_ACOUNT_PROJECT_ID,
    SERVICE_ACCOUNT_PRIVATE_KEY,
    SERVICE_ACOUNT_CLIENT_EMAIL,
    CORS_ALLOWED_ORIGIN
} = process.env


export default {
    port: PORT ?? 5000,
    env: ENV ?? "development",
    corsAllowedOrigin: CORS_ALLOWED_ORIGIN,
    serviceAccount: {
        projectId: SERVICE_ACOUNT_PROJECT_ID,
        privateKey: SERVICE_ACCOUNT_PRIVATE_KEY,
        clientEmail: SERVICE_ACOUNT_CLIENT_EMAIL
    }
}
