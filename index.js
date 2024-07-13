import express from "express";
import { Server } from "socket.io";
 import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const server = createServer(app);
const io = new Server(server);



app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
app.set(express.static(path.join(__dirname, "public")));
// console.log(path.join(__dirname, "public"));

// Set up static file serving
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));


app.get("/", (req, res) => {
    // res.send("Hello its from backend")
    res.render("index")
})

io.on('connection', (socket) => {
    console.log("A user Connected");
});

server.listen(4000, () => {
    console.log("Server running at http://localhost:4000");
})