import { offers as Offer, methods, offers } from "../models/offer.js";
import { PrismaClient } from '@prisma/client'
var prisma = new PrismaClient();


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
const getOffers = async (id) => {
  return await prisma.offer.findFirst({});
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
