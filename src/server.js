const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8000

const router = require('../routes/route')
const corsOptions = {
    origin: 'https://foodway-three.vercel.app/',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server was Started at PORT ${PORT}`)
})