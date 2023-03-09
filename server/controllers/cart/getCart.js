const {
  DB_NAME, // the name of the database to connect to
  connect, // function to connect to the database
  disconnect, // function to disconnect from the database
  client, // MongoDB client instance
} = require("../../config/database");

const getCart = async (req, res) => {
  try {
    // connect to the database
    await connect();

    // select the database
    const db = client.db(DB_NAME);

    // grab the shopping cart in the database
    const { cart } = await db.collection("cart").findOne();

    // if there is no cart, create one and send an empty cart response
    if (!cart) {
      await db.collection("cart").insertOne({ cart: [] });
      return res.status(200).json({ status: 200, cart: [] });
    }

    // if there is a cart, send it in the response
    return res.status(200).json({ status: 200, cart });
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

module.exports = { getCart };
