const {
  DB_NAME, // the name of the database to connect to
  connect, // function to connect to the database
  disconnect, // function to disconnect from the database
  client, // MongoDB client instance
} = require("../../config/database");

const addCartItem = async (req, res) => {
  // Destructure the request params
  const { productId } = req.params;
  // Destructure the request body
  const { quantity } = req.body;

  try {
    // connect to the database
    await connect();

    // select the database
    const db = client.db(DB_NAME);

    /* 
    Things to check for with product productId
    1- does the product exist
    2- is there enough stock to add the given quantity
    */

    // find the product by its productId in the products collection
    const product = await db.collection("products").findOne({ _id: productId });

    // check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // check if there is enough stock to add the given quantity
    if (product.numInStock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    // update numInStock for that product in products collection by subtracting quantity
    await db
      .collection("products")
      .updateOne({ _id: productId }, { $inc: { numInStock: -quantity } });

    /*
    Steps to add cart item to cart
    1- grab the cartItems from the cart collection (findOne)
    2- check if the item to add exists in the cartItems[] (using productId)
    3- if it exists then use findOneAndUpdate to increment ($inc) the quantity and set ($set) the new numInStock (use returnOriginal: false to grab the updated cart)
    4- if it doesn't exist then push ($push) the cart item to add into the cartItems[]
    5- send the updated cart to the client
    */

    // destructure what we need from the product to use
    const { name, price, numInStock, imageSrc } = product;

    const newNumInStock = numInStock - quantity;

    const itemToAdd = {
      _id: productId,
      name,
      price,
      numInStock: newNumInStock,
      quantity,
      imageSrc,
    };

    // grab the cart
    const { cartItems } = await db.collection("cart").findOne({});

    // if there are no cartItems (indicative of some error) then create a document and add a cartItems[] with the item
    if (!cartItems) {
      await db.collection("cart").insertOne({
        cartItems: [itemToAdd],
      });
    }

    // check if the item to add exists in the cartItems[]
    const isItemInCart = cartItems.some((item) => item._id === productId);

    let updatedCart;

    if (isItemInCart) {
      updatedCart = await db.collection("cart").findOneAndUpdate(
        {},
        {
          $inc: { "cartItems.$[element].quantity": quantity }, // increment quantity by how much we are adding
          $set: { "cartItems.$[element].numInStock": newNumInStock }, // set numInStock to new value
        },
        {
          arrayFilters: [{ "element._id": productId }], // specify which element to update
          returnDocument: "after", // return the updated document
        }
      );
    } else {
      updatedCart = await db.collection("cart").findOneAndUpdate(
        {},
        {
          $push: { cartItems: itemToAdd },
        },
        {
          returnDocument: "after",
        }
      );
    }

    // destructure cartItems from updatedCart
    const {
      value: { cartItems: newCart },
    } = updatedCart;

    // send response to client
    res.status(200).json({
      status: 200,
      message: "Item added to cart",
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

module.exports = { addCartItem };
