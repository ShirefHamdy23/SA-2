import pkg from 'express';
const { express } = pkg;
import {kafka}  from "./controllers/kafka_consumer_controller.js";
import router from "./routers/offer_router.js";
const app = pkg();
app.use(pkg.json());

kafka();
app.use(router);
app.listen(1234, () => {
  console.log("client runs on 1234");
});