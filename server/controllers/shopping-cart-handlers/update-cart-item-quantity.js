const {
  DB_NAME, // the name of the database to connect to
  connect, // function to connect to the database
  disconnect, // function to disconnect from the database
  client, // MongoDB client instance
} = require("../../config/database");

const updateItemQuantity = async (req, res) => {
  const { _id } = req.params;
  const { quantity } = req.query;

  try {
    // connect to the database
    await connect();

    // select the database
    const db = client.db(DB_NAME);

    // get the cart collection
    const cartCollection =  db.collection("cart");

    console.log(cartCollection);

    res.send("hello");
  } catch (err) {
    console.error(err);

    // Send a 500 Internal Server Error response
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  } finally {
    // always disconnect from the database
    await disconnect();
  }
};

module.exports = { updateItemQuantity };
