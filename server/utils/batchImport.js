// Array of product objects
const products = require("../data/products.json");
// Array of company object
const companies = require("../data/companies.json");

const { MongoClient } = require("mongodb");

// Load .env file contents into process.env.
require("dotenv").config();
// Grab MONGO_URI from process.env
const { MONGO_URI, DB_NAME } = process.env;

// options for connecting to the MongoDB instance
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/* 
This is what each product object in the products array looks like:
{
    "name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
    "price": "$49.99",
    "body_location": "Wrist",
    "category": "Fitness",
    "_id": 6543,
    "imageSrc": "<long base64>",
    "numInStock": 9,
    "companyId": 19962
  }

  and this is what each company object looks like in the companies array:
  {
    "name": "Barska",
    "url": "http://www.barska.com/",
    "country": "United States",
    "_id": 19962
  }

  We will modify each product object in the products array:
  -remove "$" from price and turn it into a number (make life easier)
  -find the company for each product object and add some information to the product object:
  (
    add a property called "brand" which will be the company name,
    add the "companyURL" property from the company object,
    take the "country" property and add the value into a "manufacturedIn" property
   )
*/

const modifiedProductsArr = products.map((product) => {
  const {
    name: brand,
    country: manufacturedIn,
    url: companyURL,
  } = companies.find((company) => product.companyId === company._id);

  return {
    _id: product._id,
    name: product.name,
    price: Number(product.price.replace("$", "")),
    bodyLocation: product.body_location,
    category: product.category,
    imageSrc: product.imageSrc,
    numInStock: product.numInStock,
    brand,
    manufacturedIn,
    companyURL,
  };
});

// batchImport function to set up database and collections
const batchImport = async () => {
  // create a new MongoClient
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();
    console.log("client connected");

    // connect to the database
    const db = client.db(DB_NAME);

    // create a collection called "products" and add all of the products
    await db.collection("products").insertMany(modifiedProductsArr);

    // create a collection called "cart" with a document with a single array for the cart
    // For this simple application we will assume there is only 1 user
    await db.collection("cart").insertOne({
      cart: [],
    });
    // create a collection called "orders"
    await db.createCollection("orders");
  } catch (err) {
    // console log error
    console.log(err.stack);
    //disconnect client
    client.close();
  } finally {
    // disconnect client
    client.close();
    console.log("client disconnected");
  }
};

// call the batchImport function
batchImport();
