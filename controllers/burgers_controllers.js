var express = require("express");

// var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
module.exports = function (app) {
    app.get("/", function (req, res) {
        burger.selectAll(function (data) {
            var hdbrsObj = {
                burgers: data
            };
            console.log(hdbrsObj);
            res.render("index", hdbrsObj);
        });
    });
    app.post("/api/burgers", function (req, res) {
        console.log(req.body);
        burger.insertOne(
            ["burger_name", "devoured",],
            [req.body.burger_name, req.body.devoured],
            function (result) {
                //send backthe ID of the new burger
                res.json({ id: result.insertId });
            }
        );
    });
    app.put("/api/burgers/:id", function (req, res) {
        var condition = " id = " + req.params.id;
        console.log("condition", condition);
        burger.updateOne({ devoured: req.body.devoured }, condition, function (
            result) {
            if ((result.changedRows === 0)) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
    });
    app.delete("/delete/:id", function (req, res) {
        var condition = " id =" + req.params.id;
        console.log("condition", condition);

        burger.deleteOne(condition, function (result) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
    });

};

