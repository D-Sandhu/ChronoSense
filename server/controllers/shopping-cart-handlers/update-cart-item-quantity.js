const {
  DB_NAME, // the name of the database to connect to
  connect, // function to connect to the database
  disconnect, // function to disconnect from the database
  client, // MongoDB client instance
} = require("../../config/database");

const updateItemQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    // connect to the database
    await connect();

    // select the database
    const db = client.db(DB_NAME);

    // get the products collection
    const productsCollection = db.collection("products");

    /*
    Steps
    1- check if the item exists in the products collection using productsId
    if it doesn't then send response with error
    2- check if the item is in the cart
    if it isn't then send response with error
    3- update the product's numInStock
    4- update the cart item with the new quantity and numInStock
    5- send the cart to the client
    */

    // grab the product that matches the productId
    const product = await productsCollection.findOne({ _id: productId });

    // check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // TODO - logic to check if there's enough stock

    // get the cart collection
    const cartCollection = db.collection("cart");

    // grab the cart from the cart collection
    const { cartItems } = await cartCollection.findOne({});

    // grab the item from the cart
    const itemInCart = cartItems.find((item) => item._id === productId);

    // if the item isn't the cart, send a response with an error
    if (!itemInCart) {
      return res
        .status(404)
        .json({ status: 400, message: "Item is not in the cart!" });
    }
    // now we know the product exists and if it's in the cart and we can update the products and cart collections

    // calculate the difference between the original quantity and the new quantity
    const quantityDiff = itemInCart.quantity - quantity;

    // first, update the products collection
    // update product's numInStock based on difference in quantity
    await productsCollection.updateOne(
      { _id: productId },
      { $inc: { numInStock: quantityDiff } }
    );

    // second, update the cart collection
    const updatedCart = await cartCollection.findOneAndUpdate(
      {},
      {
        $set: {
          "cartItems.$[element].numInStock": product.numInStock + quantityDiff,
          "cartItems.$[element].quantity": quantity,
        },
      },
      {
        arrayFilters: [{ "element._id": productId }],
        returnDocument: "after",
      }
    );

    // destructure cartItems from updatedCart
    const {
      value: { cartItems: newCart },
    } = updatedCart;

    // send response to client
    res.status(200).json({
      status: 200,
      message: "Cart item updated",
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

module.exports = { updateItemQuantity };
