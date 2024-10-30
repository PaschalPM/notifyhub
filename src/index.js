import appConfig from "./config/app.config.js";
import http from "./config/http.config.js";

http.listen(appConfig.port, '0.0.0.0', function () {
    console.log(`Server running on port ${appConfig.port}`)
})