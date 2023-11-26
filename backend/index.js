const authRoute = require('./src/routes/AuthRoute')
const roleRoute = require('./src/routes/RoleRoute')
const categoryRoute = require('./src/routes/CategoryRoute')

const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-data
app.use(express.static('public'))

app.use("/", authRoute);
app.use("/role", roleRoute);
app.use("/category", categoryRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});