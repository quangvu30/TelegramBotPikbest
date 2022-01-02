const botConfig = require("../config/bot.config");
const helper = require("../utils/helper");
const { exec } = require("child_process");
const Telegraf = require("telegraf").Telegraf;

const bot = new Telegraf(botConfig.telegramTokenBot);
let quene = 0;
const start = async (ctx) => {
  await ctx.reply("Welcom to Pikbest bot. '/help' to show all command");
};

const help = async (ctx) => {
  await ctx.reply(`/start: to start
/help: to show all command
/getMe: to get your id
/download: to download file
`);
};

const getMe = async (ctx) => {
  await ctx.reply(`Your id : ${ctx.chat.id}`);
};

const download = async (ctx) => {
  await ctx.reply(`Enter url to download ... `);
};

const sendFile = async (req, res) => {
  const { chatId, content } = req.body;
  await bot.telegram.sendMessage(chatId, content);
  quene = 0;
  res.json({ status: "success" });
};

const classifyWebsite = async (ctx) => {
  if (quene == 1) {
    await ctx.reply("Server busy ... Try again in a few minutes");
    return;
  }
  let website = helper.domain_from_url(ctx.message.text);
  switch (website) {
    case "pikbest.com":
      quene = 1;
      let args = `${
        botConfig.cookiePikbest
      } pikbest.com ${helper.splitIdItemPikbest(ctx.message.text)} ${
        ctx.chat.id
      }`;
      exec(
        __dirname + "/Execute/TelegramBotPikbest.exe " + args,
        (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
        }
      );
      break;
  }
};

module.exports = {
  bot,
  start,
  help,
  getMe,
  download,
  sendFile,
  classifyWebsite,
};
