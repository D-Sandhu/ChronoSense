const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const PORT = 8000;

const shoppingCartRouter = require("./routes/shopping-cart/cart")

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  // Mount the shopping cart router
  .use("/cart", shoppingCartRouter)

  .get("/init", (req, res) => {
    res.status(200).json({ status: 200, message: "init set up" })
  })

  .listen(PORT, () => {
    console.log(`Listening on port ${PORT} ⚡`);
  });
