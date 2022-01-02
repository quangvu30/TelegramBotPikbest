const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const schedule = require("node-schedule");

const app = express();

app.use("/files", express.static("files"));
app.use(express.json());
app.use(cors());

app.use("/", router);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.listen(1234, () => {
  console.log(`App is running on http://localhost:1234`);
});

/* Schedule exectue at start of everyday */
const job = schedule.scheduleJob("0 0 * * *", async function () {
  console.log("job running");
  require("./utils/helper").deleteAllFile("./files/");
});
