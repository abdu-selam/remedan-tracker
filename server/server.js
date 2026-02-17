const app = require("./src/app");
const connectDB = require("./src/config/db.config");
const ENV = require("./src/utils/env");

const PORT = ENV.PORT;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`App is running in port ${PORT}`);
});
