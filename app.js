require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const productsRouter = require('./routes/products')

// middlewwre
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">product route</a>')
})

app.use('/api/v1/products', productsRouter)

// product route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listining on port: ${port}`))
  } catch (err) {
    console.log('error', err)
  }
}

start()