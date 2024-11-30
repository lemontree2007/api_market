const express = require("express");
const app = express();
const port = 3000;
const Router = require("./routes/productRouter");
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.use("/", Router);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
