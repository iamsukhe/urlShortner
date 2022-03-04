const express = require("express");
const app = express();
const connectDB = require("./config/db");

const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json({ extended: false }));

connectDB();

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
