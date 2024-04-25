const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");

const cats = [
  {
    name: "Navcho",
    age: 8,
    breed: "persian"
  },
  {
    name: "Sisa",
    age: 14,
    breed: "angora"
  },
  {
    name: "Tom",
    age: 5,
    breed: "street cat"
  },
  {
    name: "Sue",
    age: 6.5,
    breed: "angora"
  }
]

const app = express();

app.engine("hbs", handlebars.engine({
  extname: "hbs"
})); 
app.set("view engine", "hbs");

app.use(express.static("public"));

// app.get("/styles/site.css", (req, res) => {
//   res.sendFile(path.join(__dirname, "styles", "site.css"));
// });

app.use((req, res, next) => {
  console.log("REQ URL: " + req.url);

  // if (Math.random() < 0.5) {
  //   return res.send("You don't have luck!");
  // }
  next();
});


app.get("/", (req, res) => {
   res.render("home", {name: "Home"})
});

app.get("/cats", (req, res) => {
 const filteredCats = cats.filter(cat =>cat.breed === "angora")
res.render("cats", {cats: filteredCats});

});

app.get("/cats/download", (req, res) => {
  const imagePath = path.join(__dirname, "images", "tiger.jpg");
  // const imagePath = path.resolve(".", "images", "tiger.jpg");
  res.download(imagePath);
  // res.sendFile(imagePath);
  // res.attachment(imagePath)
  // res.end();
});

app.get("/cats/:catName", (req, res) => {
  console.log(req.params);
  const currCatName = req.params.catName;
  res.send(`Current cat name is ${currCatName}`);
});

app.get("/cats/:catName/:catBreed", (req, res) => {
  const name = req.params.catName;
  const breed = req.params.catBreed;
  res.send(`This is ${name} and it's breed is ${breed}`);
});

app.post(
  "/cats",
  (req, res, next) => {
    console.log("Creating new cat!");

    if (Math.random() < 0.5) {
      return res.send("You don'd have luck");
    }
    next();
  },
  (req, res) => {
    //TODO Create new cat

    res.redirect("/cats");
  }
);

app.all("/dogs", (req, res) => {
  res.send("This is an application for cats!");
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found - 404");
});

app.listen(5000);
console.log("Server is listening on port 5000...");
