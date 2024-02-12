import fs from "fs/promises";
import path from "path";

export default async function writeToFile(data) {
    const filePath = path.join(__dirname, "..", "data", "movies.json");
    console.log("the data to write in file :", data);
    try {
        await fs.writeFile(filePath, JSON.stringify(data), "utf-8");
    } catch (err) {
        console.log(err);
    }
}
