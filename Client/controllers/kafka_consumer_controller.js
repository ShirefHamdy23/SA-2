import { KafkaClient, Consumer } from "kafka-node";
import offerController from "./offer_controller.js";
import { methods } from "../models/offer.js";
// let consumer;

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// async function main() {
//   await prisma.$connect()
//   // console.log(await prisma.users.count())
// }
// main().catch(console.error)

export const kafka = ()=>{
  // const client = new KafkaClient({ kafkaHost: "kafka:9092" });
  const client = new KafkaClient({ kafkaHost: "kafkahost:9092" });
  const consumer = new Consumer(client,[{topic : process.env.TOPIC}],{
    autoCommit : false
  });
  consumer?.on("message", async (message) => {
    messageHandler(message);
  });

  consumer?.on("error", (err) => {
    console.log(err);
  });
}


async function messageHandler(message) {
  const { topic, offset } = message;
  message = JSON.parse(message.value);
  const { id } = message;
  const isIn = await prisma.messages.findUnique({
    where: { id: { offset, topic } },
  });
  if (!isIn) {
    console.log("new message");
    console.log(message);
    await prisma.messages.upsert({
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
