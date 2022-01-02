const { Router } = require("express");
const botController = require("../controllers/bot.controller");

const router = Router();

router.route("/sendFile").post(botController.sendFile);

module.exports = router;
