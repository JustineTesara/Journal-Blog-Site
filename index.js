import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  const year = new Date().getFullYear();
  res.render("index.ejs", { year: year, posts: posts });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", (req, res) => {
  const author = req.body.authorname;
  const subject = req.body.subject;
  const content = req.body.content;

  posts.push({
    author: author,
    subject: subject,
    content: content,
    date: new Date().toLocaleDateString(),
  });

  res.redirect("/");
});

// Show edit form
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const post = posts[id]; // get post by index
  res.render("edit", { post, index: id });
});

// Handle update
app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  posts[id].subject = req.body.subject;
  posts[id].author = req.body.author;
  posts[id].content = req.body.content;
  res.redirect("/"); // go back to homepage
});

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  posts.splice(id, 1); // remove the post from array
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
