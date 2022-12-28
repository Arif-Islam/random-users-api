const express = require("express");
const usersController = require("../../controllers/users.controller");

const router = express.Router();

router.route("/random")
    .get(usersController.getRandomUser);

router.route("/all")
    .get(usersController.getAllUsers);

router.route("/save")
    .post(usersController.saveUser);

router.route("/update")
    .patch(usersController.updateOneUser);

router.route("/bulk-update")
    .patch(usersController.updateMultipleUsers);

router.route("/delete")
    .delete(usersController.deleteUser);

module.exports = router;