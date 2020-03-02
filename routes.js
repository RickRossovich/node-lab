const express = require("express");
const cartRoutes = express.Router();
const cart = [
  {
    id: 0,
    price: 9,
    product: "vegetable",
    quantity: 5
  },
  {
    id: 1,
    price: 60,
    product: "doorbell",
    quantity: 4
  },
  {
    id: 2,
    price: 25,
    product: "bagel",
    quantity: 6
  },
  {
    id: 3,
    price: 80,
    product: "shoes",
    quantity: 7
  }
];

let nextId = cart.length;

//create an endopoint that responds to a request with the full array of food.

cartRoutes.get("/cart", (request, response) => {
  response.status(200);
  response.json(cart);
});
// create an endpoint that gets food by id
cartRoutes.get("/cart/:id", (request, response) => {
  //   //save the id parameter as a number
  let id = parseInt(request.params.id);
  //   //find the object by id
  //   //using a forEach loop
  //   //   let foundFood = {};
  //   //   foodz.forEach(food => {
  //   //     if (id === food.id) {
  //   //       foundFood = food;
  //   //     }
  //  });

  let foundItem = cart.find(item => item.id === id);
  if (foundItem) {
    response.json(foundItem);
  } else {
    response.status(404);
    response.send(` ID: ${id} not found`);
  }
});

// //create an endpoint for POST of foodz

cartRoutes.post("/cart", (request, response) => {
  let newCart = request.body;
  //add the next id to the newCart
  newCart.id = nextId;
  //increment nextId
  nextId++;
  //add food to the foodz array
  cart.push(newCart);
  response.status(201);
  response.json(cart);
});

//create an endpoint for PUT of foodz (update foodz)
cartRoutes.put("/cart/:id", (request, response) => {
  //get the id parameter
  let id = parseInt(request.params.id);
  // create an object from teh body of the element
  let updatedCart = request.body;
  //add the id property to the updatedCart
  updatedCart.id = nextId;
  //increment our nextId variable
  nextId++;
  //find the food
  let foundIndex = cart.findIndex(cart => cart.id === id);
  if (foundIndex > -1) {
    //remove the old food and add the updated food
    cart.splice(foundIndex, 1, updatedCart);
    response.json(cart);
  } else {
    response.status(404);
    response.send(`There's no item by id: ${id}`);
  }
});

// create an endpoint for the DELETE of foodz
cartRoutes.delete("/cart/:id", (request, response) => {
  // get the id parameter
  let id = parseInt(request.params.id);
  // find the food's index
  let index = cart.findIndex(cart => cart.id === id);
  if (index >= 0) {
    //delete this food
    cart.splice(index, 1);
    response.sendStatus(204);
  } else {
    response.status(404);
    response.send(`There's no item by id: ${id}`);
  }
});

module.exports = { cartRoutes };
