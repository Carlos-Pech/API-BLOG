import app from "./app.js";
import { port } from "./config.js";
import { connectToDB } from "./db.js";

async function main() {
    await connectToDB();
    app.listen(port);
    console.log("Server on port ", port);
    console.log("http://localhost:3000/");
}

main();
