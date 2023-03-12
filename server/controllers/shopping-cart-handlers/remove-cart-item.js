const {
  DB_NAME, // the name of the database to connect to
  connect, // function to connect to the database
  disconnect, // function to disconnect from the database
  client, // MongoDB client instance
} = require("../../config/database");

const removeCartItem = async (req, res) => {
  // grab the productId from the params
  const { productId } = req.params;

  try {
    // connect to the database
    await connect();

    // select the database
    const db = client.db(DB_NAME);
    //

    // get the cart collection
    const cartCollection = db.collection("cart");
    // get the products collection
    const productsCollection = db.collection("products");

    // grab the cartItems
    const { cartItems } = await cartCollection.findOne({});

    // check if the item in question is in the cart
    const itemInCart = cartItems.find((item) => item._id === productId);

    if (!itemInCart) {
      return res
        .status(404)
        .json({ status: 400, message: "Item is not in the cart!" });
    }

    // update the cart
    const {
      value: { cartItems: newCart },
    } = await cartCollection.findOneAndUpdate(
      {},
      { $pull: { cartItems: { _id: productId } } },
      {
        returnDocument: "after",
      }
    );

    // update the product in the products collection
    await productsCollection.updateOne(
      { _id: productId },
      { $inc: { numInStock: itemInCart.quantity } }
    );

    // send response to client
    res.status(200).json({
      status: 200,
      message: "Cart item removed!",
      cartItems: newCart,
    });
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

module.exports = { removeCartItem };
