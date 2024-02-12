export default async function parseReqBody(request) {
    return new Promise((resolve, reject) => {
        let body = "";
        request.on("data", (chunk) => {
            body += chunk;
        });
        request.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                console.log(err);
                reject({
                    title: "Parsing Failed",
                    message: "Failed to parse request body",
                });
            }
        });
    });
}
