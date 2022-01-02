require("dotenv").config();

module.exports = {
  telegramTokenBot: process.env.TOKEN_BOT,
  cookiePikbest: process.env.COOKIE_PIKBEST,
  folderDownload: process.env.FOLDER_DOWNLOAD,
  limitAccess: process.env.LIMIT_FILE,
};
