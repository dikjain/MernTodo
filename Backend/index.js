import express from "express"
import cors from "cors"
import connectDB from "./DataBase/db.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"
import todoRoutes from "./routes/todo.routes.js"
import http from "http"
import path from "path"


const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const server = http.createServer(app);
app.use(cors({
    origin: "*",
    Credential:true,
    methods: "GET, POST, PUT, DELETE",
}))

app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"))
})

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"))
})
server.listen(3000,()=>{
    console.log("Server is running on port 3000");
    connectDB();
})