import express from "express";
import { Server } from "socket.io";
 import { createServer } from "http";
import path from "path";

const app = express();

const server = createServer(app);
const io = new Server(server);



app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("Hello its from backend")
})

io.on('connection', (socket) => {
    console.log("A user Connected");
});

server.listen(4000, () => {
    console.log("Server running at http://localhost:4000");
})