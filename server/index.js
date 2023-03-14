const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const PORT = 8000;

const shoppingCartRouter = require("./routes/shopping-cart-routes/cart-route");
const productsRouter = require("./routes/products-route");

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  // Mount the shopping cart router
  .use("/api/cart", shoppingCartRouter)

  // Mount the products router
  .use("/api/products", productsRouter)


  .listen(PORT, () => {
    console.log(`Listening on port ${PORT} ⚡`);
  });
