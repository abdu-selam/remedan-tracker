const app = require("./src/app");
const ENV = require("./src/utils/env");

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`App is running in port ${PORT}`);
});
