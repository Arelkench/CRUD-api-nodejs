import crypto from "crypto";
import parserReqBody from "../utils/parserReqBody.js";
import writeToFile from "../utils/writeToFile.js";

export default async (req, res) => {
    if (req.url === "/api/users" || req.url === "/api/users/") {
        try {
            const body = await parserReqBody(req);
            body.id = crypto.randomUUID();
            req.users.push(body);
            writeToFile(req.users);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end();
        } catch (err) {
            console.log(err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                title: "Internal Server Error",
                message: "An unexpected error occurred while processing the request.",
            }));
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
};
