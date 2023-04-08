const mongoose = require("mongoose");
const env = require("dotenv").config();
const PORT = process.env.PORT || 8000;

const app = require("./app");

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`connection to DB successfull`))
  .catch((error) => console.log(error));
