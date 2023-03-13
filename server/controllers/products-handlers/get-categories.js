const {
  DB_NAME, // the name of the database to connect to
  connect, // function to connect to the database
  disconnect, // function to disconnect from the database
  client, // MongoDB client instance
} = require("../../config/database");

const getCategories = async (req, res) => {
  try {
    // connect to the database
    await connect();

    // select the database
    const db = client.db(DB_NAME);

    // Get an array of all unique categories
    const categories = await db.collection("products").distinct("category");

    // Send categories to client
    res.status(200).json({
      status: 200,
      categories,
    });
  } catch (error) {
    // Log any errors that occurred and send a response with a status code of 500
    console.log(err);
    res.status(500).json({ status: 500, message: "Internal server error" });
  } finally {
    // always disconnect from the database
    await disconnect();
  }
};

module.exports = { getCategories };
