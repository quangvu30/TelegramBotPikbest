const fs = require("fs");
const botConfig = require("../config/bot.config");

const isOnWhiteList = async (ctx, next) => {
  const whiteList = fs.readFileSync("./whitelist.txt").toString();
  if (!whiteList.includes(ctx.chat.id.toString())) {
    await ctx.reply("Your are not in whitelist. Contact to admin");
    return;
  }
  next();
};

const isLimitAccess = async (ctx, next) => {
  let db = JSON.parse(fs.readFileSync("./config/db.json").toString());
  if (db[ctx.chat.id.toString()] != undefined) {
    if (db[ctx.chat.id.toString()] > botConfig.limitAccess) {
      await ctx.reply(
        "Your limit download is " +
          botConfig.limitAccess +
          ". Try again the next day"
      );
      return;
    }
    db[ctx.chat.id.toString()] = 1;
  } else {
    db[ctx.chat.id.toString()] = 1;
  }
  fs.writeFileSync("./config/db.json", JSON.stringify(db));
  next();
};

module.exports = {
  isOnWhiteList,
  isLimitAccess,
};
