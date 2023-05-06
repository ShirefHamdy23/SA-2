import { express } from "express";
import { kafka } from "./src/controllers/kafka.consumer.controller.js";
import router from "./src/routers/offer.router.js";
const app = express();
app.use(exoress.json());

kafka();
app.use(router);
app.listen(1234, () => {
  console.log("client runs on 1234");
});
