const express = require("express");
const cors = require("cors");
const app = express();
const port = 2000;
app.use(express.json());
app.use(cors());

const cartRoutes = require("./routes.js");
// tell the server to use our foodzRoutes/ make our endpoints available on this server
app.use("/", cartRoutes);

//endpoints
// send a simple response as a text
app.get("/", (request, response) => {
  response.send("hello, world.");
});
//send HTML via GET request
app.get("/lorem", (request, response) => {
  response.send(`
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus nulla blandit, faucibus nibh in, auctor dui. Quisque sodales velit augue, quis commodo nibh aliquet et. Fusce dignissim finibus lectus, eget bibendum ligula imperdiet non. Aenean at mauris placerat, maximus ipsum eget, pulvinar ante. Curabitur mollis, lorem eu tempor imperdiet, augue ligula elementum massa, eu vehicula dolor dolor mollis arcu. Maecenas ullamcorper dui elit, nec cursus turpis hendrerit id. Vivamus eu ornare lectus, quis varius lorem. Aenean eros ex, porta ut arcu ac, tincidunt scelerisque felis. Ut eget quam in ante tristique bibendum facilisis sed lectus. Sed rutrum suscipit mi, quis vehicula tellus tincidunt quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
    `);
});

const aboutMe = {
  firstName: "Andre",
  lastName: "Jackson",
  profession: "Web Developer",
  languages: {
    programming: ["JavaScript", "HTML/CSS", "TypeScript", "Syql"],
    spoken: ["English", "French", "Jive", "German", "Spanish"]
  }
};
// send JSON
app.get("/about", (request, response) => {
  response.json(aboutMe);
});

app.listen(port, () => {
  console.log(`listening on port : ${port}`);
});
