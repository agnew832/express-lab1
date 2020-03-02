const express = require("express");
const cartRoutes = express.Router();

const cart = [
  {
    id: 0,
    product: "Dog Food",
    price: 29.99,
    quantity: 1
  },

  {
    id: 1,
    product: "Coffee Creamer",
    price: 3.99,
    quantity: 1
  },

  {
    id: 2,
    product: "K-Cups",
    price: 15.99,
    quantity: 3
  },

  {
    id: 3,
    product: "Breakfast Bars",
    price: 4.99,
    quantity: 1
  },

  {
    id: 4,
    product: "Potato Chips",
    price: 1.99,
    quantity: 2
  }
];
let nextId = 5;

// create an endpoint that responds to a request with the full array of cart items
cartRoutes.get("/cart", (request, response) => {
  response.json(cart);
});

//create an endpoint that get a cart item by id
cartRoutes.get("/cart/:id", (request, response) => {
  // save the id parameter as a number
  let id = parseInt(request.params.id);
  let foundCart = cart.find(cart => id === cart.id);
  if (foundCart) {
    response.json(foundCart);
    response.status(200);
  } else {
    response.status(404);
    response.send(`ID not found: ${id}`);
  }
});

//create a endpoint for POST of cart items
cartRoutes.post("/cart", (request, response) => {
  let newCart = request.body;

  // add the next id to the newCart
  newCart.id = nextId;
  //increment our nextId
  nextId++;
  // add cart item to the cart array
  cart.push(newCart);
  response.status(201);
  response.json(cart);
});

//create an endpoint for PUT of cart items(update cart)
cartRoutes.put("/cart/:id", (request, response) => {
  //get the id parameter
  let id = parseInt(request.params.id);
  //create an object from the body of the request
  let updatedCart = request.body;
  //add the id property to the updatedCart
  updatedCart.id = id;
  //increment our nextId variable
  //nextId++;
  //find the cart
  let index = cart.findIndex(cart => id === cart.id);
  if (index >= 0) {
    //remove the old cart item and the update cart
    cart.splice(index, 1, updatedCart);
    response.json(cart);
  }
});

cartRoutes.delete("/cart/:id", (request, response) => {
  //get the id parameter
  let id = parseInt(request.params.id);
  //find the cart's index
  let index = cart.findIndex(cart => cart.id === id);
  if (index >= 0) {
    // delete this cart item
    cart.splice(index, 1);
    response.sendStatus(204);
  } else {
    response.status(404);
    response.send(`There's no cart item by id: ${id}`);
  }
});

module.exports = cartRoutes;
