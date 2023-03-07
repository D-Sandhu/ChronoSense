const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const PORT = 8000;

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  .get("/init", (req, res) => {
    res.status(200).json({ status: 200, message: "init set up" })
  })

  .listen(PORT, () => {
    console.log(`Listening on port ${PORT} ⚡`);
  });
