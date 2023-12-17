const config = require('./src/config/sequelize.config')

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
const orderRoute = require('./src/routes/OrderRoute')
const codeRoute = require('./src/routes/CodeRoute')

const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors');

// log each request send to backend
var morgan = require('morgan');

// hide backend technology at header fields
var helmet = require('helmet');

// compress response from backend to frontend
var compression = require('compression');

const app = express()

app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(compression());
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
app.use("/order", orderRoute);
app.use("/code", codeRoute);

app.options('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(config.app.port, () => {
  console.log(`Example app listening on port ${config.app.port}`)
});