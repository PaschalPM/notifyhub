import admin from "firebase-admin";
import appConfig from "./app.config.js";

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(
        appConfig.serviceAccount
    ),
});
