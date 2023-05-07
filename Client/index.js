// import pkg from 'express';
import  express from 'express';
import {kafka}  from "./controllers/kafka_consumer_controller.js";
import router from "./routers/offer_router.js";
const app = express()
app.use(express.json());

kafka();
app.use(router);
app.listen(1234, () => {
  console.log("client runs on 1234");
});