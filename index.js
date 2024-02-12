import http from "node:http";
import getReq from "./controllers/getUsers.js";
import postReq from "./controllers/postUser.js";
import putReq from "./controllers/putUser.js";
import deleteReq from "./controllers/deleteUser.js";
import users from "./data/users.json" assert { type: "json" };

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
    req.users = users;
    switch (req.method) {
        case "GET":
            getReq(req, res);
            break;
        case "POST":
            postReq(req, res);
            break;
        case "PUT":
            putReq(req, res);
            break;
        case "DELETE":
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
