import "./routes/index.route.js"
import http from "./config/server.js";

const PORT = process.env.PORT ?? 3000

http.listen(PORT, '0.0.0.0', function () {
    console.log(`Server running on port ${PORT}`)
})