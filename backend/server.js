import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

// error middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// connect to MongoDB
import connectDB from './config/db.js'
// route for product
import productRoutes from './routes/productRoutes.js'
// route for user and auth
import userRoutes from './routes/userRoutes.js'
// route for orders
import orderRoutes from './routes/orderRoutes'

dotenv.config()
// connect to DB
connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
