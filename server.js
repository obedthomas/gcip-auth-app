const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const connectDB = require('./config/db')
const path = require('path')

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
app.use('/api/stats', require('./routes/api/stats'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Listen to PORT
app.listen(PORT, () => console.log(`Sever started on port: ${PORT}`))
