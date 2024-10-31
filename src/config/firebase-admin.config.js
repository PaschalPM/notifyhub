import admin from "firebase-admin";
import appConfig from "./index.js";

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(
        appConfig.serviceAccount
    ),
});
