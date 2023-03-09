const {
  DB_NAME, // the name of the database to connect to
  connect, // function to connect to the database
  disconnect, // function to disconnect from the database
  client, // MongoDB client instance
} = require("../../config/database");

const addCartItem = async (req, res) => {
  // Deconstruct the request body
  const { _id, name, price, numInStock, imageSrc, quantity } = req.body;

  try {
    // connect to the database
    await connect();

    // select the database
    const db = client.db(DB_NAME);

    // step 1: find the product in the "products" collection and decrement numInStock by the quantity
    const { modifiedCount } = await db
      .collection("products")
      .updateOne({ _id }, { $inc: { numInStock: -quantity } });
    // if the item is not found, send an error with a message
    if (modifiedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }

    // step 2: increment the numInStock of and quantity of the item and use modifiedCount to check if it's already in the cart
    const { modifiedCount: cartModifiedCount } = await db
      .collection("cart")
      .updateOne(
        { "cartItems._id": _id },
        {
          $inc: {
            "cartItems.$.numInStock": -quantity,
            "cartItems.$.quantity": quantity,
          },
        }
      );

    // Check to see if item existed in cart by checking if anything was modified in the last operation
    if (cartModifiedCount === 0) {
      // If the item did not exist in the cart, add it
      await db.collection("cart").updateOne(
        {},
        {
          $push: {
            cartItems: {
              _id,
              name,
              price,
              numInStock: numInStock - quantity,
              quantity,
              imageSrc,
            },
          },
        }
      );
    }

    // Find the shopping cart in the database
    const { cartItems } = await db.collection("cart").findOne();

    // Send the shopping cart in the response
    res
      .status(200)
      .json({ status: 200, cartItems, message: "Item added to cart!" });
  } catch (err) {
  } finally {
    // always disconnect from the database
    await disconnect();
  }
};

module.exports = { addCartItem };
