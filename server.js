const express = require("express");
const cartRoutes = express.Router();

const carts = [
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

let nextId = 4;

//create an endopoint that responds to a request with the full array of food.

cartRoutes.get("/carts", (request, response) => {
  response.json(carts);
});
// create an endpoint that gets food by id
cartRoutes.get("/carts/:id", (request, response) => {
  //save the id parameter as a number
  let id = parseInt(request.params.id);
  //find the object by id
  //using a forEach loop
  //   let foundFood = {};
  //   foodz.forEach(food => {
  //     if (id === food.id) {
  //       foundFood = food;
  //     }
  //   });

  let foundCarts2 = carts.find(cart => cart.id === id);
  if (foundCarts2) {
    response.json(foundCarts2);
  } else {
    response.status(404);
    response.send(`No foodz by this ID: ${id}`);
  }
});

//create an endpoint for POST of foodz

cartRoutes.post("/carts", (request, response) => {
  let newCart = request.body;
  //add the next id to the newCart
  newCart.id = nextId;
  //increment nextId
  nextId++;
  //add food to the foodz array
  carts.push(newCart);
  response.status(201);
  response.json(carts);
});

//create an endpoint for PUT of foodz (update foodz)
cartRoutes.put("/carts/:id", (request, response) => {
  //get the id parameter
  let id = parseInt(request.params.id);
  // create an object from teh body of the element
  let updatedCart = request.body;
  //add the id property to the updatedCart
  updatedCart.id = nextId;
  //increment our nextId variable
  nextId++;
  //find the food
  let index = carts.findIndex(cart => carts.id === id);
  if (index >= 0) {
    //remove the old food and add the updated food
    carts.splice(index, 1, request.body);
    response.json(carts);
  } else {
    response.status(404);
    response.send(`There's no food by id: ${id}`);
  }
});

// create an endpoint for the DELETE of foodz
cartRoutes.delete("/carts/:id", (request, response) => {
  // get the id parameter
  let id = parseInt(request.params.id);
  // find the food's index
  let index = carts.findIndex(cart => cart.id === id);
  if (index >= 0) {
    //delete this food
    carts.splice(index, 1);
    response.sendStatus(204);
  } else {
    response.status(404);
    response.send(`There's no food by id: ${id}`);
  }
});

module.exports = cartRoutes;
