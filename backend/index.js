const sequelizeConfig = require('./src/config/sequelize.config')
const client = require('./src/connect/redis.connect');

const authRoute = require('./src/routes/auth.route')
const userRoute = require('./src/routes/user.route')
const roleRoute = require('./src/routes/role.route')
const categoryRoute = require('./src/routes/category.route')
const productRoute = require('./src/routes/product.route')
const reviewProductRoute = require('./src/routes/review_product.route')
const blogRoute = require('./src/routes/blog.route')
const reviewBlogRoute = require('./src/routes/review_blog.route')
const wishlistRoute = require('./src/routes/wishlist.route')
const cartRoute = require('./src/routes/cart.route')
const orderRoute = require('./src/routes/order.route')
const codeRoute = require('./src/routes/code.route')

const {
  loadUserFromDatabaseToCacheService
} = require('./src/services/auth.service');

const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors');

// log each request send to backend
var morgan = require('morgan');

// hide backend technology at header fields
var helmet = require('helmet');

// compress response from backend to frontend
var compression = require('compression');
const { loadProductDatabaseToCacheService } = require('./src/services/product.service');

const app = express()

app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})) // for parsing application/x-www-form-data
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

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json(error.message);
});


const server = app.listen(sequelizeConfig.app.port, async () => {
  // clear redis storage
  try {
    await client.flushAll('ASYNC');
    console.log("Flush redis storage successfully!");
  } catch(e) {
    console.error("Flush redis storage failed", e);
  }

  // load database to cache
  try {
    await loadUserFromDatabaseToCacheService();
  } catch (e) {
    console.error("Load redis storage have problem", e);
  }

  console.log("Load redis storage successfully!");
    await loadProductDatabaseToCacheService();

  console.log(`Example app listening on port ${sequelizeConfig.app.port}`)
});