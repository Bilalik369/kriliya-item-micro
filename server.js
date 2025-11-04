import express from "express"
import dotenv from "dotenv"
import {connectdb} from "./lib/db.js"
import itemRoutes from "./routes/item.route.js"


dotenv.config()



const app = express()

app.use(express.json());

const PORT = process.env.PORT

app.use("/api/items", itemRoutes)
connectdb()
app.listen(PORT , ()=>{
    console.log(`server is running in Port ${PORT}`)
})