import express from "express"
import dotenv from "dotenv"
import connectBD from "./db/database.js"
const app = express()

dotenv.config()
connectBD()


const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.listen(PORT, () => {
    console.log(`App is Listening on PORT: ${PORT}`)
})