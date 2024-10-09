import "./routes/index.route.js"
import http from "./config/server.js";


http.listen(3000, function () {
    console.log("Server running on port 3000")
})