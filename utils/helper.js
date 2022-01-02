const fs = require("fs");
const path = require("path");

function domain_from_url(url) {
  var result;
  var match;
  if (
    (match = url.match(
      /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
    ))
  ) {
    result = match[1];
    if ((match = result.match(/^[^\.]+\.(.+\..+)$/))) {
      result = match[1];
    }
  }
  return result;
}

function splitIdItemPikbest(url) {
  return url
    .match(/\d+[\.html]/gm)
    .toString()
    .replace(".", "");
}

function deleteAllFile(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
}

module.exports = {
  domain_from_url,
  splitIdItemPikbest,
  deleteAllFile,
};
