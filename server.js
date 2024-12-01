const express = require("express");
const app = express();
const port = 3000;
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
