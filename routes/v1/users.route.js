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
                const limit = req.query.limit;
                const users = JSON.parse(data);
                res.send(users.slice(0, limit));
            }
            else {
                console.log(err);
            }
        })
    })

router.route("/save")
    .post((req, res) => {
        let user = req.body;
        if (user.id && user.gender && user.name && user.contact && user.address && user.photoUrl) {
            fs.readFile("random-users.json", (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let users = JSON.parse(data);
                    users.push(user);
                    users = JSON.stringify(users);
                    fs.writeFile("random-users.json", users, (err) => {
                        if (err) {
                            console.log('write err', err);
                        }
                        else {
                            res.send(users);
                        }
                    })
                }
            })
        }
        else {
            res.send("Add every key of an user such as id, gender, name, contact, address, photoUrl");
        }

    })

router.route("/update")
    .patch((req, res) => {
        const userInfo = req.body;
        const id = userInfo.id;
        if (typeof (id) !== 'number') {
            res.send("Please send a Number type id!");
        }
        else {
            fs.readFile("random-users.json", (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let users = JSON.parse(data);
                    for (const user of users) {
                        if (user.id === id) {
                            user.gender = userInfo.gender;
                            user.name = userInfo.name;
                            user.contact = userInfo.contact;
                            user.address = userInfo.address;
                            user.photoUrl = userInfo.photoUrl;
                            // user = userInfo;
                        }
                    }
                    const newUsers = JSON.stringify(users);
                    fs.writeFile("random-users.json", newUsers, (err) => {
                        if (err) {
                            console.log('write err', err);
                        }
                        else {
                            res.send(newUsers);
                        }
                    })
                }
            })
        }
    })



module.exports = router;