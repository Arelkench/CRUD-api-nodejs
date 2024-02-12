import requestBodyparser from "../utils/parserReqBody.js";
import writeToFile from "../utils/writeToFile.js";

const regexV4 = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export default async (req, res) => {
    const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    const id = req.url.split("/")[3];

    if (!regexV4.test(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            title: "Validation Failed",
            message: "UUID is not valid",
        }));
    } else if (baseUrl === "/api/users/" && regexV4.test(id)) {
        const index = req.users.findIndex(user => user.id === id);
        if (index === -1) {
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Not Found", message: "User not found" }));
            res.end();
            return;
        }
        try {
            const body = await requestBodyparser(req);
            req.users[index] = { id, ...body };
            writeToFile(req.users);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(req.users[index]));
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
