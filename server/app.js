import express from "express"
import dotenv from "dotenv"
import connectBD from "./db/database.js"
import userRouter from "./routes/user.route.js"
import todoRouter from "./routes/todo.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

dotenv.config()
connectBD()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/v1/user", userRouter)
app.use("/api/v1/todo", todoRouter)

const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.listen(PORT, () => {
    console.log(`App is Listening on PORT: ${PORT}`)
})