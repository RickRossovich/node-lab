const express = require("express");
const cors = require("cors");
const app = express();
const port = 2000;
const { cartRoutes } = require("./routes.js");
app.use(express.json());
app.use(cors());

app.use("/", cartRoutes);

app.listen(port, () => {
  console.log(`listening on port : ${port}`);
});

