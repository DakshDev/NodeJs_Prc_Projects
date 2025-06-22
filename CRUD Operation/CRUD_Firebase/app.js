import express from "express";
// Routers
import {userRouter} from "./routes/users.route.js"


const app = express();




// Route Middelwear
app.use(userRouter)


app.listen(3000, () => console.log("live..."))