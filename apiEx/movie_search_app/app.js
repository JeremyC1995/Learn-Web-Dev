const express = require("express");
const app = express();
const request = require('request');

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
 });

app.get("/results", (req, res)=>{
    request(`http://www.omdbapi.com/?apikey=thewdb&s=${req.query.search}`, (error, response, body)=>{
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      let data = JSON.parse(body);
      res.render("results",{data: data});
    });
});

app.listen(5000, ()=>{
    console.log("Server has started!!!");
});
app
    