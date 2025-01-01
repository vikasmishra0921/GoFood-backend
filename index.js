// const express = require("express");
// const app = express();
// const port = 5000;
// const mongoDB = require("./database");
// mongoDB();
// const cors = require("cors");

// app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-requested-with, Content-Type,Acccept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });

// app.use(express.json());
// app.use("/api", require("./Routes/CreateUsers"));
// app.use("/api", require("./Routes/DisplayData"));
// app.use("/api", require("./Routes/OrderData"));
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

require("dotenv").config();
const express = require("express");
const app = express();
const mongoDB = require("./database");
const cors = require("cors");

const PORT = process.env.PORT || 5000; // Default to 5000 if not set
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000"; // Default for development

mongoDB();

app.use(cors({ origin: CLIENT_URL }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.json());

app.use("/api", require("./Routes/CreateUsers"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
