import config from "./config/index.js";
import app from "./config/app.config.js";

app.listen(config.port, '0.0.0.0', function () {
    console.log(`Server running on port ${config.port}`)
})