import { KafkaClient, Consumer } from "kafka-node";
import offerController from "./offer.controller.js";
import { methods } from "../models/offer.js";
import PrimaClient from "@prisma/client";
const prisma = new PrimaClient();
export const kafka = () => {
  const Client = new KafkaClient({ kafkaHost: "kafka:9092" });
  const consumer = new Consumer(client, [{ topic: process.env.TOPIC }], {
    autoCommit: false,
  });
};

consumer.on("message", async (message) => {
  messageHandler(message);
});

consumer.on("error", (err) => {
  console.log(err);
});
async function messageHandler(message) {
  const { topic, offset } = message;
  message = JSON.parse(message.value);
  const { id } = message;
  const isIn = await prisma.message.findUnique({
    where: { id: { offset, topic } },
  });
  if (!isIn) {
    console.log("new message");
    console.log(message);
    await prisma.message.upsert({
      where: { id: { offset, topic } },
      create: { topic, offset },
      update: {},
    });

    switch (message.method) {
      case methods.post:
        offerController.addOffer(message);
        break;
      case methods.delete:
        offerController.deleteOffer(id);
        break;
      case methods.update:
        offerController.updateOffer(message, id);
        break;
      default:
        console.log(message);
    }
  }
}
