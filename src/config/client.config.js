import axios from "axios";
import appConfig from "./app.config.js";

const mainApiClient = axios.create({
    baseURL: appConfig.mainApiUrl,
    headers: {
        "Content-Type": "application/json"
    }
})


export default {
    mainApiClient
}