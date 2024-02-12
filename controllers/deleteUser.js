import writeToFile from "../utils/writeToFile.js";

const regexV4 = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export default (req, res) => {
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
        } else {
            req.users.splice(index, 1);
            writeToFile(req.users);
            res.writeHead(204, { "Content-Type": "application/json" });
            res.end(JSON.stringify(req.users));
        }
    } else {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            title: "Internal Server Error",
            message: "An unexpected error occurred while processing the request.",
        }));
    }
};
