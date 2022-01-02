const fs = require("fs");

const isOnWhiteList = async (ctx, next) => {
  const whiteList = fs.readFileSync("./whitelist.txt").toString();
  if (!whiteList.includes(ctx.chat.id.toString())) {
    await ctx.reply("Your are not in whitelist. Contact to admin");
    return;
  }
  next();
};

module.exports = {
  isOnWhiteList,
};
