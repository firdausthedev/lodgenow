import app from "./app";
import config from "./config";

app.listen(config.port, () => {
  console.log(`listening on port http://localhost:${config.port}`);
});
