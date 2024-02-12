import fs from "fs/promises";
import path from "node:path";
import { fileURLToPath } from 'node:url';

export default async function writeToFile(data) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "..", "data", "users.json");
    console.log(filePath)
    console.log("the data to write in file :", data);
    try {
        await fs.writeFile(filePath, JSON.stringify(data), "utf-8");
    } catch (err) {
        console.log(err);
    }
}
