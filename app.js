import express from "express"
import dotenv from "dotenv"
import connectBD from "./db/database.js"
import userRoute from "./routes/user.route.js"
const app = express()

dotenv.config()
connectBD()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1/user", userRoute)

const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.listen(PORT, () => {
    console.log(`App is Listening on PORT: ${PORT}`)
})