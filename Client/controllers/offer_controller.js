import { offer as Offer, methods } from "../models/offer.js";
// import pkg from '{ PrismaClient }';
// // import { PrismaClient } from '@prisma/client'
// // const { PrismaClient } = pkg;
// var prisma = pkg;
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const addOffer = async (offer) => {
  offer = new Offer(offer);
  if (offer.valid && offer.method == methods.post) {
    await prisma.offer.create({
      data: { item: offer.item, percentage: offer.percentage },
    });
  }
};

const getOffer = async (id) => {
  return await prisma.offer.findFirst({ where: { id: +id } });
};
const getOffers = async () => {
  return await prisma.offer.findMany({});
};
const updateOffer = async (offer, id) => {
  offer = new Offer(offer);
  if (offer.valid && offer.method == methods.update) {
    await prisma.offer.updateMany({
      where: { id: +id },
      data: { item: offer.item, percentage: offer.percentage },
    });
  }
};

const deleteOffer = async (id) => {
  const isIn = await prisma.offer.findUnique({ where: { id: +id } });
  if (isIn) {
    await prisma.offer.delete({ where: { id: +id } });
  }
};

export default { addOffer, getOffer, getOffers, updateOffer, deleteOffer };
