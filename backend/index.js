const authRoute = require('./src/routes/AuthRoute')

const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-
app.use("/", authRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});