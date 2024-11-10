import appConfig from "./config/app.config.js";
import app from "./app.js";

app.httpServer.listen(appConfig.port, '0.0.0.0', function () {
    console.log(`Server running on port ${appConfig.port} in ${appConfig.env} environment`)
})