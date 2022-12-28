const fs = require("fs");

module.exports.getRandomUser = (req, res) => {
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
}

module.exports.getAllUsers = (req, res) => {
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
};

module.exports.saveUser = (req, res) => {
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

};

module.exports.updateOneUser = (req, res) => {
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
};

module.exports.updateMultipleUsers = (req, res) => {
    const users = req.body;
    let flag = false;
    for (const user of users) {
        if (user.id && user.gender && user.name && user.contact && user.address && user.photoUrl) {
            if (typeof (user.id) === 'number' && typeof (user.gender) === 'string' && typeof (user.name) === 'string' && typeof (user.contact) === 'string' && typeof (user.address) === 'string' && typeof (user.photoUrl) === 'string') {
                flag = true;
            }
            else {
                flag = false;
                break;
            }
        }
        else {
            flag = false;
            break;
        }
    }
    if (flag) {
        fs.readFile("random-users.json", (err, data) => {
            if (data) {
                const allUsers = JSON.parse(data);
                for (const u of users) {
                    for (const user of allUsers) {
                        if (user.id === u.id) {
                            user.gender = u.gender;
                            user.name = u.name;
                            user.contact = u.contact;
                            user.address = u.address;
                            user.photoUrl = u.photoUrl;
                            break;
                        }
                    }
                }
                const updatedUsers = JSON.stringify(allUsers);
                fs.writeFile("random-users.json", updatedUsers, (err) => {
                    if (err) {
                        console.log('write err', err);
                    }
                    else {
                        res.send(updatedUsers);
                    }
                })
            }
        })
    }
    else {
        res.send("Please provide valid information to update!");
    }
};

module.exports.deleteUser = (req, res) => {
    const id = req.body.id;
    if (typeof (id) === 'number') {
        fs.readFile("random-users.json", (err, data) => {
            const users = JSON.parse(data);
            const allUsers = users.filter(u => u.id !== id);
            const newUsers = JSON.stringify(allUsers);
            fs.writeFile("random-users.json", newUsers, (err) => {
                if (err) {
                    console.log('write err', err);
                }
                else {
                    res.send(newUsers);
                }
            })
        })
    }
    else {
        res.send("Please provide a valid user id!");
    }
};



