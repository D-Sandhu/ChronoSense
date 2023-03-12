const {
  DB_NAME, // the name of the database to connect to
  connect, // function to connect to the database
  disconnect, // function to disconnect from the database
  client, // MongoDB client instance
} = require("../../config/database");

const clearCart = async (req, res) => {
  try {
    // connect to the database
    await connect();

    // select the database
    const db = client.db(DB_NAME);

    // grab the cart collection
    const cartCollection = db.collection("cart");
    // grab the products collection
    const productsCollection = db.collection("products");

    const {
      value: { cartItems },
    } = await cartCollection.findOneAndUpdate(
      {},
      {
        $set: {
          cartItems: [],
        },
      },
      {
        returnDocument: "before",
      }
    );

    // We need to loop over the items from the original cart and add that quantity to the stock
    // of the item in the database
    for (let i = 0; i < items.length; i++) {
      const item = cartItems[i];
      await productsCollection.findOneAndUpdate(
        { _id: item._id },
        {
          $inc: {
            numInStock: item.quantity,
          },
        }
      );
    }

    // Send the empty cart in the response
    res.status(200).json({
      status: 200,
      message: "Cart cleared!",
      cart: [],
    });
  } catch (error) {
    console.error(error);
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

module.exports = { clearCart };
