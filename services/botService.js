const { bot } = require("../controllers/bot.controller");
const botController = require("../controllers/bot.controller");
const botMiddleware = require("../middlewares/bot.middleware");

//method for invoking start command
bot.command("start", botController.start);

bot.command("help", botController.help);

bot.command("getMe", botController.getMe);

bot.command(
  "download",
  botMiddleware.isOnWhiteList,
  botMiddleware.isLimitAccess,
  botController.download
);

bot.on(
  "text",
  botMiddleware.isOnWhiteList,
  botMiddleware.isLimitAccess,
  botController.classifyWebsite
);

bot.launch();
