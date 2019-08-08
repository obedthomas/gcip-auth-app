const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const connectDB = require('./config/db')
// test imports
const auth = require('./middleware/auth')

const app = express()
const PORT = process.env.PORT || 5000

// Init Middleware
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('short'))
app.use(helmet())

// Connect to DB
connectDB()

//Test endpoint
app.get('/api/', (req, res) => {
  res.json({ data: req.user })
})

// Endpoints
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/user', require('./routes/api/users'))
app.use('/api/company', require('./routes/api/company'))
app.use('/api/application', require('./routes/api/application'))

// Listen to PORT
app.listen(PORT, () => console.log(`Sever started on port: ${PORT}`))
