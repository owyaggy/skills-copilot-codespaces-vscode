// Create web server
// npm install express
// npm install body-parser
// npm install mongoose
// npm install ejs
// npm install method-override

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

// App config
mongoose.connect("mongodb://localhost/comments_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Mongoose/model config
var commentSchema = new mongoose.Schema({
  text: String
});

var Comment = mongoose.model("Comment", commentSchema);

// Comment.create({
//   text: "This is a comment."
// });

// RESTful routes
app.get("/", function(req, res) {
  res.redirect("/comments");
});

// INDEX route
app.get("/comments", function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      console.log("ERROR!");
    } else {
      res.render("index", {comments: comments});
    }
  });
});

// NEW route
app.get("/comments/new", function(req, res) {
  res.render("new");
});

// CREATE route
app.post("/comments", function(req, res) {
  Comment.create(req.body.comment, function(err, newComment) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/comments");
    }
  });
});

// SHOW route
app.get("/comments/:id", function(req, res) {
  Comment.findById(req.params.id, function(err, foundComment) {
    if (err) {
      res.redirect("/comments");
    } else {
      res.render("show", {comment: foundComment});
    }
  });
});

// EDIT route
app.get("/comments/:id/edit", function(req, res) {
  Comment.findById(req.params.id, function(err, foundComment) {
    if (err) {
      res.redirect("/comments");
    } else {
      res.render("edit", {comment: foundComment});
    }
  });
});

// UPDATE route
app.put("/comments/:id", function(req, res) {
  Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, updatedComment) {
    if (err) {
      res.redirect("/comments");
    } else {
      res.redirect("/");
    }
  }
  );
}
);