const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

var posts = []; //to store the post data objects from compose page


const aboutContent = "This is about page";
const contactContact = "This is contact page";

app.get("/", function (req, res) {
    res.render("home",
        {
            posts: posts
        }
    );

});

app.get("/about", function (req, res) {
    res.render("about", { content: aboutContent });

});

app.get("/contact", function (req, res) {
    res.render("contact", { content: contactContact });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.get('/posts/:postName', function (req, res) {

    const requestedTitle = _.lowerCase(req.params.postName);

        posts.forEach(function(post)
        {
        const storedTitle = _.lowerCase(post.postTitle);
        if (storedTitle === requestedTitle)
         {
            res.render("posts",{title:post.postTitle,content:post.postBody});
         }
        

    })
});



//post methods

app.post("/compose", function (req, res) {
    const post = {
        postTitle: req.body.postTitle,
        postBody: req.body.postBody
    };
    posts.push(post); //appending the dataobject to posts array
    res.redirect("/");
})





app.listen(3000, function () {
    console.log("Server started at port 3000");
})