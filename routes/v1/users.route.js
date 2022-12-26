const express = require("express");
const fs = require("fs");

const router = express.Router();

router.route("/random")
    .get((req, res) => {
        fs.readFile("random-users.json", (err, data) => {
            if (data) {
                const users = JSON.parse(data);
                const random = users[Math.floor(Math.random() * users.length)];
                res.send(random);
            }
            else {
                console.log(err);
            }
        })
    })
router.route("/all")
    .get((req, res) => {
        fs.readFile("random-users.json", (err, data) => {
            if (data) {
                res.send(data);
            }
            else {
                console.log(err);
            }
        })
    })

module.exports = router;