const { getCart } = require("./shopping-cart-handlers/get-cart-items");
const { addCartItem } = require("./shopping-cart-handlers/add-cart-item");
const {
  updateItemQuantity,
} = require("./shopping-cart-handlers/update-cart-item-quantity");
const { removeCartItem } = require("./shopping-cart-handlers/remove-cart-item");
const { clearCart } = require("./shopping-cart-handlers/clear-cart");

module.exports = {
  getCart,
  addCartItem,
  updateItemQuantity,
  removeCartItem,
  clearCart,
};
