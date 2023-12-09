const authRoute = require('./src/routes/AuthRoute')
const userRoute = require('./src/routes/UserRoute')
const roleRoute = require('./src/routes/RoleRoute')
const categoryRoute = require('./src/routes/CategoryRoute')
const productRoute = require('./src/routes/ProductRoute')
const reviewProductRoute = require('./src/routes/ReviewProductRoute')
const blogRoute = require('./src/routes/BlogRoute')
const reviewBlogRoute = require('./src/routes/ReviewBlogRoute')
const wishlistRoute = require('./src/routes/WishlistRoute')
const cartRoute = require('./src/routes/CartRoute')

const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')


const app = express()
const port = 8080

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-data
app.use(express.static('public'))

app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/role", roleRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/review-product", reviewProductRoute);
app.use("/blog", blogRoute);
app.use("/review-blog", reviewBlogRoute);
app.use("/wishlist", wishlistRoute);
app.use("/cart", cartRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});