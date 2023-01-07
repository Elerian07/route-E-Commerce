import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './.env') })
import express from 'express'
import morgan from 'morgan'
import * as indexRouter from './src/modules/index.router.js'
import connectDB from './DB/connection.js'
import { handleError } from './src/services/asyncHandler.js'
import cors from 'cors'
const app = express()
// setup port and the baseUrl
const port = process.env.PORT
const baseUrl = process.env.BASEURL

//cors
app.use(cors({}))
//convert Buffer Data
app.use(express.json())
app.use(morgan("dev"))
//Setup API Routing 
app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1 > <br> <h5>By Mohamed Elerian</h5>")
})
app.use(`${baseUrl}/auth`, indexRouter.authRouter)
app.use(`${baseUrl}/user`, indexRouter.userRouter)
app.use(`${baseUrl}/product`, indexRouter.productRouter)
app.use(`${baseUrl}/category`, indexRouter.categoryRouter)
app.use(`${baseUrl}/subcategory`, indexRouter.subcategoryRouter)
app.use(`${baseUrl}/reviews`, indexRouter.reviewsRouter)
app.use(`${baseUrl}/coupon`, indexRouter.couponRouter)
app.use(`${baseUrl}/cart`, indexRouter.cartRouter)
app.use(`${baseUrl}/order`, indexRouter.orderRouter)
app.use(`${baseUrl}/brand`, indexRouter.branRouter)


app.use('*', (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method")
})

app.use(handleError)

connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))